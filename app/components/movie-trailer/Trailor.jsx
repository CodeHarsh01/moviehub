import React from 'react'
import { RxCross2 } from "react-icons/rx";
import { useState, useEffect } from 'react';

export default function Trailor({ movieid ,setclose}) {
    const [trailerKey, setTrailerKey] = useState(null);
    const apiKey = "0d9b39d5607f8e82ff137062e6a6cf5d";

    const closeTrailor =()=>{
       setclose(false)
    }

    useEffect(() => {
        const fetchTrailer = async () => {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/${movieid}/videos?api_key=${apiKey}&language=en-US`
                );
                const data = await response.json();
                const trailer = data.results.find(
                    (video) => video.type === "Trailer" && video.site === "YouTube"
                );
                if (trailer) {
                    setTrailerKey(trailer.key);
                }
            } catch (error) {
                console.error("Error fetching trailer:", error);
            }
        };

        if (movieid) {
            fetchTrailer();
        }
    }, [movieid]);
    console.log();
    
    return (
        <div className="bg-white h-[500px] w-[800px] m-2 p-2 sm:p-5 rounded-2xl flex flex-col">
            <div className=" h-[10%] justify-end flex ">
                <RxCross2 className="text-xl cursor-pointer" onClick={closeTrailor}/>
            </div>
            { trailerKey && trailerKey.length>0 ?
            (<div>
                {trailerKey ? (
                    <iframe
                        width="100%"
                        height="400"
                        src={`https://www.youtube.com/embed/${trailerKey}`}
                        title="Movie Trailer"
                    ></iframe>
                ) : (
                    <p>Trailer not available.</p>
                )}
            </div>)
            :
            (<div className= "h-full justify-center items-center flex">
                <p className="text-2xl">loading...</p>
            </div>)
            }
        </div>
    )
}
