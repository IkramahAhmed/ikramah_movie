'use client'
import { useState, useEffect } from 'react';
import { fetchMoviePosters } from '../../utils/requests';
import MovieDetails from './components/MovieDetails';

export default function Hero() {
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const fetchTrendingMovies = async () => {
            try {
                const trendingMovies = await fetchMoviePosters();
                const randomMovie = trendingMovies[Math.floor(Math.random() * trendingMovies.length)];
                setMovie(randomMovie);  
            } catch (error) {
                console.error('Error fetching trending movies: ', error);
            }
        };

        fetchTrendingMovies();
    }, []); 

    return (
        <div className="">
            <MovieDetails movie={movie} />
        </div>
    );
}
