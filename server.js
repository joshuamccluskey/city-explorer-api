'use strict';

//Require used in servers instead of import
const express = require('express');

const cors = require('cors');

require('dotenv').config();
const app = express();
app.use(cors());

//Any Middleware goes after app is instantiated
const PORT = process.env.PORT || 3002;

const weatherData = require('./data/weather.json');

//Core route: hit http://localhost:3002
app.get('/', (request, response) => {
  response.send('Servers Up!');
});

//surfsup route: hit http://localhost:3002/surfsup
app.get('/surfsup', (request, response) => {
  response.send('Surfs Up!');
});

//sup route: hit http://localhost:3002/sup?person=Josh
app.get('/sup', (request, response) => {
  let person = request.query.person;

  //Used for proof of life, look in terminal
  console.log(request.query);
  console.log(person);

  response.send(`Sup ${person}, Server's up!`);
});
// Throw an error: hit http://localhost:3002/throw-an-error
app.get('/throw-an-error', (request, response) => {
  throw 'Something went really wrong!';
});

//Weather Route for json data
app.get('/weather', (request, response) => {
  try {
    let cityName = request.query.city_name;
    // let latitude = request.query.lat;
    // let longitude = request.query.lon;
    // let findCity = weatherData.filter(city => city.city_name === cityName || city.lat || city.lon === latitude && longitude);
    let findCity = weatherData.filter(city => city.city_name === cityName);
    // console.log(findCity);
    let groomedData = findCity[0].data.map(day => new Forecast(day));
    response.send(groomedData);
  } catch (error) {
    response.send('UH OH! Something\'s Wrong! City Not Found!');
  }
});

class Forecast {
  constructor(day) {
    this.datetime = day.datetime;
    this.description = day.weather.description;
  }
}


//Catch Route Always Must be the last route in file and can control the message
app.get('*', (request, response) => {
  response.status(400).send('UH OH! Something\'s Wrong Status 400!');
});
app.get('*', (request, response) => {
  response.status(404).send('UH OH! Something\'s Wrong! Status 404');
});
app.get('*', (request, response) => {
  response.status(500).send('UH OH! Something\'s Wrong! Status 500');
});

//Listener for requests
app.listen(PORT, () => console.log(`listening ${PORT}`));
