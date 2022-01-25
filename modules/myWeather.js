'use strict';

const axios = require('axios');


//Weather Route for json data
async function getWeather(request, response) {
  let lat = request.query.latt;
  let lon = request.query.lon;

  let url = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}&units=I`;

  let weatherResults = await axios.get(url);
  let WeatherArr = weatherResults.data.data.map(day => new Forecast(day));
  response.send(WeatherArr);
}

class Forecast {
  constructor(day) {
    this.datetime = day.valid_date;
    this.description = day.weather.description;
    this.low_temp = day.low_temp;
    this.max_temp = day.max_temp;
    this.temp = day.temp;
  }
}

module.exports = getWeather;
