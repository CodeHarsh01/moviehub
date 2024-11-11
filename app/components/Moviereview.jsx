import { onAuthStateChanged } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { auth } from "../firebaseconfig/firebase";
import { useParams } from "next/navigation";
import { databases } from "../appwrite";
import { Query } from "appwrite";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const MovieReviewSection = () => {
  const [userReview, setUserReview] = useState("");
  const [reviewdata, setreviewdata] = useState([]);
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const date = new Date().toLocaleDateString()

  
  const databaseid = `6720ce5f0036bbe4d584`
  const collectionid = `6720ce8d0007c4aa5e6b`

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userReview.trim() && user) {
      try {
        const newReview = {
          movieId: parseInt(id, 10), 
          text: userReview, 
          user:user.email.split("@")[0],
          timestamp: date,
          userId: user.uid
        };
  
       await databases.createDocument(
          databaseid,
          collectionid,
          'unique()', 
          newReview
        );
        setUserReview(''); 
        toast.success("submitted successfully")
        fetchReview()
      } catch (error) {
        toast.error("error")
        console.error(error);
      }
    }
    
  };

  
    const fetchReview = async()=> {
    try{
      const movieId = parseInt(id, 10);
      const x =  await databases.listDocuments(databaseid,collectionid,[Query.equal("movieId", movieId)])
      setreviewdata(x.documents);
    }
    catch(error){
      console.error(error);
      
    }
  }
  useEffect(() => {
   fetchReview()
  }, [id])
  

  useEffect(() => {
    const y = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return ()=> y()
  }, []);

  const handleDelete = async(reviewid)=>{
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
  return (
    <div className="w-[80%] sm:w-[550px] md:w-[500px] lg:w-[700px] xl:w-[900px] mx-auto p-4 bg-gray-900 rounded-lg shadow-lg text-white">
      <h2 className="text-2xl font-semibold mb-4">Leave a Review</h2>

      <form onSubmit={handleSubmit} className="mb-8">
        <textarea
          name="text"
          placeholder="Write your review here..."
          value={userReview}
          onChange={(e) => setUserReview(e.target.value)}
          className="w-full p-3 rounded-md bg-gray-800 text-white resize-none h-24"
        ></textarea>
          <ToastContainer />
        <button
          type="submit"
          className="mt-4 w-full p-2 bg-blue-600 hover:bg-blue-700 rounded-md font-semibold"
        >
          Submit Review
        </button>
      </form>

      <div>
        <h3 className="text-xl font-semibold mb-4">User Reviews</h3>
        {reviewdata && reviewdata.length > 0 ? (
          reviewdata.map((review,i ) => (
            <div key={i} className="mb-4 p-3 bg-gray-800 rounded-md">
              <div className="flex flex-col sm:flex-row justify-between">
              <h1 className="capitalize px-2 py-2 flex flex-col items-center sm:block">
                {review.user}
                <span className="px-2">{review.timestamp}</span>
              </h1>
              {user? <button onClick={()=>handleDelete(review.$id)} className="bg-red-600 p-2 rounded-md">Delete</button>: ""}
              </div>
              <p className="mt-2 p-2 rounded-md bg-gray-900">{review.text}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No reviews yet. Be the first to review!</p>
        )}
      </div>
    </div>
  );
};

export default MovieReviewSection;
