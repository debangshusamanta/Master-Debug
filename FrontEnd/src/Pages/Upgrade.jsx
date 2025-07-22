import React, { useState, useEffect } from 'react';
import { FaCheckCircle } from "react-icons/fa";
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase.js';
import { motion } from 'framer-motion';

const Upgrade = () => {

    const navigate = useNavigate()
    const [isPro, setisPro] = useState(false)
    const [ProGem, setProGem] = useState(0)
    const [Upgradediv, setUpgradediv] = useState(false)



    // Check the user is In Upgrade version or not
    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(userRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setisPro(data.isPro);

                    // Add gems if payment was just completed
                    if (ProGem > 0) {
                        const updatedGem = (data.gem || 0) + ProGem;

                        await setDoc(userRef, {
                            ...data,
                            gem: updatedGem,
                        });

                        setProGem(0);
                    }
                } else {
                    setisPro(false);
                }
            }
        });

        return () => unsubscribe();
    }, [ProGem]);



      useEffect(() => {
        if (Upgradediv) {
          const timer = setTimeout(() => {
            setUpgradediv(false); 
          }, 3000);
          return () => clearTimeout(timer); 
        }
      }, [Upgradediv]);



    return (
        <>
            {Upgradediv && <motion.div
                initial={{ y: '-100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: '-100%', opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute top-5 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-[500px] h-auto px-4 py-2 flex items-center gap-3 rounded-md bg-yellow-100 border-l-4 border-yellow-500 shadow-md"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-yellow-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.054 0 1.62-1.14 1.05-2.06L13.05 4.94c-.525-.91-1.575-.91-2.1 0L3.032 16.94c-.57.92-.004 2.06 1.05 2.06z"
                    />
                </svg>
                <p className="text-yellow-800 font-medium text-sm flex gap-1 items-center">
                    You have to earn 400+ <img src={assets.ruby} className='w-5' alt="gem" /> in your Account.
                </p>
            </motion.div>
            }
            {isPro ? <div className="min-h-screen bg-gradient-to-br from-white via-sky-100 to-green-100 flex items-center justify-center px-4 py-10">
                <div className="bg-white relative rounded-3xl shadow-2xl max-w-3xl w-full p-10 text-gray-800">

                    {/* Arrow in top-left corner of the white card */}
                    <img
                        onClick={() => { navigate('/') }}
                        src={assets.arrow}
                        className="w-6 absolute top-6 left-6 cursor-pointer hover:scale-110 transition-transform duration-300"
                        alt="back arrow"
                    />

                    {/* Header */}
                    <h1 className="text-4xl font-bold text-center mb-4 text-green-700 flex items-center justify-center gap-3">
                        Welcome To, Master Debug!
                        <img src={assets.logo} alt="logo" className="w-14 h-14 object-contain" />
                    </h1>

                    <p className="text-center text-lg text-gray-600 mb-8">
                        You’ve unlocked the full potential of Master Debug. Enjoy your Pro privileges and keep crushing bugs and also write and practice coding in Master Code Studio!
                    </p>

                    {/* Pro Privilege Summary Card */}
                    <div className="bg-gradient-to-r from-green-600 via-green-500 to-green-400 text-white rounded-2xl p-6 shadow-lg mb-10">
                        <h2 className="text-2xl font-semibold mb-2">Your Pro Benefits</h2>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2">
                                <FaCheckCircle className="text-white" /> Full access to 50 levels in every language
                            </li>
                            <li className="flex items-center gap-2">
                                <FaCheckCircle className="text-white" /> All level hints unlocked
                            </li>
                            <li className="flex items-center gap-2">
                                <FaCheckCircle className="text-white" /> Bonus Gems, Exclusive Title, and Achievements
                            </li>
                            <li className="flex items-center gap-2">
                                <FaCheckCircle className="text-white" /> Premium Code Editor Themes
                            </li>
                        </ul>
                    </div>

                    {/* Additional CTA or Status */}
                    <div className="text-center">
                        <p className="text-lg font-medium text-green-700 mb-4">
                            You're already enjoying all Pro features. Keep coding and debugging like a master! ⚔️
                        </p>
                        <button
                            onClick={() => navigate('/codeeditor')}
                            className="cursor-pointer bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-md transition duration-300"
                        >
                            Go to Master Code Studio
                        </button>
                    </div>

                </div>
            </div>

                : <div className="min-h-screen bg-gradient-to-br from-white via-sky-100 to-green-100 flex items-center justify-center px-4 py-10">
                    <div className="bg-white relative rounded-3xl shadow-2xl max-w-3xl w-full p-10 text-gray-800">

                        {/* Arrow in top-left corner of the white card */}
                        <img
                            onClick={() => { navigate('/') }}
                            src={assets.arrow}
                            className="w-6 absolute top-6 left-6 cursor-pointer hover:scale-110 transition-transform duration-300"
                            alt="back arrow"
                        />

                        {/* Header */}
                        <h1 className="text-4xl font-bold text-center mb-4">Unlock Master Debug Pro</h1>
                        <p className="text-center text-lg text-gray-600 mb-8">
                            Gain full access to all advance levels and all hints to sharpen your debugging skills.
                        </p>

                        {/* Plan Card */}
                        <div className="bg-gradient-to-r from-green-600 via-green-500 to-green-400 text-white rounded-2xl p-6 shadow-lg mb-10">
                            <h2 className="text-3xl font-semibold mb-2 flex gap-3 w-full items-center">Pro Plan – Earn 400+ <img src={assets.ruby} className='w-10 h-10' alt="gem" /></h2>
                            <ul className="space-y-2">
                                <li className="flex items-center gap-2">
                                    <FaCheckCircle className="text-white" /> Access to all 50 levels of every language
                                </li>
                                <li className="flex items-center gap-2">
                                    <FaCheckCircle className="text-white" /> Unlock all level hints
                                </li>
                                <li className="flex items-center gap-2">
                                    <FaCheckCircle className="text-white" /> Bonus Gems + Title
                                </li>
                                <li className="flex items-center gap-2">
                                    <FaCheckCircle className="text-white" /> Unlock New Themes of Code Editor
                                </li>
                            </ul>
                        </div>

                        {/* CTA Button */}
                        <div className="flex justify-center">
                            <button
                                onClick={() => setUpgradediv(true)}
                                className="cursor-pointer bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-md transition duration-300"
                            >
                                Upgrade to Pro
                            </button>
                        </div>

                    </div>
                </div>

            }
        </>
    );
};

export default Upgrade;
