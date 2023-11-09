'use client'
import React, { useState, useEffect } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original/';

const MovieDetails = ({ movie }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay for 2 seconds
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="container">
      {isLoading ? (
        <SkeletonTheme color="#f3f3f3" highlightColor="#ecebeb">
          <div className="w-full h-96">
            <Skeleton height="100%" width="100%" />
          </div>
          <div className="text-2xl font-bold mt-4">
            <Skeleton width="80%" />
          </div>
          <div className="max-w-xs text-xs md:max-w-lg md:text-lg mt-2">
            <Skeleton count={3} />
          </div>
          <div className="flex space-x-3 mt-2">
            <div className="w-20">
              <Skeleton width="100%" height="36px" />
            </div>
            <div className="w-20">
              <Skeleton width="100%" height="36px" />
            </div>
          </div>
        </SkeletonTheme>
      ) : (
        <div className="flex flex-col space-y-2 py-16 ml-4 md:space-y-4 h-[100vh] justify-center lg:pb-12">
          <div className="absolute top-0 left-0 -z-10 h-screen w-screen">
            <img
              src={IMAGE_BASE_URL + movie.poster_path}
              alt={movie.title}
              className="w-full h-full object-cover rounded-t-lg left-0 bottom-0 opacity-25 "
            />
          </div>
          <h1 className="text-2xl font-bold md:text-4xl lg:text-7xl ml-3">
            {movie?.title || movie?.name || movie?.original_name}
          </h1>
          <p className="max-w-xs text-xs md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl ml-3 overflow-hidden">
            {movie?.overview.split('\n').slice(0, 2).join('\n')}
          </p>
          <div className="flex space-x-3">
            <button className="bannerButton bg-white text-black">Play</button>
            <button className="bannerButton bg-[gray]/70">More Info</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
