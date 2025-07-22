import React from 'react'
import { FaFacebookF, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';
import { assets } from '../assets/assets.js';
import { useNavigate } from 'react-router-dom';

const About = () => {

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
      <div className='min-h-full bg-none text-white p-8 max-w-4xl mx-auto'>
        <h1 className="text-5xl font-bold mb-8  text-gray-900">About</h1>
        <p className='text-xl leading-10'>
          <h1 className='text-2xl pb-4'>Welcome to Master Debug! 🐞</h1>

          This platform helps you to improve your coding and debugging skills through real, buggy code examples and The 'Master Code Studio' (Code Editor) there you can write code and run that code and you will see the output of the code in the Terminal, There's need no setup just select your language and you can start coding.For practice Code Debugging Choose a language section, pick a level, and fix the broken code. Each level is designed to challenge your thinking.If the level is too hard for you then you can see the hint of the  code on the Screen ('Pro Version') — the higher you go, the trickier the bugs!

          You don't need to be an expert. Start at Level 1 and build your confidence step-by-step.
          <ul className='pt-5'>
            {/* Importance Of Debugging */}
            <li className='pb-10'>
              <h1 className='text-3xl text-gray-900 font-bold pb-5'>Importance Of Debugging</h1>

              <div className="flex items-start gap-8 pl-5">
                <span className="inline-block w-4 h-4 bg-white rounded-full mt-2 shrink-0"></span>
                <p className="text-md leading-9 text-white pl-4">
                  Debugging is a critical step in the software development process that ensures code runs as intended. It helps identify and fix errors, improve code quality, and maintain system reliability. Effective debugging not only resolves immediate issues but also deepens a developer’s understanding of how the code behaves. By systematically locating and correcting bugs, developers can enhance performance, prevent future problems, and deliver a smoother user experience.
                </p>
              </div>

            </li>
            {/* Using Benefits of The Master Debug */}
            <li className="pb-10">
              <h1 className="text-3xl text-gray-900 font-bold pb-5">Benefits of Using Master Debug</h1>

              <div className="flex items-start gap-8 pl-5">
                <span className="w-4 h-4 bg-white rounded-full mt-2"></span>
                <ul className="text-md leading-9 text-white list-disc pl-6">
                  <li>It's not boring to use — it feels like a game!</li>
                  <li>Your debugging skills will become razor-sharp.</li>
                  <li>You’ll spend more time reading and understanding code to find bugs.</li>
                  <li>You’ll develop strong coding habits.</li>
                  <li>You’ll learn new concepts in your programming language.</li>
                  <li>Your coding journey will become smoother and more enjoyable.</li>
                </ul>
              </div>
            </li>
            {/* About Master Code Studio */}
            <li className='pb-10'>
              <h1 className='text-3xl text-gray-900 font-bold pb-5'>About Master Code Studio</h1>

              <div className="flex items-start gap-8 pl-5">
                <span className="inline-block w-4 h-4 bg-white rounded-full mt-2 shrink-0"></span>
                <p className="text-md leading-9 text-white pl-4">
                  Welcome to Master Code Studio ⚡ — the ultimate destination for mastering programming through code creating, problem solving, code writing and Attractive UI with vibe of Game!

                  <ul>
                    <li>✅ Multi-language Support
                      Code in C++, Python — with more coming soon!</li>
                      <li>✅ Beautiful VS Code-Like Editor</li>
                      <li>✅ More In Features Section</li>
                  </ul>
                </p>
              </div>

            </li>

          </ul>
        </p>
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

export default About
