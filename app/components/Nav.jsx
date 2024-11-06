"use client";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Link from "next/link";
import { IoIosSearch } from "react-icons/io";
import { auth } from "../firebaseconfig/firebase";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CiMenuFries } from "react-icons/ci";

export default function Nav() {
  const [username, setusername] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [input, setinput] = useState("");
  const [user, setuser] = useState(null);
  const [navmenu, setnavmenu] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function useremail() {
      onAuthStateChanged(auth, (user) => {
        setusername(user?.email.split("@")[0]);
        setuser(user);
      });
    }
    useremail();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    signOut(auth);
  };

  const handleSearch = (e) => {
    setinput(e.target.value);
  };

  const handleinput = () => {
    router.push(`/Search/${input}`);
  };

  return (
    <>
      <nav className="flex flex-col md:flex-row border-b-2 border-[#DE3163] justify-between px-5 py-3 min-h-[10vh] items-center">
        <div className="w-full flex items-center justify-between md:w-[10%]">
          <a href="/" className="text-2xl cursor-pointer font-normal">Moviehub</a>
          <div className="md:hidden" onClick={() => setnavmenu(!navmenu)}>
            <CiMenuFries />
          </div>
        </div>
        
        {/* Mobile Menu */}
        <ul
          className={`${
            navmenu ? 'flex' : 'hidden'
          } flex-col items-center gap-8 cursor-pointer m-4 md:flex-row md:flex`}
        >
          <Link href={`/`}>Home</Link>
          <Link href={`/components/Toprated`}>Top Rated</Link>
          <Link href={`/components/Geners`}>Genres</Link>
        </ul>

        <div className="flex p-4 gap-5 h-full items-center md:p-0">
          <div className="flex h-full items-center">
            <input
              placeholder="search..."
              type="text"
              value={input}
              onChange={(e) => handleSearch(e)}
              className="px-3 py-1 bg-slate-100 max-w-[100px] sm:max-w-[150px]  rounded-2xl focus:outline-[#DE3163] outline-1"
            />
            <div className="bg-[#DE3163] rounded-full p-2 cursor-pointer text-white ml-2">
              <IoIosSearch className="text-xl" onClick={handleinput} />
            </div>
          </div>
          {username ? (
            <div className="relative">
              <div className="uppercase cursor-pointer" onClick={toggleMenu}>
                <h1>{username}</h1>
              </div>

              {isMenuOpen && (
                <div className="z-50 absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => user && router.push("/my-reviews")}
                  >
                    My Reviews
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-[#DE3163] text-white px-4 py-2 rounded-full">
              <Link href="/Auth/Login">
                <button>Login</button>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
