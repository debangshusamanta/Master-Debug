import React, { useState, useEffect } from 'react';
import { FaCheckCircle } from "react-icons/fa";
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase.js';

const Upgrade = () => {

    const navigate = useNavigate()
    const [Payment, setPayment] = useState(false)
    const [isPro, setisPro] = useState(false)
    const [ProGem, setProGem] = useState(0)
    const [email, setemail] = useState("")



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
                    setemail(data.email)

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



    return (
        <>
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

                : <div>{
                    Payment
                        ? <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-green-100 flex items-center justify-center px-4 py-10">
                            <div className="bg-white shadow-2xl rounded-3xl w-full max-w-xl p-10 text-gray-800 relative">

                                {/* Back Arrow */}
                                <img
                                    onClick={() => { navigate('/') }}
                                    src={assets.arrow}
                                    className="w-6 absolute top-6 left-6 cursor-pointer hover:scale-110 transition-transform duration-300"
                                    alt="back arrow"
                                />

                                {/* Header */}
                                <h2 className="text-3xl font-bold text-center mb-6">Payment Details</h2>
                                <p className="text-center text-gray-600 mb-8">Enter your details to complete the purchase.</p>

                                <form className="space-y-6">

                                    {/* Email */}
                                    <div className='flex gap-6 text-md text-gray-500 border border-gray-300 rounded-lg px-4 py-2'>
                                        <span className='text-gray-700'>Email:</span>
                                        <span>{email}</span>
                                    </div>

                                    {/* Cardholder Name */}
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Cardholder Name</label>
                                        <input
                                            type="text"
                                            placeholder="John Doe"
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                                        />
                                    </div>

                                    {/* Country */}
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Select Country</label>
                                        <select className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none cursor-pointer focus:ring-2 focus:ring-green-400">
                                            <option>India</option>
                                            <option>United States</option>
                                            <option>United Kingdom</option>
                                            <option>Canada</option>
                                            <option>Germany</option>
                                            <option>Australia</option>
                                            <option>Other</option>
                                            <option>France</option>
                                            <option>Italy</option>
                                            <option>Spain</option>
                                            <option>Brazil</option>
                                            <option>Mexico</option>
                                            <option>China</option>
                                            <option>Japan</option>
                                            <option>South Korea</option>
                                            <option>Singapore</option>
                                            <option>Netherlands</option>
                                            <option>Switzerland</option>
                                            <option>Sweden</option>
                                            <option>Norway</option>
                                            <option>Denmark</option>
                                            <option>New Zealand</option>
                                            <option>South Africa</option>
                                            <option>Russia</option>
                                            <option>Argentina</option>
                                            <option>Chile</option>
                                            <option>Colombia</option>
                                            <option>Indonesia</option>
                                            <option>Malaysia</option>
                                            <option>Philippines</option>
                                            <option>Thailand</option>
                                            <option>Vietnam</option>
                                            <option>Pakistan</option>
                                            <option>Bangladesh</option>
                                            <option>Turkey</option>
                                            <option>Ukraine</option>
                                            <option>Poland</option>
                                            <option>Belgium</option>
                                            <option>Austria</option>
                                            <option>Portugal</option>
                                            <option>Ireland</option>
                                            <option>Israel</option>
                                            <option>Saudi Arabia</option>
                                            <option>UAE</option>
                                            <option>Qatar</option>
                                            <option>Egypt</option>
                                            <option>Nigeria</option>
                                            <option>Kenya</option>
                                        </select>
                                    </div>

                                    {/* Card Number with Logos */}
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Card Number</label>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="text"
                                                placeholder="1234 5678 9012 3456"
                                                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                                            />
                                            <div className="flex gap-1">
                                                <img src="https://js.stripe.com/v3/fingerprinted/img/visa-729c05c240c4bdb47b03ac81d9945bfe.svg" alt="Visa" className="w-8 h-5 object-contain" />
                                                <img src="https://js.stripe.com/v3/fingerprinted/img/mastercard-4d8844094130711885b5e41b28c9848f.svg" alt="MasterCard" className="w-8 h-5 object-contain" />
                                                <img src="https://js.stripe.com/v3/fingerprinted/img/amex-a49b82f46c5cd6a96a6e418a6ca1717c.svg" alt="Amex" className="w-8 h-5 object-contain" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Expiry & CVV */}
                                    <div className="flex gap-4">
                                        <div className="w-1/2">
                                            <label className="block text-sm font-medium mb-1">Expiry Date</label>
                                            <input
                                                type="text"
                                                placeholder="MM/YY"
                                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                                            />
                                        </div>
                                        <div className="w-1/2">
                                            <label className="block text-sm font-medium mb-1">CVV</label>
                                            <input
                                                type="password"
                                                placeholder="123"
                                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                                            />
                                        </div>
                                    </div>

                                    {/* Pay Button */}
                                    <div className="pt-4">
                                        <button
                                            onClick={() => { navigate('/upgrade/paymentstatus'), setProGem(100) }}
                                            type="submit"
                                            className="cursor-pointer w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-full font-semibold text-lg transition duration-300"
                                        >
                                            Pay ₹199 & Unlock Pro
                                        </button>
                                    </div>

                                </form>
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
                                    <h2 className="text-2xl font-semibold mb-2">Pro Plan – ₹199 (One-Time)</h2>
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
                                        onClick={() => setPayment(true)}
                                        className="cursor-pointer bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-md transition duration-300"
                                    >
                                        Upgrade to Pro
                                    </button>
                                </div>

                            </div>
                        </div>
                }</div>
            }
        </>
    );
};

export default Upgrade;
