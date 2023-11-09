"use client"
import React, { useState, useEffect } from 'react';
import SearchResults from '@/app/components/SearchResults';
import { getMovies } from '../../../../utils/requests';

function SearchPage({ searchParams }) {
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const movieData = await getMovies(searchParams.query);
        setMovies(movieData);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    }

    fetchMovies();
  }, [searchParams.query]);

  return (
    <div>
      {/* No loading condition */}
      {movies && <SearchResults searchText={searchParams.query} movies={movies} />}
    </div>
  );
}

export default SearchPage;