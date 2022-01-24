'use strict';

const { response } = require('express');
const axios = require('axios');
// let cache = require('./cache.js');
let cache = {};


async function getWeather(request, response) {
  let lat = request.query.lat;
  let lon = request.query.lon; 
  const key = lat + lon + 'weather';
  const url = `http://api.weatherbit.io/v2.0/forecast/daily/?key=${process.env.WEATHER_API_KEY}&lang=en&lat=${lat}&lon=${lon}&days=5`;

  if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
    console.log('Cache hit');
    response.send(cache[key].data);
  } else {
    console.log('Cache miss');
    let weatherResults = await axios.get(url);
    let weatherArr = weatherResults.data.data.map(day => new Weather(day));
    response.send(weatherArr);
    cache[key] = {
      data: weatherArr,
      timestamp: Date.now()
      
    };
    .then(response => parseWeather(response.body));
  }

  return cache[key].data;
}

function parseWeather(weatherData) {
  try {
    const weatherSummaries = weatherData.data.map(day => {
      return new Weather(day);
    });
    return Promise.resolve(weatherSummaries);
  } catch (e) {
    return Promise.reject(e);
  }
}

class Weather {
  constructor(day) {
    this.forecast = day.weather.description;
    this.time = day.datetime;
  }
}

module.exports = getWeather;
