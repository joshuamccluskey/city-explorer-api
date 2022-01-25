'use strict';

const axios = require('axios');

let cache = {};



async function getMovies(request, response) {
  let searchCity = request.query.searchCity;
  const key = searchCity + 'location';

  let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchCity}`;

  if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
    console.log('Cache hit');
    response.send(cache[key].data);
  } else {
    console.log('Cache miss');
    let movieResults = await axios.get(url);
    let moviesArr = movieResults.data.results.map(movie => new Movies(movie));
    response.send(moviesArr);
    cache[key] = {
      data: moviesArr,
      timestamp: Date.now()

    };

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

module.exports = getMovies;
