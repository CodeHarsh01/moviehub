"use client"
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Loading from '../Loading';

export default function Page() {
    const params = useParams()
    const id = params.Genresdetail
    

    const [movies, setMovies] = useState([]);
    const api = '0d9b39d5607f8e82ff137062e6a6cf5d';

    useEffect(() => {
        async function fetchMovies() {
            const res = await fetch(
                `https://api.themoviedb.org/3/discover/movie?api_key=${api}&with_genres=${id}`
            );

            const data = await res.json();
            setMovies(data.results);
        }

        fetchMovies();
    }, []);

    if(!movies.length){
      return <Loading/>
    }

    return (
        <div>
           
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-center p-5 w-full">
                {movies && movies.length > 0 ? (
                    movies.map((movie) => (
                        <Link
                            key={movie.id}
                            href={`/movie/${movie.id}`}
                            className="h-[350px] cursor-pointer w-[250px] movie-card bg-gray-800 text-white rounded-lg overflow-hidden flex-shrink-0 mx-auto"
                        >
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                                className="w-full h-64 object-cover"
                            />
                            <div className="p-4 text-center">
                                <h3 className="text-xl">{movie.title}</h3>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p>No movies available</p>
                )}
            </div>
        </div>
    );
}