import React from 'react'
import { FaFacebookF, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Features = () => {

  const navigate = useNavigate()

  return (
    <>
      {/* Navbar */}
      <div className='flex justify-between px-[150px] xl:w-[80%] lg:w-[90%] h-[70px] border-b border-gray-500 m-auto items-center'>
        <div className=' pt-2 pl-4 fixed top-0 left-0 z-50'><img src={assets.arrow} onClick={() => { navigate(`/`) }} className='w-8 invert cursor-pointer' /></div>
        {/* Logo */}
        <img
          src={assets.logo}
          alt='Master Debug Logo'
          className='w-[47px] h-[47px] object-cover'
        />

        <div className='flex gap-10 items-center'>
          <a className='text-white text-2xl hover:font-bold' href='/'>Home</a>
          <button className='w-[110px] h-[40px] rounded-2xl  bg-gradient-to-br from-[#0a1128] to-sky-400 transition-all duration-50 hover:brightness-110 hover:scale-105 shadow-md cursor-pointer'><a className='text-white text-md' href="/loginpage">Sign Up</a></button>
        </div>
      </div>
      {/* Main Section */}
      <div className='min-h-full bg-none text-white xl:w-[80%]  lg:w-[90%] p-8 max-w-6xl mx-auto'>
        <ul className='pt-10'>
          <li className="pb-10">
            <h1 className="text-5xl text-gray-900 font-bold pb-10">Benefits of Using Master Debug</h1>

            <div className="flex items-start pl-14 ">

              <ul className="xl:text-2xl lg:text-xl flex flex-col gap-8 text-white list-disc">
                <li>🎯 <b>Level-Based Challenges</b> — Start from easy, move to expert bugs.</li>
                <li>🧩 <b>Language-Specific Practice</b> — Separate sections for C++, JS, Java and Python.</li>
                <li>🛠️ <b>Buggy Code with Actual Outputs</b> — See broken code with expected output.</li>
                <li>🎮 <b>Gamified Experience</b> — Feels like a game with progress.</li>
                <li>💡  <b>Learn by Fixing</b> — Focus on problem-solving and debugging skills.</li>
                <li>🚀 <b>Instant Feedback System</b> — Submit your fix and know right away if it's correct or not.</li>
                <li>🎓 <b>Concept Tags & Learning Goals</b> — Practice specific topics like loops, arrays, functions, etc.</li>
                {/* <li>🧠 <b>Mystery Bug Mode (Pro Version)</b> — No hints, no clues — just you and the bug. True debugger’s test!</li> */}
                <li>🏆 <b>Achievement Badges</b> — Earn fun titles like “Bug Hunter” or “Syntax Slayer” as you level up.</li>
                <li>⏱️ <b>Speed Run Levels</b> —  Debug against the clock in fast-paced challenges and test yourself.</li>
              </ul>

            </div>
          </li>

          <li className="pb-10">
            <h1 className="text-5xl text-gray-900 font-bold pb-10">Features of The Master Code Studio </h1>

            <div className="flex items-start pl-14 ">

              <ul className="xl:text-2xl lg:text-xl flex flex-col gap-8 text-white list-disc">
                <li>✅ Multi-language Support
                  Code in C++, Java, Python — with more coming soon!</li>
                <li>✅ Attractive VS Code-Like Editor "Master Code Studio".</li>
                <li>✅ Clear Terminal Output
                  Run your code and see live terminal output.( Input support included!)</li>
                <li>✅ Theme Customization
                  Switch between multiple themes to match your vibe: Drakula, Monokai, Aura, Vibe,  and more.</li>
                <li>✅No setup required. Simply write your code, run it, and view the output in the Terminal.</li>
                
              </ul>

            </div>
          </li>
        </ul>
      </div>
      {/* Footer */}
      <div className="border-t w-full h-[70px] border-gray-400 flex justify-between items-center px-10 md:px-20 lg:px-[150px] xl:px-[250px]">
        <p className="text-gray-200 text-md">
          © Master Debug - 2024–{new Date().getFullYear()}
        </p>
        <div className="flex gap-6 items-center">
          <p className="text-white text-lg">Follow Us</p>
          <div className="flex gap-6">
            <a href="https://twitter.com/DebangshuS1586" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 transition duration-300">
              <FaTwitter aria-hidden="true" focusable="false" size={24} />
            </a>
            <a href="https://linkedin.com/in/debangshu-samanta-3b20b5333" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-500 transition duration-300" aria-label="LinkedIn">
              <FaLinkedin aria-hidden="true" focusable="false" size={24} />
            </a>
            <a href="https://github.com/debangshusamanta" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition duration-300">
              <FaGithub aria-hidden="true" focusable="false" size={24} />
            </a>
          </div>
        </div>
      </div>


    </>
  )
}

export default Features
