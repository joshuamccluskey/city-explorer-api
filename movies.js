'use strict';

const axios = require('axios');



async function getMovies(req, res) {
  let searchCity = req.query.searchCity;

  let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchCity}`;

  let movieResults = await axios.get(url);
  let moviesArr = movieResults.data.results.map(movie => new Movies(movie));

  res.send(moviesArr);
}


class Movies {
  constructor(movie) {
    this.title = movie.original_title;
    this.overview = movie.overview;
    this.image_url = movie.poster_path;
    this.release_date = movie.release_date;
  }
}

module.exports = getMovies;
