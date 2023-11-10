'use client'
import React, { useState, useEffect } from 'react';
import { RingLoader } from 'react-spinners';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original/';

const override = `
  display: block;
  margin: 0 auto;
  border-color: #36D7B7;
`;
const MovieDetails = ({ movie }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay for 2 seconds
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="container">
      {isLoading ? (
        <div className="flex items-center justify-center h-screen md:ml-28">
          <RingLoader color="#36D7B7" loading={isLoading} css={override} size={150} />
        </div>
      ) : (
        <div className="flex flex-col space-y-2 py-16  md:space-y-4 h-[100vh] justify-center lg:pb-12 md:ml-8 ml-4 mr-4">
          <div className="absolute top-0 left-0 -z-10 h-screen w-screen">
            <img
              src={IMAGE_BASE_URL + movie.poster_path}
              alt={movie.title}
              className="w-full h-full object-cover rounded-t-lg left-0 bottom-0 opacity-25 "
            />
          </div>
          <h1 className="text-3xl font-bold md:text-4xl lg:text-7xl ml-3">
            {movie?.title || movie?.name || movie?.original_name}
          </h1>
          <p className="max-w-xs text-base  md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl ml-3 overflow-hidden line-clamp-2">
  {movie?.overview}
</p>

          <div className="flex space-x-3 ml-2">
            <button className="bannerButton bg-white text-black">Play</button>
            <button className="bannerButton bg-[gray]/70">More Info</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
