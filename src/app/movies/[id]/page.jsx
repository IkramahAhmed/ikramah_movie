'use client'
import { useEffect, useState } from 'react';
import { getMovieDetails, getSimilarMovies } from '../../../../utils/requests';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const IMAGE_BASE_URL = 'https://www.themoviedb.org/t/p/w220_and_h330_face';




  function MovieDetailsPage({ params }) {
    const [loading, setLoading] = useState(true);
    const [movieDetails, setMovieDetails] = useState(null);
    const [similarMovies, setSimilarMovies] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const details = await getMovieDetails(params.id);
          const similar = await getSimilarMovies(params.id);
  
          setTimeout(() => {
            setMovieDetails(details);
            setSimilarMovies(similar);
            setLoading(false);
          }, 1000);
        } catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false);
        }
      };
  
      fetchData();
    }, [params.id]);

  return (
    <SkeletonTheme color="#202020" highlightColor="#444">

      <div className="my-6 mx-8 mt-28">
        {movieDetails ? (
          <div className="flex flex-wrap items-center">
            <div className="w-full md:w-1/3">
              <img
                src={IMAGE_BASE_URL + movieDetails.backdrop_path}
                alt={movieDetails.title}
                className="w-full rounded-md shadow-lg"
              />
            </div>
            <div className="w-full md:w-2/3 p-4 flex flex-col">
              <h3 className="text-3xl font-bold mb-4">{movieDetails.title}</h3>
              <div className="flex mb-4">
                <div className="w-1/2 md:w-1/3">
                <p className="py-1 px-2 bg-warning text-white rounded">
                <span className="font-semibold">Release Date</span>
              </p>
              <p className="py-1 px-2 bg-warning text-white rounded">
                <span className="font-semibold">Movie Status</span>
              </p>
              <p className="py-1 px-2 bg-warning text-white rounded">
                <span className="font-semibold">Language</span>
              </p>
              <p className="py-1 px-2 bg-warning text-white rounded">
                <span className="font-semibold">Run Time</span>
              </p>
              <p className="py-1 px-2 bg-warning text-white rounded">
                <span className="font-semibold">Rating</span>
              </p>
              <p className="py-1 px-2 bg-warning text-white rounded">
                <span className="font-semibold">Genre</span>
              </p>
                </div>



                <div className="w-1/2 md:w-2/3">
                <p className="py-1 px-2 bg-warning text-white rounded">
              <span>:</span>  {movieDetails.release_date}
              </p>
              <p className="py-1 px-2 bg-warning text-white rounded">
              <span>:</span>   {movieDetails.status}
              </p>
              <p className="py-1 px-2 bg-warning text-white rounded">
              <span>:</span>   {movieDetails.original_language}
              </p>
              <p className="py-1 px-2 bg-warning text-white rounded">
              <span>:</span>   {movieDetails.runtime}
              </p>
              <p className="py-1 px-2 bg-warning text-white rounded">
              <span>:</span>   {movieDetails.vote_average}
              </p>
              <div className="">
          
            <div className="flex flex-wrap py-1 px-2">
            <span className="">:</span>
              {movieDetails.genres.map((genre) => (
                
                <span
                  className=" bg-dark text-white me-2 ml-1 mb-2 rounded"
                  key={genre.id}
                >
                  {genre.name}
                </span>
              ))}
            </div>
            </div>


                </div>

              </div>

              <h3 className="text-xl font-bold ml-2">Storyline:</h3>
              <p className="ml-2">{movieDetails.overview}</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap items-center">
            <Skeleton width={370} height={600} className="w-full md:w-1/3 rounded-md shadow-lg" />
            <div className="w-full md:w-2/3 p-4">
              <Skeleton height={30} width={150} className="mt-6 mb-4" />
              <Skeleton height={15} width={300} className="mb-4" />
              <Skeleton height={15} width={300} className="mb-4" />
              <Skeleton height={15} width={300} className="mb-4" />
              <Skeleton height={15} width={300} className="mb-4" />
              <Skeleton height={15} width={300} className="mb-4" />
              <Skeleton height={15} width={300} className="mb-4" />

              <Skeleton height={120} width={380} className="mb-4" />
            </div>
          </div>
        )}
      </div>
    </SkeletonTheme>
  );
}

export default MovieDetailsPage;


