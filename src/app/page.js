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
  const moviesPerPage = 16;

  useEffect(() => {
    async function fetchMovies() {
      setTimeout(async () => {
        const movieData = await fetchMoviePosters();
        setMovies(movieData);
        setIsLoading(false);
      }, 1000);
    }
    fetchMovies();
  }, []);

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (indexOfLastMovie < movies.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <Hero />
      <div className="container my-3 mt-10  mx-auto w-[94%]  md:p-0">
        <h1 className="text-2xl font-semibold mb-4">Top Trending Movies</h1>
        {isLoading ? (
          <SkeletonTheme color="#202020" highlightColor="#444">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: moviesPerPage }).map((_, index) => (
                <Skeleton key={index} height={350} duration={2} width={190} />
              ))}
            </div>
          </SkeletonTheme>
        ) : (
          <div className="max-w-7xl object-cover rounded-t-lg mb-6">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-14 p-2">
    {currentMovies.map((movie) => (
      <Card key={movie.id} movie={movie} className="" />
    ))}
  </div>
</div>

        )}
        <div className="flex justify-center mt-4 ml-2">
          <button
            onClick={previousPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-900 text-white rounded-md mr-2 ${
              currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-600'
            }`}
          >
            Previous
          </button>
          <button
            onClick={nextPage}
            disabled={indexOfLastMovie >= movies.length - 1}
            className={`px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-900 text-white rounded-md mr-2 ${
             indexOfLastMovie >= movies.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-600'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

