'use strict';

require('dotenv').config();
const axios = require('axios');

let cache = require('./cache.js');

module.exports = getMovies;

function getMovies(searchCity) {
  const key = 'movies-' + searchCity;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchCity}`;

  if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
    console.log('Cache hit');
  } else {
    console.log('Cache miss');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = axios.get(url)
      .then(response => parseMovies(response.data));
  }

  return cache[key].data;
}

function parseMovies(moviesData) {
  try {
    const moviesSummaries = moviesData.data.map(movie => {
      return new Movies(movie);
    });
    return Promise.resolve(moviesSummaries);
  } catch (e) {
    return Promise.reject(e);
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
