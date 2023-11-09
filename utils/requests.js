const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const getTrendingMovies = async () => {
  const res = await fetch(`${BASE_URL}/trending/movie/week?language=en-US&api_key=${API_KEY}`);
  const data = await res.json();
  return data.results
}

export const fetchMoviePosters = async () => {
  const res = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_networks=21`);
  const data = await res.json();
  return data.results
}


export const getMovies = async (query) => {
  const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
  const data = await res.json();
  return data.results;
}

export const getMovieDetails = async (id) => {
  const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
  const data = await res.json();
  return data;
}

export const getSimilarMovies = async (id) => {
  const res = await fetch(`${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}`);
  const data = await res.json();
  return data.results;
}
