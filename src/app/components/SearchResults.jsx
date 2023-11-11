"use client"

import { useEffect, useState } from "react";
import Card from "./Card";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

function SearchResults({ searchText, movies }) {
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchError, setSearchError] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      const filtered = movies.slice(0, itemsPerPage);
      setFilteredMovies(filtered);
      setLoading(false);
      setSearchError(filtered.length === 0); 
    }, 2000);
  }, [movies]);

  const filterMovies = (filter) => {
    let sortedMovies = [];
    switch (filter) {
      case "release_date":
        sortedMovies = [...movies].sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
        break;

      case "popularity":
        sortedMovies = [...movies].sort((a, b) => b.popularity - a.popularity);
        break;

      case "vote_average":
        sortedMovies = [...movies].sort((a, b) => b.vote_average - a.vote_average);
        break;

      default:
        break;
    }
    const filtered = sortedMovies.slice(0, itemsPerPage);
    setFilteredMovies(filtered);
    setCurrentPage(1);
    setSearchError(filtered.length === 0); // Set error if no movies found
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      const startIndex = (currentPage - 2) * itemsPerPage;
      const filtered = movies.slice(startIndex, startIndex + itemsPerPage);
      setFilteredMovies(filtered);
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    const startIndex = currentPage * itemsPerPage;
    if (startIndex < movies.length) {
      const filtered = movies.slice(startIndex, startIndex + itemsPerPage);
      setFilteredMovies(filtered);
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
    
      <div className="flex flex-col md:flex-row justify-between my-3 mx-3 mt-40 sm:mr-2">
        <h1 className="text-2xl font-semibold mb-4 md:mb-0">
          Top Search Results for &quot;{searchText}&quot;
        </h1>
        <div className="md:flex space-y-2 md:space-y-0 md:space-x-2 space-x-1">
          {!searchError && (
            <>
              <button
                onClick={() => filterMovies("release_date")}
                className="bg-gradient-to-r from-orange-500 to-orange-700 text-white px-4 py-2 rounded focus:outline-none hover:from-orange-600 hover:to-orange-900 transition duration-300"
              >
                Release Year
              </button>
              <button
                onClick={() => filterMovies("popularity")}
                className="bg-gradient-to-r from-orange-500 to-orange-700 text-white px-4 py-2 rounded focus:outline-none hover:from-orange-600 hover:to-orange-900 transition duration-300"
              >
                Popularity
              </button>
              <button
                onClick={() => filterMovies("vote_average")}
                className="bg-gradient-to-r from-orange-500 to-orange-700 text-white px-4 py-2 rounded focus:outline-none hover:from-orange-600 hover:to-orange-900 transition duration-300"
              >
                Ratings
              </button>
            </>
          )}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center">
          <SkeletonTheme color="#e1e1e1" highlightColor="#f2f2f2">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-14 sm:m-2">
              {/* Use Skeleton components for each card */}
              {Array.from({ length: itemsPerPage }).map((_, index) => (
                <Skeleton key={index} height={400} width={230} />
              ))}
            </div>
          </SkeletonTheme>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          {searchError ? (
            <p>No movie Found</p>
          ) : (
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-14 sm:m-2 p-4
            max-w-7xl mx-auto w-[94%] mb-4">       
  {filteredMovies.map((movie) => (
                // Check if the movie has a poster image
                movie.poster_path ? (
                  <Card key={movie.id} movie={movie} />
                ) : (
                  // If the movie doesn't have a poster image, skip it
                  null
                )
              ))}
            </div>
          )}
        </div>
      )}

      {!searchError && (
        <div className="flex justify-center mt-4">
          <button
            onClick={handlePreviousPage}
            

            className={`px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-900 text-white rounded-md mr-2 ${
              currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-600'
            }`}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            className={`px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-900 text-white rounded-md mr-2 ${
              currentPage * itemsPerPage >= movies.length ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-600'
            }`}
            disabled={currentPage * itemsPerPage >= movies.length}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default SearchResults;
