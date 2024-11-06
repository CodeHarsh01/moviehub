"use client"
import Link from 'next/link';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

export default function Homesectionmovies() {

    const [movies, setmovies] = useState()

    const api = `0d9b39d5607f8e82ff137062e6a6cf5d`

    useEffect(() => {
        async function fetchmovie() {
            const res = await fetch(
                `https://api.themoviedb.org/3/movie/popular?api_key=${api}&language=en-US&page=1`
            );

            const data = await res.json();
            setmovies(data.results);

        }
        fetchmovie()
    }, [])

    return (
        <div>
            <h1 className="text-center p-8 text-4xl">Featured Movies</h1>
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
    )
}