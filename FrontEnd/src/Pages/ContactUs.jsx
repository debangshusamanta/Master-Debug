import React from 'react';
import { FaEnvelope, FaTwitter, FaLinkedin, } from 'react-icons/fa';
import { assets } from '../assets/assets';

const ContactUs = () => {
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
            <div className="text-center text-white mt-10">
                <h2 className="text-3xl font-semibold mb-4">Contact Me</h2>

                <p className="mb-4 text-lg">Feel free to reach out via any platform below:</p>

                <div className="flex justify-center gap-6 text-2xl mb-6">
                    <a href="mailto:debangshu.dev001@gmail.com?subject=Inquiry%20from%20Master%20Debug&body=Hi%20Debangshu%2C%0AI%20have%20a%20question%20about..." className="hover:text-blue-400">
                        <FaEnvelope aria-hidden="true" focusable="false" />
                    </a>

                    <a href="https://linkedin.com/in/debangshu-samanta-3b20b5333" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
                        <FaLinkedin aria-hidden="true" focusable="false" />
                    </a>
                </div>

                <p className="text-sm text-gray-300">or email directly at- <span className="text-blue-300 cursor-pointer"><a href="mailto:debangshu.dev001@gmail.com" className="underline hover:text-sky-300">debangshu.dev001@gmail.com</a></span></p>
            </div>
        </>
    );
};

export default ContactUs;
