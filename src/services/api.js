import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.headers = {
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NTRkNjNiNmQzZTY2MDhkMmQwZmU5NTI1YzcwNDg1MSIsInN1YiI6IjY2MTQ0ZjQwMTVhNGExMDE0YWY3YWNlMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FtWYqkMYGBjfgRUqpg07TWD8c6NIQFo-dNpccsLFvPc",
};
axios.defaults.params = { language: "en-US" };

export const getTrendingMovies = async () => {
  const { data } = await axios.get("trending/movie/day");
  return data.results;
};

export const getMoviesByQuery = async (query) => {
  const { data } = await axios.get(`/search/movie?query=${query}`);
  return data.results;
};

export const getMovieDetails = async (movieId) => {
  const { data } = await axios.get(`movie/${movieId}`);
  return data;
};

export const getMovieCredits = async (movie_id) => {
  const { data } = await axios.get(`movie/${movie_id}/credits`);
  return data.results;
};

export const getMovieReviews = async (movie_id) => {
  const { data } = await axios.get(`movie/${movie_id}/reviews`);
  return data.results;
};
