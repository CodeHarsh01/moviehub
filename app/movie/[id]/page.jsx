"use client";

import Loading from '@/app/components/Loading';
import MovieReviewSection from '@/app/components/Moviereview';
import { auth } from '@/app/firebaseconfig/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function MovieDetailPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [user, setuser] = useState(null)
  const api = '0d9b39d5607f8e82ff137062e6a6cf5d';


  useEffect(() => {

    
    onAuthStateChanged((auth),user=>{
      setuser(user)
    })
    async function fetchMovieDetails() {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${api}&language=en-US`
      );
      const data = await res.json();
      setMovie(data);
    }
    if (id) {
      fetchMovieDetails();
    }

  }, [id]);


  if (!movie) {
    return <Loading />
  }
 
  return (
    <>
      <div className="min-h-screen">
        <div className="min-h-full relative">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full min-h-[1300px] md:min-h-[700px] lg:min-h-[800px] object-cover"
          />
          <div className="min-h-[1300px] md:min-h-[700px] lg:min-h-[800px] bg-black bg-opacity-80 absolute top-0 left-0 right-0"></div>
          <div className="absolute top-0 left-0 right-0 flex flex-col md:flex-row text-white h-full p-10 items-center gap-10">
            <div className="h-[400px] min-w-[200px] sm:h-[500px] sm:min-w-[350px] ">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="h-full w-full"
              />
            </div>
            <div>
              <h1 className="text-2xl sm:text-4xl font-bold"><a className="cursor-pointer" href={movie.homepage}>
                {movie.title}
                <span>({movie.release_date.split('-')[0]})</span>
              </a>
              </h1>
              <div className="pt-1 pb-1 text-sm flex flex-col lg:flex-row gap-2">
                <p>{movie.origin_country}</p>
                <p>{movie.release_date}</p>
                <span className="flex gap-1">{movie.genres.map((v,i) => (
                  <div key={i}>
                    <p >{v.name + ","}</p>
                  </div>
                ))}</span>
              </div>
              <div className="flex items-center gap-2 pt-2 pb-2">
                <div className="border-zinc-100 border-[3px] p-[30px] rounded-full w-[40px] h-[40px] flex justify-center items-center text-xl">
                  <div className="bg-[#DE3163] rounded-full p-4 w-[50px] h-[50px] flex justify-center items-center">
                    {Math.round(movie.vote_average * 10) + "%"}
                  </div>
                </div>
                <span className="text-lg font-medium">User<br />Score</span>
                {/* <div>dd</div> */}
              </div>
              {/* <div>eds</div> */}
              <div className="pt-2 pb-2 text-white text-opacity-70 italic">{movie.tagline}</div>
              <div className="flex flex-col gap-3">
                <h1 className="text-xl font-semibold text-white text-opacity-70">Overview</h1>
                <p className="w-[100%]">{movie.overview}</p>
                <h1 className="text-xl font-semibold text-opacity-70 text-white">Production Company</h1>
                <ul className="grid grid-cols-3 gap-2">
                  {movie.production_companies.map((v,i) => (
                    <li key={i} className="font-medium list-disc capitalize">{v.name}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="p-6 flex  justify-between flex-col md:flex-row  lg:flex-row min-h-screen gap-5">
          <div className="cursor-pointer">
            <h1 className=" font-semibold text-xl">Reviews</h1>
            <div className="max-w-12 bg-black h-1 mt-1"> </div>
            <div className="mt-5">
              {user?<MovieReviewSection />:(<p className=" capitalize">please login for view or review <a href={"/Auth/Login"} className="uppercase font-semibold underline">Login</a></p>)}
            </div>
          </div>
          <div className="min-h-[500px] shadow-xl flex flex-col gap-2 px-6 py-8 min-w-[230px] lg:min-w-[300px]">
            <h1 className="text-xl ">status</h1>
            <li className="text-black text-opacity-70 list-disc">{movie.status}</li>
            <h1 className="text-lg ">Original language</h1>
            <li className="text-black text-opacity-70 list-disc">{movie.spoken_languages[0].name}</li>
            <h1 className="text-lg ">Budget</h1>
            <li className="text-black text-opacity-70 list-disc">{movie.budget=="0"? "not disclosed" : ("$"+ movie.budget)}</li>
            <h1 className="text-lg ">Revenue</h1>
            <li className="text-black text-opacity-70 list-disc">{movie.revenue=="0"? "not disclosed" : ("$"+movie.revenue)}</li>
            <h1 className="text-lg ">Genres </h1>
            <ul className="text-black text-opacity-70 list-disc px-5">{movie.genres.map((v,i)=>(<li key={i}>{v.name}</li>))}</ul>
          </div>
        </div>
      </div>
    </>
  )
}
