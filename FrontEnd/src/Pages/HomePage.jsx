import React, { useEffect } from 'react'
import { assets } from '../assets/assets.js'
import { useState } from 'react'
import { Typewriter } from 'react-simple-typewriter';
import { useNavigate } from 'react-router-dom'
import { logout } from '../firebase.js';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase.js';
import { motion } from 'framer-motion';
import { avatarOptions } from '../assets/avater.js';


const HomePage = () => {

  const [menuexpand, setmenuexpand] = useState(false)
  const [isPro, setisPro] = useState(false)
  const [ProDiv, setProDiv] = useState(false)
  const [logoutBox, setlogoutBox] = useState(false)
  const [User, setUser] = useState(false)
  const [avater, setavater] = useState("")


  const navigate = useNavigate()


  //Showing the Upgrade div
  useEffect(() => {
    if (ProDiv) {
      const timer = setTimeout(() => {
        setProDiv(false);
      }, 3000);

      return () => clearTimeout(timer); // Cleanup
    }
  }, [ProDiv]);


  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          setUser(true)
          setisPro(docSnap.data().isPro);
          setavater(docSnap.data().avatar)
        }
      } else {
        setisPro(false);
      }
    });

    return () => unsubscribe();
  }, []);




  return (
    <div className="w-full h-full relative backdrop-blur-xs ">

      {logoutBox && (
        <motion.div
          initial={{ y: '-100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute top-60 lg:left-[400px] xl:left-[600px] 2xl:left-[800px] z-50 w-[300px] h-[150px] flex flex-col justify-center items-center gap-5 rounded-xl bg-gray-900 border border-gray-300"
        >
          {User ? (
            <>
              <h1 className="text-lg text-white font-semibold w-[80%] text-center">
                Do you want to logout from Master Debug?
              </h1>
              <div className="flex gap-8">
                <button
                  onClick={() => {
                    logout();
                    setUser(false);
                    setlogoutBox(false);
                    navigate('/loginpage');
                  }}
                  className="cursor-pointer px-5 rounded-lg text-lg text-white border border-white hover:scale-110 transition-transform shadow-md hover:shadow-white"
                >
                  Yes
                </button>

                <button
                  onClick={() => {
                    setlogoutBox(false);
                    navigate('/');
                  }}
                  className="cursor-pointer px-5 rounded-lg text-lg text-black bg-white hover:scale-110 transition-transform shadow-md hover:shadow-black"
                >
                  No
                </button>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-lg text-white font-semibold w-[80%] text-center">
                You have no account !
              </h1>
              <button
                onClick={() => {
                  setlogoutBox(false);
                  navigate('/loginpage');
                }}
                className="cursor-pointer px-5 rounded-lg text-lg text-white border border-white hover:scale-110 transition-transform shadow-md hover:shadow-white"
              >
                Sign In
              </button>
            </>
          )}
        </motion.div>
      )}



      {/* Feather Image Centered in Background */}
      <img
        src={assets.feather}
        alt="feather"
        className="absolute top-3/7 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] opacity-20 animate-pulse z-10 pointer-events-none"
      />



      {/* Main Section */}
      <div className='flex w-full mx-auto  pb-24 relative'>

        {/* Navbar */}
        <div className='fixed right-5 top-2 flex lg:gap-8 md:gap-5 sm:gap-4 items-center'>

          <button onClick={() => { navigate('/codeeditor') }} className='shadow-lg hover:scale-105 bg-gradient-to-r from-violet-800 via-red-600 to-pink-600 px-6 py-1 rounded-full text-2xl text-white font-semibold flex gap-3 cursor-pointer'><img src={assets.feather} className='w-8' alt="Pro" /> Use Code Studio <img src={assets.rightArrow} className='w-7 invert' alt="Arrow" /></button>

          <div
            onClick={() => { navigate('/upgrade') }}
            className='hidden md:flex w-fit h-fit px-4 py-1 rounded-full bg-gradient-to-r from-blue-500 via-pink-500 to-red-500 text-white text-2xl font-semibold shadow-lg hover:scale-105 cursor-pointer gap-4 items-center'
          >
            {isPro ? 'PRO' : 'Upgrade To Pro'}
            <img src={assets.feather} className='w-8' alt="magic" />
          </div>


          <img
            onClick={() => navigate('/account')}
            src={avater ? avater : avatarOptions[0]}
            alt="User"
            className="mx-auto w-12 h-12 rounded-full cursor-pointer"
          />

          <div className='relative'>

            {/* Menu */}
            <img onClick={() => setmenuexpand(!menuexpand)} src={assets.menu_Icon} alt="Menu" className='w-12  cursor-pointer' />
            {menuexpand && (
              <div className='absolute top-16 right-2 z-20 w-36 p-5 rounded-md bg-gradient-to-br from-sky-400 via-sky-600 to-blue-900
                    border border-gray-600 text-black '>

                <p onClick={() => navigate('/about')} className='cursor-pointer text-lg pb-4 hover:text-xl transition-all duration-200'>About</p>
                <p onClick={() => navigate('/features')} className='cursor-pointer text-lg pb-3 hover:text-xl transition-all duration-200'>Features</p>
                <hr className='my-2 border-t border-gray-300' />
                <p onClick={() => { setlogoutBox(true) }} className='cursor-pointer text-lg pt-3 hover:text-xl transition-all duration-100'>Logout</p>
              </div>
            )}
          </div>

        </div>

        <div className='flex sm:flex-col md:flex-row md:gap-[80px] md:items-center md:ml-10 lg:gap-[120px]  xl:gap-[200px] 2xl:gap-[450px]'>

          {/* Left Section */}
          <div className='sm:ml-20 md:ml-0 sm:mt-20 md:mt-1 lg:ml-12 xl:ml-20 2xl:ml-32 lg:pt-10 md:pt-20'>

            <img src={assets.logo} alt="Master Debug Logo" className='w-20 h-20 mb-2' />
            <h4 className='text-white pb-2 text-3xl'>Welcome To </h4>
            {/* Website Name */}
            <h4 className="sm:text-8xl md:text-7xl lg:text-8xl xl:text-9xl pb-4 text-white"> MASTER</h4>
            <h1 className='sm:text-8xl md:text-7xl lg:text-8xl xl:text-9xl pb-8 bg-gradient-to-r from-[#3cc8ff] via-blue-500 to-[#dbf3fd] bg-clip-text text-transparent'>DEBUG</h1>
            {/* Some Description */}

            <h1 className="sm:text-xl md:text-md lg:text-xl xl:text-2xl text-gray-900 pb-4 font-bold">
              <Typewriter
                words={['Fix The Bugs And Level Up Your Skill...']}
                loop={1} // 0 = infinite loop i use 1 because i want to show the effect for 1 time.
                cursor
                cursorStyle="|"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={2000}
              />
            </h1>
            <p className='w-72 md:text-md lg:text-lg text-gray-300 leading-7 pb-6'>Select your preferred programming language and dive into a world of broken code! Challenge yourself, by fixing level-based buggy code problems to sharpen your coding and debugging skills.</p>
            <div className='flex gap-3'>
              {/* Button Contact */}
              <button className='w-[110px] h-[40px] rounded-2xl text-white text-md bg-gradient-to-br from-[#0a1128] to-sky-400 transition-all duration-50 hover:brightness-110 hover:scale-105 shadow-md cursor-pointer'>
                <a className='text-white text-md' href='/contactus'> Contact Me</a>
              </button>
              {/* Button Sign Up */}
              <button className='w-[120px] h-[40px] rounded-2xl text-white text-md bg-gradient-to-br from-[#0a1128] to-sky-400 transition-all duration-50 hover:brightness-110 hover:scale-105 shadow-md cursor-pointer'>
                <a className='text-white text-md' href='/loginpage'>Get Started</a>
              </button>
            </div>

          </div>

          {/* Right Section */}
          <div className='pt-40 sm:ml-40 md:ml-0'>
            <h1 className='text-sky-200 text-2xl pb-10 pl-14'>Choose Your Language</h1>
            <div className="flex flex-col gap-10">
              {/* C++ */}
              <button onClick={() => navigate('/levelspage/cpp')} className='text-7xl cursor-pointer
            hover:font-bold  bg-gradient-to-r from-[#0a1128] via-blue-900 to-[#074d69] bg-clip-text text-transparent'>C++</button>
              {/* Java */}
              {/* <button onClick={() => navigate('/levelspage/java')} className='text-7xl  cursor-pointer hover:font-bold  bg-gradient-to-r from-[#0a1128] via-blue-800 to-[#074d69] bg-clip-text text-transparent'>Java</button> */}
              {/* Python */}
              <button onClick={() => navigate('/levelspage/python')} className='pb-2 text-7xl cursor-pointer hover:font-bold  bg-gradient-to-r from-[#0a1128] via-blue-800 to-[#074d69] bg-clip-text text-transparent'>Python</button>
              {/* JavaScript */}
              <button onClick={() => navigate('/levelspage/javascript')} className='text-7xl cursor-pointer hover:font-bold  bg-gradient-to-r from-[#0a1128] via-blue-800 to-[#074d69] bg-clip-text text-transparent'>JavaScript</button>
            </div>
          </div>
        </div>


      </div>

      {/* Bottom */}
      <div className='w-[85%] border-t border-gray-400 m-auto flex'>
        {/* Bottom Left */}
        <div className='hidden md:block'>
          <p className=" text-gray-200 text-xs mt-4">
            <a href="/terms" className="underline hover:text-sky-300">Terms & Conditions</a>
          </p>
          <p className=" text-gray-200 text-xs mt-1">
            <a href="/terms" className="underline hover:text-sky-300">Privacy</a>
          </p>

        </div>
        {/* Bottom Middle */}
        <div className='w-[75%] h-20 px-5 m-auto  border-x border-gray-400 mt-2 pt-2'>
          <p className="text-gray-200 text-sm text-center pb-1.5">
            © Master Debug — 2025 - {new Date().getFullYear()}
          </p>
          <p className="text-sm text-gray-800 text-center">
            Designed and developed by Debangshu Samanta, India 🇮🇳
          </p>
          <hr className='w-[70%] mx-auto border-t border-gray-300 opacity-30' />
          <p className="text-sm text-gray-800 text-center">
            If you have any Question about this Website,
            You can Reach Us
            at: <a href="mailto:debangshu.dev001@gmail.com" className="underline hover:text-sky-300">debangshu.dev001@gmail.com</a>
          </p>
        </div>
        {/* Bottom Right */}
        <div className='flex-col justify-start w-[10%] mt-3 hidden md:flex '>
          <a className='text-white underline text-xs' href='/followus'>Follow Me</a>
          <a className='text-white underline text-xs' href='/contactus'> Contact Me</a>
        </div>

      </div>

    </div >
  )
}

export default HomePage
