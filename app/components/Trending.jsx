"use client"
import Link from 'next/link';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

export default function Trending() {

  const [trendingMovies, setmovies] = useState()

  const api = `0d9b39d5607f8e82ff137062e6a6cf5d`

  useEffect(() => {
    async function fetchmovie() {
      const res = await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${api}`
      );

      const data = await res.json();
      setmovies(data.results);

    }
    fetchmovie()
  }, [])

  return (
    <div>
      <h1 className="text-center p-8 text-4xl">Trending Movies</h1>
      <div className="flex flex-nowrap overflow-x-auto space-x-4 p-2 scroll-smooth">
        {trendingMovies && trendingMovies.length > 0 ? (
          trendingMovies.map((movie) => (
            <Link key={movie.id} href={`/movie/${movie.id}`} className="h-[350px] cursor-pointer w-[200px] movie-card bg-gray-800 text-white rounded-lg overflow-hidden flex-shrink-0">
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
          <p>No trending movies available</p>
        )}
      </div>
    </div>
  )
}
