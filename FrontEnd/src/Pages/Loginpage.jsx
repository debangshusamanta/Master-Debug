import React, { useState , useEffect } from 'react';
import { FaEye, FaEyeSlash, FaEnvelope, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { login, signup } from '../firebase.js';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const Loginpage = () => {
  const [signState, setSignState] = useState("Sign In");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setloading] = useState(false);
  const [warningBox, setwarningBox] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (warningBox) {
      const timer = setTimeout(() => {
        setwarningBox(false); 
      }, 3000);
      return () => clearTimeout(timer); 
    }
  }, [warningBox]);

  const sendSignupEmail = async (name, email) => {
    const formData = new FormData();
    formData.append("access_key", "35d5364b-1955-4e03-880d-015f05da89fb");
    formData.append("subject", "🟢 New User Signed Up!");
    formData.append("name", name);
    formData.append("email", email);
    formData.append("message", `A new user signed up on your website.\n\nName: ${name}\nEmail: ${email}`);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();
      if (!data.success) {
        console.error("Web3Forms Error:", data.message);
      }
    } catch (error) {
      console.error("Failed to send email:", error);
    }
  };

  const handleAuth = async (event) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (signState === "Sign Up") {
      if (!name.trim()) {
        toast.error("Please enter your name.");
        return;
      }
      if (!agreed) {
        toast.error("Please agree to the Terms & Conditions.");
        setwarningBox(true);
        return;
      }
    }

    setloading(true);

    try {
      if (signState === "Sign In") {
        await login(email, password);
        toast.success("Login successful!");
        setTimeout(() => navigate('/'), 1500);
      }

      if (signState === "Sign Up") {
        await signup(name, email, password);
        await sendSignupEmail(name, email);
        toast.success("Account created!");
        setTimeout(() => navigate('/'), 2000);
      }
    } catch (error) {
      toast.error("Authentication failed. Please check your details.");
      console.error("Auth Error:", error);
    }

    setloading(false);
  };

  return (
    loading ? (
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
    ) : (
      <div className="min-h-screen flex items-center justify-center">
        {warningBox && <motion.div
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
          <p className="text-yellow-800 font-medium text-sm">
            You must agree to the Terms & Conditions before signing up.
          </p>
        </motion.div>
        }

        <div className="bg-gradient-to-br from-blue-900 via-sky-600 to-green-500 bg-opacity-10 backdrop-blur-md rounded-2xl shadow-lg p-8 w-[350px] text-white">

          <img
            src={assets.arrow}
            className="w-6 cursor-pointer invert"
            onClick={() => navigate('/')}
            alt="Back"
          />
          <h2 className="text-3xl font-bold mb-6 text-center">{signState}</h2>

          <form className="flex flex-col gap-6" onSubmit={handleAuth}>
            {signState === "Sign Up" && (
              <div className="relative">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Username"
                  spellCheck={false}
                  className="w-full p-3 pr-10 placeholder:text-sm rounded-lg bg-gradient-to-br from-blue-900 to-sky-400 bg-opacity-20 focus:outline-none placeholder-white"
                />
                <FaUser className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white" />
              </div>
            )}

            <div className="relative">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
                spellCheck={false}
                className="w-full p-3 pr-10 placeholder:text-sm rounded-lg bg-gradient-to-br from-blue-900 to-sky-400 bg-opacity-20 focus:outline-none placeholder-white"
              />
              <FaEnvelope className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white" />
            </div>

            <div className="relative">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                spellCheck={false}
                className="w-full p-3 pr-10 placeholder:text-sm rounded-lg bg-gradient-to-br from-violet-900 to-sky-400 bg-opacity-20 focus:outline-none placeholder-white text-white"
              />
              <div
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>

            {signState === "Sign Up" && (
              <div className="text-sm text-white flex items-center justify-center gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="w-4 h-4 accent-green-500 cursor-pointer"
                />
                <label htmlFor="terms">
                  I agree to the&nbsp;
                  <a
                    href="/terms"
                    target="_blank"
                    className="underline text-blue-200 hover:text-blue-400"
                  >
                    Terms & Conditions
                  </a>
                </label>
              </div>
            )}

            <button
              type="submit"
              className={`w-[60%] m-auto cursor-pointer ${signState === "Sign In"
                ? "bg-gradient-to-br from-pink-800 to-pink-300"
                : "bg-green-500"
                } hover:font-bold transition-colors text-white py-2 text-lg rounded-lg mt-4`}
            >
              {signState}
            </button>
          </form>

          {signState === "Sign In" ? (
            <div className="mt-6 text-center text-sm">
              Don't have an account?{" "}
              <p
                onClick={() => setSignState("Sign Up")}
                className="text-blue-900 cursor-pointer underline hover:font-semibold"
              >
                Sign Up
              </p>
            </div>
          ) : (
            <div className="mt-6 text-center text-sm">
              Already have an account?{" "}
              <p
                onClick={() => setSignState("Sign In")}
                className="text-blue-900 cursor-pointer underline hover:font-bold"
              >
                Login
              </p>
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default Loginpage;
