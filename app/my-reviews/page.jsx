"use client";
import { onAuthStateChanged } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { auth } from "../firebaseconfig/firebase";
import { databases } from "../appwrite";
import { Query } from "appwrite";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../components/Loading";


export default function page() {
  const [user, setUser] = useState(null);
  const [myreview, setMyReview] = useState(null);
  const [movieposter, setMoviePoster] = useState([]);
  const [input, setinput] = useState("")
  const api = `0d9b39d5607f8e82ff137062e6a6cf5d`;

  const databaseid = `6720ce5f0036bbe4d584`;
  const collectionid = `6720ce8d0007c4aa5e6b`;

  const fetchReviews = async (userId) => {
    const data = await databases.listDocuments(databaseid, collectionid, [
      Query.equal("userId", userId),
    ]);
    setMyReview(data.documents);

    const movieIds = data.documents.map((doc) => doc.movieId);
    const posters = await Promise.all(
      movieIds.map(async (id) => {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${api}`
        );
        const movie = await response.json();
        return { id, posterPath: movie.poster_path, title: movie.title, timestamp:movie.timestamp };
      })
    );
    setMoviePoster(posters);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        fetchReviews(user.uid);
      }
    });
    return unsubscribe;
  }, []);

  const handleDelete = async(reviewid,reviewuserId)=>{
    if (!user) {
      toast.error("You need to be logged in to delete a review.");
      return;
    }

    if (user.uid !== reviewuserId) {
      toast.error("You can only delete your own reviews.");
      return;
    }
    try{
       await databases.deleteDocument(databaseid,collectionid,reviewid)
       toast.success("Deleted successfully")
       fetchReview()
    }
    catch(error){
      toast.error("error")
      console.log(error);
      
    }
  }
  if (myreview === null) {
    return <Loading />
  }
  const handleSearch = (e) => {
    setinput(e.target.value)
    

  }
  const filterSearch = movieposter.filter(
    (movie) =>
      movie.title.toLowerCase().includes(input) )

  return (
    <>
      <div className=" flex justify-center p-5">
        <input className=" placeholder-black focus:p-2 placeholder:p-3 rounded-full bg-gray-100" value={input} onChange={(e) => handleSearch(e)} type="text" placeholder="search..." /></div>
      <div className="flex overflow-x-hidden flex-wrap  min-h-screen justify-center sm:justify-between items-center gap-5 w-full p-5" >

        {filterSearch &&
          filterSearch.map((movie, index) => {
            const review = myreview.find((review) => review.movieId === movie.id);

            return (
              <div className="bg-gray-900 w-[300px] flex items-center flex-col p-4 rounded-3xl" key={index}>
                <div >
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
                    alt="Movie Poster"
                    className="h-[350px] "
                  />
                  <div className="text-center text-white p-2">{movie.title}</div>
                </div>

                {review && (
                  <>
                  <div className="text-white">Date : {review.timestamp} </div>
                  <span className="text-white p-2 m-2 bg-gray-800 rounded-2xl w-[240px] flex justify-between items-center" >
                    <div>review : {review.text} </div>
                    <button onClick={() => handleDelete(review.$id,review.userId)} className="bg-red-600 p-2 rounded-md">Delete</button>
                  </span>
                  </>
                )}
              </div>
            );
          })}
        <ToastContainer />
      </div>
    </>
  );
}
