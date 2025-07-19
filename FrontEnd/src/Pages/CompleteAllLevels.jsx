import { FaCheckCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const CompletionCard = () => {

    const navigate = useNavigate()

    return (

        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className=" w-full max-w-[700px] mx-auto my-10 p-8 bg-gradient-to-br from-green-700 via-emerald-500 to-teal-400 text-white rounded-3xl shadow-2xl border border-white/10 relative overflow-hidden"
        >
            {/* Glow Effect */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white opacity-10 rounded-full blur-3xl animate-pulse"></div>

            <div className="flex items-center gap-5 justify-center pb-5">
                <FaCheckCircle className="text-8xl text-white animate-bounce drop-shadow-md" />
                <div>
                    <h1 className="text-3xl font-bold uppercase tracking-wider bg-gradient-to-r from-red-700 via-yellow-300 to-pink-500 bg-clip-text text-transparent">
                        Congratulations!
                    </h1>
                    <p className="text-2xl text-white/90 font-medium mt-2">
                        You've completed <span className="font-bold underline">all levels</span> in this Language.
                    </p>
                </div>
            </div>

            <p className="mt-6 text-xl font-medium tracking-wide text-white/90 pb-6">
                Your dedication and debugging skills are impressive. 🎯 Now it’s time to challenge yourself with the next section or explore other languages. Keep going, Master Debugger!
            </p>

            <div className="mt-6 flex gap-4 justify-center">
                <button
                    onClick={() => navigate('/')}
                    className="hover:border-white hover:border hover:bg-transparent cursor-pointer px-6 py-2 rounded-full bg-white text-green-700 font-semibold text-lg hover:scale-105 transition-all shadow-xl"
                >
                    Go To Home
                </button>
                <button
                    onClick={() => navigate('/account')}
                    className="cursor-pointer px-6 py-2 rounded-full border border-white shadow-xl text-white font-semibold text-lg hover:bg-white hover:text-green-700 transition-all"
                >
                    View Achievements
                </button>
            </div>
        </motion.div>

    );
};

export default CompletionCard;
