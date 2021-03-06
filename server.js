'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const getWeather = require('./modules/weather.js');
const getMovies = require('./modules/movies.js');
const app = express();
app.use(cors());

app.get('/weather', weatherHandler);
app.get('/movies', moviesHandler);

function weatherHandler(request, response) {
  const { lat, lon } = request.query;
  console.log(lat, lon);
  getWeather(lat, lon)
    .then(summaries => response.send(summaries))
    .catch((error) => {
      console.error(error);
      response.status(500).send('Sorry. Something went wrong!');
    });
}

function moviesHandler(request, response) {
  const { searchCity } = request.query;
  getMovies(searchCity)
    .then(summaries => response.send(summaries))
    .catch((error) => {
      console.error(error);
      response.status(500).send('Sorry. Something went wrong!');
    });
}

app.listen(process.env.PORT, () => console.log(`Server up on ${process.env.PORT}`));
