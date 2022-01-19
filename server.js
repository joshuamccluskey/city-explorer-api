'use strict';

const { application } = require('express');
//Require used in servers instead of import
const express = require('express');

const app = express();

//Any Middleware goes after app is instantiated
const PORT = 3003;

const weatherData = require('./data/weather.json');

//Core route: hit http://localhost:3003
app.get('/', (request, response) => {
  response.send('Servers Up!');
});

//surfsup route: hit http://localhost:3003/surfsup
app.get('/surfsup', (request, response) => {
  response.send('Surfs Up!');
});

//sup route: hit http://localhost:3003/sup?person=Josh
app.get('/sup', (request, response) => {
  let person = request.query.person;

  //Used for proof of life, look in terminal
  console.log(request.query);
  console.log(person);

  response.send(`Sup ${person}, Server's up!`);
});
// Throw an error: hit http://localhost:3003/throw-an-error
app.get('/throw-an-error', (request, response) => {
  throw 'Something went really wrong!';
});

//Weather Route for json data
app.get('/weather', (request, response) => {
  let cityArr = [];
  let cityName = request.query.city_name;
  let latitude = request.query.lat;
  let longitude = request.query.lon;
  let findCity = weatherData.find(city => city.city_name === cityName || city.lat || city.lon === latitude && longitude);
  console.log(findCity);
  cityArr.push(findCity);
  cityArr.map(city => new Forecast(city));
  response.send(cityArr);
});


//Catch Route Always Must be the last route in file and can control the message
app.get('*', (request, response) => {
  response.status(404).send('UH OH! Something\'s Wrong!');

});

class Forecast {
  constructor(city) {
    this.datetime = city.data.datetime;
    this.description = city.data.description;
  }
}
//Listener for requests
app.listen(PORT, () => console.log(`listening ${PORT}`));
