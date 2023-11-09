import React from 'react'
import MovieDetail from './MovieDetail'
import { fetchMoviePosters, getTrendingMovies } from '../../../utils/requests';

export default async function Hero ()  {
  const movies = await getTrendingMovies()
  return (
    <div>Hero
    <p> Multi search currently supports searching for movies, tv shows and people in a single  if you cannot do this. https://api.themoviedb 
    lti search currently supports searching for movies, tv shows and people in a single  if you cannot do this. https://lti search currently supports searching for movies, tv shows and people in a single  if you cannot do this. https://</p>
    <h1 className="text-2xl font-semibold mb-4">Top Trending Movies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies?.map(movie => {
          return movie.name
        }
        )}
      </div>
    <MovieDetail />
    </div>
  )
}

