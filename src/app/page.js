'use client';
import { useState, useEffect } from 'react';
import Card from './components/Card';
import { fetchMoviePosters } from '../../utils/requests';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import Hero from './hero';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const moviesPerPage = 8;

  useEffect(() => {
    async function fetchMovies() {
      // Simulate a loading delay for 3 seconds
      setTimeout(async () => {
        const movieData = await fetchMoviePosters();
        setMovies(movieData);
        setIsLoading(false);
      }, 2000);
    }
    fetchMovies();
  }, []);

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (indexOfLastMovie < movies.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <Hero />
      <div className="container my-3 mt-10 md:m-24 p-6">
        <h1 className="text-2xl font-semibold mb-4">Top Trending Movies</h1>
        {isLoading ? (
          <SkeletonTheme color="#202020" highlightColor="#444">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: moviesPerPage }).map((_, index) => (
                <Skeleton key={index} height={300} duration={2} width={150} />
              ))}
            </div>
          </SkeletonTheme>
        ) : (
          <div className="min-h-screen flex justify-center items-center">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-14">
    {currentMovies.map((movie) => (
      <Card key={movie.id} movie={movie} className="" />
    ))}
  </div>
</div>

        )}
        <div className="flex justify-center mt-4 ml-2">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 bg-blue-500 text-white rounded-md mr-2 ${
              currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
            }`}
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={indexOfLastMovie >= movies.length - 1}
            className={`px-4 py-2 bg-blue-500 text-white rounded-md ${
              indexOfLastMovie >= movies.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
