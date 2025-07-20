import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase.js';
import { motion } from 'framer-motion';



const LevelsPage = () => {

  const navigate = useNavigate()

  const { section } = useParams();
  const [levels, setLevels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPro, setisPro] = useState(false)
  const [User, setUser] = useState(false)
  const [LogDiv, setLogDiv] = useState(false)



  //Showing the Log div
  useEffect(() => {
    if (LogDiv) {
      const timer = setTimeout(() => {
        setLogDiv(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [LogDiv]);




  // check the user is in pro version or not
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          setUser(true)
          setisPro(docSnap.data().isPro);
        }
      } else {
        setisPro(false);
      }
    });

    return () => unsubscribe();
  }, []);


  // Fetch all levels for the section (e.g., cpp, java)
  useEffect(() => {
    setLoading(true);
    const url = (`${import.meta.env.VITE_API_BASE_URL}/levels/${section}`)
    console.log("👉 Fetching from:", url); // TEMP LOG

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('Section not found');
        return res.json();
      })
      .then((data) => {
        setLevels(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [section]);

  const headingText = section === 'cpp' ? 'C++' : section.charAt(0).toUpperCase() + section.slice(1);
if (loading) {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-black">
      <div className="flex gap-6">
        {/* Bouncing Balls */}
        <div className="w-6 h-6 bg-pink-500 rounded-full animate-bounce shadow-lg shadow-pink-500"></div>
        <div className="w-6 h-6 bg-purple-500 rounded-full animate-bounce animation-delay-200 shadow-lg shadow-purple-500"></div>
        <div className="w-6 h-6 bg-blue-500 rounded-full animate-bounce animation-delay-400 shadow-lg shadow-blue-500"></div>

        {/* Bouncing Squares */}
        <div className="w-6 h-6 bg-yellow-500 animate-bounce-square shadow-lg shadow-yellow-500"></div>
        <div className="w-6 h-6 bg-green-500 animate-bounce-square animation-delay-300 shadow-lg shadow-green-500"></div>
      </div>

      {/* Custom CSS for square animation */}
      <style>{`
        .animate-bounce-square {
          animation: bounceSquare 1s infinite ease-in-out;
        }

        @keyframes bounceSquare {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px) rotate(15deg);
          }
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-300 {
          animation-delay: 0.3s;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }
      `}</style>
    </div>
  );
}


  if (error) return <p className="text-white text-2xl">{error}</p>;



  const levelHeadings = [
    '⚙️ Beginner Warrior ',
    '💡 Problem Solver ',
    '🔍 Bug Hunter ',
    '🔧 Debug Specialist ',
    '⚔️ Master Debugger '
  ]

  return (
    <>
      <div className='flex justify-between relative'>

        {LogDiv && (
          <motion.div
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '-100%', opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed top-12 left-6 z-50"
          >
            <div className="bg-gray-900 rounded-xl border border-white px-6 py-3 flex flex-col sm:flex-row items-center gap-4 shadow-lg">
              <span className="text-white text-lg font-medium text-center">
                You have to sign in to play levels.
              </span>
              <button
                onClick={() => navigate('/loginpage')}
                className="cursor-pointer px-4 py-1 rounded-full text-white bg-gradient-to-br from-sky-500 to-blue-700 border border-white hover:scale-105 transition-transform shadow-md hover:shadow-white"
              >
                Sign In
              </button>
            </div>
          </motion.div>
        )}



        <div className=' pt-2 pl-4 fixed top-0 left-0 z-50'><img src={assets.arrow} onClick={() => { navigate(`/`) }} className='w-8 invert cursor-pointer' /></div>

        <div onClick={() => { navigate('/upgrade') }} className='w-fit h-fit px-4 py-1 rounded-full 
        bg-gradient-to-r from-blue-500 via-pink-500 to-red-500 
        text-white text-xl font-semibold shadow-lg hover:scale-105 
        transition-transform duration-300 cursor-pointer absolute right-5 lg:right-10 xl:right-20 top-2 flex gap-4 items-center z-50'>{isPro ? 'PRO' : 'Upgrade To Pro'}<img src={assets.feather} className='w-8' alt="magic" /></div>

      </div>

      <div className="w-full min-h-[100vh] bg- relative flex flex-col items-center py-8" >
        <h1 className="font-bold text-white text-8xl mb-14">{headingText}</h1>

        <div className="w-[60%] mx-auto bg-none flex flex-col gap-16" >
          {Array.from({ length: Math.ceil(levels.length / 10) }, (_, groupIndex) => {
            const groupLevels = levels.slice(groupIndex * 10, groupIndex * 10 + 10);
            return (
              <div key={groupIndex}>
                <h2 className="text-4xl text-gray-900 pb-4 font-semibold mb-6 text-center">
                  {levelHeadings[groupIndex]}
                </h2>
                <div className="flex flex-wrap gap-10 justify-center">
                  {groupLevels.map((level) => {
                    const isLocked = !isPro && parseInt(level.id) >= 31;
                    const isLoggedIn = !!User;

                    return (
                      <div key={level.id}>
                        {isLocked ? (
                          <div className="w-[160px] h-[110px] rounded-2xl bg-gradient-to-br from-sky-500 to-blue-800 cursor-not-allowed relative flex items-center justify-center border border-white shadow-md">
                            <img
                              src={assets.lock}
                              alt="Locked"
                              className="w-8 h-8 absolute top-2 right-2 opacity-80"
                            />
                            <span className="text-white text-2xl font-semibold">Locked</span>
                          </div>
                        ) : isLoggedIn ? (
                          <Link to={`/levelspage/${section}/${level.id}`}>
                            <button className="cursor-pointer w-[160px] h-[110px] rounded-2xl text-3xl font-semibold text-white bg-gradient-to-br from-sky-500 to-blue-800 border border-white shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-200 ease-in-out flex items-center justify-center relative overflow-hidden">
                              <span className="z-10">Level {level.id}</span>
                            </button>
                          </Link>
                        ) : (
                          <div onClick={() => setLogDiv(true)}>
                            <button className="cursor-pointer w-[160px] h-[110px] rounded-2xl text-3xl font-semibold text-white bg-gradient-to-br from-sky-500 to-blue-800 border border-white shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-200 ease-in-out flex items-center justify-center relative overflow-hidden">
                              <span className="z-10">Level {level.id}</span>
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

        </div>

        {/* Footer */}
        <h1 className='text-3xl text-white font-semibold mt-10 flex items-center gap-4'>
          <span><img src={assets.batch} className='w-14 invert' /></span><span className="bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-800 text-transparent bg-clip-text">
            Congratulation, You Complete All Levels!
          </span>
        </h1>
        <div className="relative w-60 h-60 mt-4 rounded-full overflow-hidden shadow-[0_0_30px_rgba(0,5,0,1)]">
          <img
            src={assets.ninja2}
            alt="Ninja"
            className="relative z-10 w-full h-full object-cover rounded-full transition-transform duration-500 ease-in-out scale-140 hover:scale-150"
          />
        </div>

      </div>
    </>
  );

};

export default LevelsPage;


