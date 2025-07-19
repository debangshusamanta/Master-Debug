import { FaFacebookF, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import { assets } from '../assets/assets';

const FollowUs = () => {
  return (
    <>
      {/* Navbar */}
      <div className='flex justify-between px-[150px] w-[80%] h-[70px] border-b border-gray-500 m-auto items-center'>
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
      <div className="text-center text-white mt-10">
        <h2 className="text-2xl font-semibold mb-4">Follow Me</h2>
        <div className="flex justify-center gap-6">
          <a href="https://twitter.com/DebangshuS1586" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 transition duration-300">
            <FaTwitter aria-hidden="true"  focusable="false" size={24} />
          </a>
          <a href="https://linkedin.com/in/debangshu-samanta-3b20b5333" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-500 transition duration-300" aria-label="LinkedIn">
            <FaLinkedin aria-hidden="true"  focusable="false" size={24} />
          </a>
          <a href="https://github.com/debangshusamanta" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition duration-300">
            <FaGithub aria-hidden="true" focusable="false" size={24} />
          </a>
        </div>
      </div>
    </>
  );
};

export default FollowUs;