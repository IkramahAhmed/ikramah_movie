const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const handleApiError = (res) => {
  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }
  return res.json();
};

export const getTrendingMovies = async () => {
  try {
    const res = await fetch(`${BASE_URL}/trending/movie/week?language=en-US&api_key=${API_KEY}`);
    const data = await handleApiError(res);
    return data.results;
  } catch (error) {
    console.error("Error fetching trending movies:", error.message);
    throw error;
  }
};

export const fetchMoviePosters = async () => {
  try {
    const res = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_networks=21`);
    const data = await handleApiError(res);
    return data.results;
  } catch (error) {
    console.error("Error fetching movie posters:", error.message);
    throw error;
  }
};

export const getMovies = async (query) => {
  try {
    const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
    const data = await handleApiError(res);
    return data.results;
  } catch (error) {
    console.error("Error searching for movies:", error.message);
    throw error;
  }
};

export const getMovieDetails = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
    const data = await handleApiError(res);
    return data;
  } catch (error) {
    console.error("Error fetching movie details:", error.message);
    throw error;
  }
};

export const getSimilarMovies = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}`);
    const data = await handleApiError(res);
    return data.results;
  } catch (error) {
    console.error("Error fetching similar movies:", error.message);
    throw error;
  }
};

