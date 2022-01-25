'use strict';

//Require used in servers instead of import
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const getWeather = require('./myWeather');
const getMovies = require('./movies');
const { acceptsEncodings } = require('express/lib/request');
const { response } = require('express');
//Express App see docs for more info
const app = express();

app.use(cors());
require('dotenv').config();


//Any Middleware goes after app is instantiated
const PORT = process.env.PORT || 3002;

//Modules
app.get('/weather', getWeather);
app.get('/movies', getMovies);


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


//Catch Route Always Must be the last route in file and can control the message

app.get('*', (request, response) => {
  response.status(404).send('UH OH! Something\'s Wrong! Status 404');
});

//Listener for requests
app.listen(PORT, () => console.log(`listening ${PORT}`));
