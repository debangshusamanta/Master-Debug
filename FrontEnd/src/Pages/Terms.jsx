import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Terms = () => {

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
            {/* Terms & Services */}
            <div className="min-h-full bg-none text-white p-8 max-w-4xl mx-auto pb-10">
                <h1 className="text-5xl font-bold mb-16  text-gray-900">Terms & Condition</h1>
                <p className="mb-8 text-2xl">
                    This website is built and maintained by Debangshu Samanta. By using this site, you agree to follow the rules below.
                </p>
                <ul className="list-disc list-inside mb-6 text-lg">
                    <li>Do not copy or redistribute content without permission.</li>
                    <li>Do not try to hack, cheat, or misuse any level or feature.</li>
                    <li>Respect the content and the effort behind this platform.</li>
                    <li>Your use of this site is at your own risk.</li>
                </ul>
                {/* Intellectual Property */}
                <h2 className="text-3xl font-bold mb-3  text-gray-900">Intellectual Property</h2>
                <p className='text-xl pb-3'>All content on MasterDebug — including logos, site design, level structure, code challenges, text, graphics, and any original logic — is the intellectual property of Debangshu Samanta unless otherwise stated.
                    You may not copy, distribute, reproduce, or republish any part of this content without written permission. Any unauthorized use may result in legal action.</p>
                <p>
                    {/* Use fo code challenges and content */}
                    <h2 className="text-3xl font-bold mb-3 text-gray-900">Use of Code Challenges and Content</h2>
                    {/* you may */}
                    <h3 className='text-2xl font-semibold mb-3 ml-8 text-gray-800'>You may:</h3>
                    <p className='text-xl ml-14'>Use them to practice, debug, and learn.</p>
                    {/* You may not */}
                    <h3 className='text-2xl font-semibold mb-3 ml-8 text-gray-800'>You may not:</h3>
                    <ul className="list-disc list-inside mb-6 ml-14">
                        <li>Download or redistribute challenge sets.</li>
                        <li>Re-host them on another platform.</li>
                        <li>Sell, clone, or copy the logic behind the challenges.</li>
                        <li>Attempt to unlock Pro-only content without a subscription.</li>
                    </ul>

                    <p className='text-lg'> If you have any questions, feel free to contact me at <a href="mailto:debangshu.dev001@gmail.com" className="underline hover:text-sky-300">debangshu.dev001@gmail.com</a>.</p>
                </p>
            </div>
            {/* Privacy */}
            <div className='min-h-full bg-none text-white  max-w-4xl mx-auto'>
                <h1 className="text-5xl font-bold mb-8  text-gray-900">🔒 Privacy & Data Policy</h1>
                <p className='text-xl'>
                    Any information that you provide to Master Debug is subject to our Privacy Policy, which governs our collection and use of your information.
                    <ul className="list-disc list-inside mb-6">
                        <li>No scraping or reverse engineering.</li>
                        <li>No uploading or running malicious code.</li>
                        <li>No harassment or abuse of other users.</li>

                    </ul>


                    {/* what we collect from user */}
                    <h2 className="text-3xl font-bold mb-3 ml-8  text-gray-800">What Data We Collect</h2>
                    <ul className="list-disc list-inside mb-6 ml-16">
                        <li>Email address (for authentication and communication)</li>
                        <li>Username (for display in your account section)</li>
                        <li>Level progress (to save your performance and stats)</li>
                        <li>Submitted code or challenge attempts.</li>
                        <li>Subscription/payment status (if you purchase Pro access)</li>
                    </ul>
                    {/* Why We Collect This Data */}
                    <h2 className="text-3xl font-bold mb-3 ml-8  text-gray-800">Why We Collect This Data</h2>
                    <ul className="list-disc list-inside mb-6 ml-16">
                        <li>Allow you to register, log in, and track your progress.</li>
                        <li>Enable personalized learning experience.</li>
                        <li>Send updates, support messages, and important notices.</li>
                        <li>Process payments securely via Stripe (for Pro users).</li>
                        <li>Maintain platform security and performance analytics.</li>
                    </ul>
                    {/* Who We Share It With */}
                    <h2 className="text-3xl font-bold mb-3 ml-8  text-gray-800">Who We Share It With</h2>
                    <ul className="list-disc list-inside mb-6 ml-16">
                        <li>Firebase (by Google) – for authentication, database, and storage.</li>
                        <li>Stripe – for secure payment processing.</li>
                    </ul>

                </p>
            </div>
            {/* Payments & Subscriptions */}
            <div className='min-h-full bg-none text-white p-8 max-w-4xl mx-auto pb-10'>
                <h1 className="text-5xl font-bold mb-8 text-gray-900">Payments & Subscriptions</h1>
                <p className='text-xl'>
                    Payments for the Pro version are securely processed via Stripe. By subscribing, you agree to the pricing, billing cycle, and cancellation terms displayed at checkout.
                </p>
            </div>

            {/* Registration */}
            <div className='min-h-full bg-none text-white p-8 max-w-4xl mx-auto pb-10'>
                <h1 className="text-5xl font-bold mb-8 text-gray-900">Registration</h1>
                <p className='text-xl'>
                    To the extent that we require you to register to access the Services, you agree to provide us with accurate and complete registration information and to register using your real name.You shall not permit any other person to use your registration to access the Services, and you are responsible for all use of the Services under your registration information.
                </p>
            </div>
            {/* Code Execution and User Submissions */}
            <div className='min-h-full bg-none text-white p-8 max-w-4xl mx-auto pb-10'>
                <h1 className="text-5xl font-bold mb-8 text-gray-900">Code Execution & User Submissions</h1>
                <p className='text-xl'>
                    Master Debug allows users to submit code for debugging and learning purposes. While we strive to maintain a secure environment, we do not guarantee the accuracy or safety of user-submitted code. You are solely responsible for the code you write, run, or share on the platform.
                </p>
            </div>

            {/* Account Termination Policy */}
            <div className='min-h-full bg-none text-white p-8 max-w-4xl mx-auto pb-10'>
                <h1 className="text-5xl font-bold mb-8 text-gray-900">Account Termination Policy</h1>
                <p className='text-xl'>
                    We reserve the right to suspend or delete accounts that violate our Terms, including but not limited to cheating, abuse, or illegal behavior.
                </p>
            </div>
            {/* Governing Law */}
            <div className='min-h-full bg-none text-white p-8 max-w-4xl mx-auto pb-10'>
                <h1 className="text-5xl font-bold mb-8 text-gray-900">Governing Law</h1>
                <p className='text-xl'>
                    These Terms shall be governed by and construed in accordance with the laws of India. Any legal disputes will be handled in accordance with Indian law.
                </p>
            </div>
            {/* Change to Terms */}
            <div className='min-h-full bg-none text-white p-8 max-w-4xl mx-auto pb-10'>
                <h1 className="text-5xl font-bold mb-8 text-gray-900">Change to Terms</h1>
                <p className='text-xl'>
                    We may update these Terms from time to time. Continued use of the site after changes constitutes acceptance.
                </p>
            </div>

            {/* Footer */}
            <div className='border-t w-[100%]  h-[70px] border-gray-400 flex justify-between items-center px-40'>
                <div>
                <p className="text-gray-200 text-center pb-1.5 text-md">
                    © Master Debug - 2024-{new Date().getFullYear()}
                </p>
                </div>

                <div className='flex gap-6 items-center'>
                    <p className='text-white text-lg'>Follow Us</p>

                    <div className="flex justify-center gap-6">
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
    );
};

export default Terms;
