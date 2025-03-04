"use client";
import { onAuthStateChanged } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { auth } from "../firebaseconfig/firebase";
import { databases } from "../appwrite";
import { Query } from "appwrite";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../components/Loading";

export default function Page() {
  const [user, setUser] = useState(null);
  const [myReviews, setMyReviews] = useState(null);
  const [moviePosters, setMoviePosters] = useState([]);
  const [input, setInput] = useState("");

  const API_KEY = `0d9b39d5607f8e82ff137062e6a6cf5d`;
  const DATABASE_ID = `6720ce5f0036bbe4d584`;
  const COLLECTION_ID = `6720ce8d0007c4aa5e6b`;

  const fetchReviews = async (userId) => {
    try {
      const data = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
        Query.equal("userId", userId),
      ]);
      setMyReviews(data.documents);

      const movieIds = data.documents.map((doc) => doc.movieId);
      const posters = await Promise.all(
        movieIds.map(async (id) => {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
          );
          const movie = await response.json();
          return {
            id,
            posterPath: movie.poster_path,
            title: movie.title,
            timestamp: movie.timestamp,
          };
        })
      );
      setMoviePosters(posters);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        fetchReviews(user.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = async (reviewId, reviewUserId) => {
    if (!user) {
      toast.error("You need to be logged in to delete a review.");
      return;
    }
    if (user.uid !== reviewUserId) {
      toast.error("You can only delete your own reviews.");
      return;
    }
    try {
      await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, reviewId);
      toast.success("Deleted successfully");
      fetchReviews(user.uid);
    } catch (error) {
      toast.error("Error deleting review.");
      console.error(error);
    }
  };

  if (myReviews === null) {
    return <Loading />;
  }

  const handleSearch = (e) => {
    setInput(e.target.value);
  };

  const filteredMovies = moviePosters.filter((movie) =>
    movie.title.toLowerCase().includes(input.toLowerCase())
  );

  return (
    <>
      <div className="flex justify-center p-5">
        <input
          className="placeholder-black focus:p-2 placeholder:p-3 rounded-full bg-gray-100"
          value={input}
          onChange={handleSearch}
          type="text"
          placeholder="Search..."
        />
      </div>
      <div className="flex flex-wrap min-h-screen justify-center sm:justify-between items-center gap-5 w-full p-5">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie, index) => {
            const review = myReviews.find(
              (review) => review.movieId === movie.id
            );

            return (
              <div
                className="bg-gray-900 w-[300px] flex flex-col items-center p-4 rounded-3xl"
                key={index}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
                  alt="Movie Poster"
                  className="h-[350px]"
                />
                <div className="text-center text-white p-2">{movie.title}</div>

                {review && (
                  <>
                    <div className="text-white">Date: {review.timestamp}</div>
                    <div className="text-white p-2 m-2 bg-gray-800 rounded-2xl w-[240px] flex justify-between items-center">
                      <div>Review: {review.text}</div>
                      <button
                        onClick={() => handleDelete(review.$id, review.userId)}
                        className="bg-red-600 p-2 rounded-md"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            );
          })
        ) : (
          <p className="text-white text-center">No reviews found.</p>
        )}
        <ToastContainer />
      </div>
    </>
  );
}
