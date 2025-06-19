import React from 'react'
import { useEffect,useState} from 'react'

export default function MovieCast({movieid}) {
    const [cast, setcast] = useState(null)
    const [crew, setcrew] = useState(null)
    var api_key = `0d9b39d5607f8e82ff137062e6a6cf5d`
    
    useEffect(()=>{
        try{
        async function fetchmoviecast() {
           const response = await fetch(`https://api.themoviedb.org/3/movie/${movieid}/credits?api_key=${api_key}
        `) 
        const data =await response.json()
       
        if(movieid){
            setcast(data.cast);
            setcrew(data.crew);
        }
        }
        fetchmoviecast()
    }
    catch(error){
        console.error(error);
        
    }
    },[movieid])
    
  return (
    <div className="p-5">
        <h1 className=" font-semibold text-2xl">Cast</h1>
        <div className="max-w-6 bg-black h-1 mt-1"> </div>
        <div className="max-h-[600px] flex overflow-y-hidden flex-nowrap overflow-x-auto space-x-4 scroll-smooth  m-5">
            {cast && cast.map((v,i)=>(
                v.profile_path ?
                <div key={i} className = "max-h-[350px] min-w-[200px] shadow-xl flex items-center flex-col p-2 gap-1">
                    <div className="h-[210px] p-2"><img src={`https://image.tmdb.org/t/p/w200${v.profile_path}`} alt="not available" className="rounded-lg h-full"/></div>
                    <h1 className="font-bold">{v.name}</h1>
                    <div className="w-[80%] text-center">
                    <h2>Role : {v.known_for_department}</h2>
                    <h2>Character : {v.character}</h2>
                    </div>
                </div>
                : null
            ))}
        </div>
        <h1 className=" font-semibold text-2xl">Crew</h1>
        <div className="max-w-6 bg-black h-1 mt-1"></div>
        <div className="max-h-[600px] flex overflow-y-hidden flex-nowrap overflow-x-auto space-x-4 scroll-smooth  m-5">
            {crew && crew.map((v,i)=>(
                v.profile_path ?
                <div key={i} className = "max-h-[350px] min-w-[200px] shadow-xl flex items-center justify-betwee flex-col p-2 gap-1">
                    <div className="h-[210px] p-2"><img src={`https://image.tmdb.org/t/p/w200${v.profile_path}`} alt="not available" className="rounded-lg h-full"/></div>
                    <div className="w-[80%] text-center">
                    <h1 className="font-bold">{v.name}</h1>
                    <h2>Role : {v.department}</h2>
                    </div>
                </div>
                : null
            ))}
        </div> 
    </div>
  )
}
