import axios from "axios";

const options = {
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNWVhZGRlYmIyMDhkYzU5YzY4NjE4ZWY3NDJiYWU2NCIsIm5iZiI6MTcyOTU4MTAyNy43MTAzNjgsInN1YiI6IjY3MTc0ZTY4MTAxOTBkMjRhZjlhZWYxNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QSOsfDgRlKeNs8hKcAo9QizvlL9eOCnDkg5RNiZariI',
    },
};


export const requestTrendingMovies = () => { return axios.get(`/trending/movie/day`, options); }
export const searchMovies = (query) => { return axios.get(`/search/movie?query=${query}`, options); }
export const requestMovieDetails = (id) => { return axios.get(`/movie/${id}`, options); }
export const getMovieCast = (id) => { return axios.get(`/movie/${id}/credits`, options); }
export const getMovieReviews = (id) => { return axios.get(`/movie/${id}/reviews`, options); }