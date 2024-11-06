"use client"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/app/firebaseconfig/firebase';
import { useRouter } from 'next/navigation';

export default function page() {
  const [signup, setsignup] = useState(false)
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const router = useRouter()
  const handleSignup = async (e) => {
    e.preventDefault()
    const email = e.target.elements[0].value
    if (email !== "") {
      try {
        const res = await createUserWithEmailAndPassword(auth, email, password)
        if (res.user !== null) {
          router.push("/")
       
        }

      } catch (error) {
        console.error(error);
        toast.error("invalid Credential!")
      }
    }
    
     
    

  }
  const handleLogin = async (e) => {
    e.preventDefault()
    const email = e.target.elements[0].value
    if (email !== "") {
      try {
        const res = await signInWithEmailAndPassword(auth, email, password)
        if (res.user !== null) {
          
          router.push("/")
        }

      } catch (error) {
        console.error(error);
        toast.error("invalid Credential!")
      }
    }



  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <div className="min-h-[350px]  w-[250px] flex flex-col items-center gap-10 justify-center shadow-2xl sm:min-h-[450px] sm:min-w-[350px]">
          <h1 className="capitalize text-4xl font-semibold">{signup ? "Sign up" : "Login"}</h1>
          {signup ? (<form onSubmit={handleSignup} className="flex flex-col gap-6 sm:gap-12 ">
            <input value={email} onChange={(e) => setemail(e.target.value)} className="bg-slate-100 w-[200px] rounded-xl border-[#DE3163] border-2 px-3 py-1 focus:outline-[#DE3163] outline-1 sm:w-[250px]" type="email" placeholder="enter email" />
            <input value={password} onChange={(e) => setpassword(e.target.value)} className="bg-slate-100 w-[200px] rounded-xl border-[#DE3163] border-2 px-3 py-1 focus:outline-[#DE3163] outline-1 sm:w-[250px]" type="text" placeholder="password" />
            <button className="bg-gray-900 text-white px-4 py-2 rounded-full" >Sign up</button>
          </form>) :
            (<form onSubmit={handleLogin} className="flex flex-col gap-6 sm:gap-8 ">
              <input value={email} onChange={(e) => setemail(e.target.value)} className="bg-slate-100 w-[200px] rounded-xl border-[#DE3163] border-2 px-3 py-1 focus:outline-[#DE3163] outline-1 sm:w-[250px]" type="email" placeholder="enter email" />
              <input value={password} onChange={(e) => setpassword(e.target.value)} className="bg-slate-100 w-[200px] rounded-xl border-[#DE3163] border-2 px-3 py-1 focus:outline-[#DE3163] outline-1 sm:w-[250px]" type="text" placeholder="password" />
              <button onClick={()=>toast.success("logging...")} className="bg-[#DE3163] text-white px-4 py-2 rounded-full">Login</button>
            </form>)}
          <button className="text-[#DE3163]" onClick={() => {setsignup(true)}}><strong className="text-gray-600">Don't have account : </strong>create account ?</button>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}
