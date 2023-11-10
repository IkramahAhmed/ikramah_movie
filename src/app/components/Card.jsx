import Link from "next/link";
import Skeleton from "react-loading-skeleton";

function Card({ movie }) {
  const IMAGE_BASE_URL = "https://www.themoviedb.org/t/p/w220_and_h330_face";

  // Round the vote_average to two decimal places
  const roundedRating = movie.vote_average.toFixed(1);

  return (
    <Link href={`/movies/${movie.id}`} className="text-decoration-none">
      <div className="bg-white rounded-lg shadow-md relative transition-transform hover:scale-105">
        {movie.poster_path ? (
          <div className="relative">
            <img
              src={IMAGE_BASE_URL + movie.poster_path}
              alt=""
              className="w-full h-auto object-cover rounded-t-lg"
            />
            <div className="absolute top-2 right-2">
              <div className="w-12 h-12 bg-gradient-to-tr  from-orange-500 to-orange-900 rounded-full text-white flex items-center justify-center text-2xl -mt-6 -mr-6">
                {roundedRating}
              </div>
            </div>
          </div>
        ) : (
          <Skeleton height={240} />
        )}
        <div className="p-4">
          {movie.title ? (
            <h5 className="text-xl font-semibold text-gray-900 overflow-ellipsis line-clamp-1">
              {movie.title}
            </h5>
          ) : (
            <Skeleton height={20} width={80} />
          )}
          {movie.release_date ? (
            <p className="text-black">{movie.release_date}</p>
          ) : (
            <Skeleton height={15} width={80} />
          )}
        </div>
      </div>
    </Link>
  );
}

export default Card;
