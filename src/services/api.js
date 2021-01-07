const axios = require('axios');

const API_KEY = "0a13660fdbc5b2904cf3f6f793b687fc";
axios.defaults.baseURL = 'https://api.themoviedb.org/3';

axios.defaults.params = {}
axios.defaults.params['api_key'] = API_KEY
axios.defaults.params['language'] = "en-US"


const getAllGenres = async () => {
    const response = await axios.get(`genre/movie/list`);
    return response.data;
}

const getNewReleases = async () => {
    const response = await axios.get(`trending/movie/week`, {
    params: {
        media_type: 'movie',
        time_window:'week'
    }
    });
    return response.data;
}

const getMoviesByCategory = async (id) => {
    const response = await axios.get(`genre/${id}/movies`);
    return response.data;
}

const searchMovies = async (phrase) => {
    const response = await axios.get(`search/movie`, {
    params: {
        query: phrase
    }
    });
    return response.data;
}

export {
    searchMovies,
  getAllGenres,
  getNewReleases,
  getMoviesByCategory
}