import React from 'react'
import { useEffect,useState } from 'react';

export default function Watchmovie({movieId}) {
    const [watchProviders, setWatchProviders] = useState(null);
    const api = '0d9b39d5607f8e82ff137062e6a6cf5d';
    const fetchWatchProviders = async (movieId) => {
        const res = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=${api}`
        );
        const data = await res.json();
        setWatchProviders(data.results?.IN || null);
    };
    useEffect(() => {
        fetchWatchProviders(movieId);
    }, [movieId]);

    
    return (
        <div>
        {watchProviders ? 
        <div >
            <div className="p-2">
            <h1 className="font-semibold capitalize">buying options:</h1>
            <div className="flex flex-col md:flex-row gap-4 my-5">
                {watchProviders.buy ? watchProviders.buy.map((provider, i) => (
                    <div key={i} className="flex items-center gap-2">
                        <img src={`https://image.tmdb.org/t/p/w200${provider.logo_path}`} alt={provider.provider_name} className="w-16 h-16 rounded-lg" />
                        <span>{provider.provider_name }</span>
                    </div>
                )): <p>Not available..</p>}
                </div>
            </div>
            <div className="p-2">
            <h1 className="font-semibold capitalize">rent options:</h1>
            <div className="flex flex-col md:flex-row gap-4 my-5">
                {watchProviders.rent ? watchProviders.rent.map((provider, i) => (
                    <div key={i} className="flex items-center gap-2">
                        <img src={`https://image.tmdb.org/t/p/w200${provider.logo_path}`} alt={provider.provider_name} className="w-16 h-16 rounded-lg" />
                        <span>{provider.provider_name}</span>
                    </div>
                )): <p>Not available..</p>}
                </div>
            </div>
            <div className="p-2">
            <h1 className="font-semibold capitalize">Flatrate options:</h1>
            <div className="flex flex-col md:flex-row gap-4 my-5">
                {watchProviders.flatrate ? watchProviders.flatrate.map((provider, i) => (
                    <div key={i} className="flex items-center gap-2">
                        <img src={`https://image.tmdb.org/t/p/w200${provider.logo_path}`} alt={provider.provider_name} className="w-16 h-16 rounded-lg" />
                        <span>{provider.provider_name}</span>
                    </div>
                )): <p>Not available..</p>}
                </div>
            </div>
        </div>
         : 
         <p>Not available in India or may be coming soon...</p>}
        </div>
    )
}
