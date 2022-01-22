'use strict';

//Require used in servers instead of import
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { acceptsEncodings } = require('express/lib/request');
const { response } = require('express');

require('dotenv').config();
const app = express();
app.use(cors());

//Any Middleware goes after app is instantiated
const PORT = process.env.PORT || 3002;

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


//Weather Route for json data
async function getWeather(request, response) {
  let lat = request.query.latt;
  let lon = request.query.lon;

  let url = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}&units=I`;

  let weatherResults = await axios.get(url);
  let WeatherArr = weatherResults.data.data.map(day => new Forecast(day));
  response.send(WeatherArr);
}

async function getMovies(req, res) {
  let searchCity = req.query.searchCity;

  let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchCity}`;

  let movieResults = await axios.get(url);
  let moviesArr = movieResults.data.results.map(movie => new Movies(movie));

  res.send(moviesArr);
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

class Movies {
  constructor(movie) {
    this.title = movie.original_title;
    this.overview = movie.overview;
    this.image_url = movie.poster_path;
    this.release_date = movie.release_date;
  }
}
//Catch Route Always Must be the last route in file and can control the message

app.get('*', (request, response) => {
  response.status(404).send('UH OH! Something\'s Wrong! Status 404');
});

//Listener for requests
app.listen(PORT, () => console.log(`listening ${PORT}`));
