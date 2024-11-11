"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

export default function page() {

    const [movies, setmovies] = useState()
    const router = useRouter()

    const api = `0d9b39d5607f8e82ff137062e6a6cf5d`

    useEffect(() => {
        async function fetchmovie() {
            const res = await fetch(
                `https://api.themoviedb.org/3/genre/movie/list?api_key=${api}&language=en-US`
            );
            const data = await res.json();
            setmovies(data.genres);
        }
        fetchmovie()
    }, [])

    return (
   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-5 min-h-screen justify-center items-center w-full">
    {movies && movies.length > 0 ? 
        movies.map((movie) => (
            <Link key={movie.id} className=" grid h-full w-full justify-center" href={`/components/${movie.id}`}>
                <div className="w-[200px] bg-gray-800 h-[100px] text-xl m-5 rounded-md text-white flex justify-center items-center" >
                    <h1>{movie.name}</h1>
                </div>
            </Link> 
        ))
    : 
        <p>No Genres</p>   
    }
</div>

    )
}
