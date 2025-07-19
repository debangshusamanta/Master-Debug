import React, { useState } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const PaymentStatus = () => {

    const navigate = useNavigate()

    const [isSuccess, setIsSuccess] = useState(null); // null | true | false

    return (
        <>

            <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-green-100 flex items-center justify-center px-4 py-10">
                {isSuccess ? (
                    <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-md text-center animate-fade-in">
                        <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-green-700 mb-2">Payment Successful</h2>
                        <p className="text-gray-700 mb-6">Thank you for upgrading to Pro! 🎉</p>
                        <button
                            onClick={navigate('/')}
                            className="cursor-pointer bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-full font-semibold transition duration-300"
                        >
                            Go Back Home
                        </button>
                    </div>
                ) : (
                    <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-md text-center animate-fade-in">
                        <FaTimesCircle className="text-red-500 text-6xl mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-red-700 mb-2">Payment Failed</h2>
                        <p className="text-gray-700 mb-6">Oops! Something went wrong. Please try again.</p>
                        <button
                            onClick={()=>{navigate('/upgrade')}}
                            className="cursor-pointer bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-full font-semibold transition duration-300"
                        >
                            Try Again
                        </button>
                    </div>
                )}
            </div>

        </>
    );
};

export default PaymentStatus;
