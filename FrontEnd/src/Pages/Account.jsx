import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaCalendarAlt, FaCamera } from "react-icons/fa";
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { logout, db } from '../firebase.js';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { addGemsToUser } from '../firebase.js';
import { motion } from 'framer-motion';
import ProfileAvatarSelector from '../Component/AvaterSelect.jsx';
import { avatarOptions } from '../assets/avater.js';

const Account = () => {
  const navigate = useNavigate();

  const [Name, setName] = useState("");
  const [UserExist, setUserExist] = useState(false);
  const [CpplevelCount, setCpplevelCount] = useState(0);
  const [JavalevelCount, setJavalevelCount] = useState(0);
  const [PythonlevelCount, setPythonlevelCount] = useState(0);
  const [JSlevelCount, setJSlevelCount] = useState(0);
  const [Status, setStatus] = useState("");
  const [Claim, setClaim] = useState(false);
  const [joinDate, setJoinDate] = useState("");
  const [isdataLoaded, setisdataLoaded] = useState(false);
  const [Gemdiv, setGemdiv] = useState(false);
  const [Gem, setGem] = useState(0);
  const [ExtraGem, setExtraGem] = useState(25);
  const [MaxCount, setMaxCount] = useState(0);
  const [lastClaimedMilestone, setLastClaimedMilestone] = useState(0);
  const [isPro, setisPro] = useState(false);
  const [logoutBox, setlogoutBox] = useState(false);
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);

  const [avatar, setAvatar] = useState(localStorage.getItem('selectedAvatar') || 'https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/man-user-circle-icon.png');

  useEffect(() => {
    const completedLevels = JSON.parse(localStorage.getItem('completedLevels')) || {};
    let cpp = 0, java = 0, python = 0, js = 0;

    Object.keys(completedLevels).forEach((key) => {
      if (key.startsWith('cpp-')) cpp++;
      else if (key.startsWith('java-')) java++;
      else if (key.startsWith('python-')) python++;
      else if (key.startsWith('javascript-')) js++;
    });
    setCpplevelCount(cpp);
    setJavalevelCount(java);
    setPythonlevelCount(python);
    setJSlevelCount(js);
  }, []);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setisPro(data.isPro || false);
          if (data.avatar) {
            setAvatar(data.avatar);
            localStorage.setItem('selectedAvatar', data.avatar);
          }
        }
      } else {
        setisPro(false);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        const userRef = doc(db, "users", uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data();
          setisdataLoaded(true);
          setName(data.name || "No name");

          // Check and update isPro if needed
          if ((data.gem >= 400) && !data.isPro) {
            await updateDoc(userRef, {
              isPro: true,
              gem: data.gem + 100
            });
          }


          setJoinDate(
            data.signupDate?.toDate().toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            }) || ""
          );
          setCpplevelCount(data.cpplevelCount || 0);
          setJavalevelCount(data.javalevelCount || 0);
          setPythonlevelCount(data.pythonlevelCount || 0);
          setJSlevelCount(data.jslevelCount || 0);
          setGem(data.gem || 0);
          setLastClaimedMilestone(data.lastClaimedMilestone || 0);
          setUserExist(true);
        }
      } else {
        setisdataLoaded(false);
      }
    });

    return () => unsubscribe();
  }, []);


  useEffect(() => {
    const updateStatusAndGems = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      const userId = user?.uid;
      if (!userId || !isdataLoaded) return;
      const maxCount = Math.max(CpplevelCount, JavalevelCount, PythonlevelCount, JSlevelCount);
      setMaxCount(maxCount);

      if (maxCount >= 50) setStatus("⚔️ Master Debugger ");
      else if (maxCount >= 40) setStatus("🔧 Debug Specialist ");
      else if (maxCount >= 30) setStatus("🔍 Bug Hunter ");
      else if (maxCount >= 20) setStatus("💡 Problem Solver ");
      else if (maxCount >= 10) setStatus("⚙️ Beginner Warrior ");
      else setStatus("No Status !");

      const milestones = [10, 20, 30, 40, 50];
      const milestoneReached = milestones.find(m => m <= maxCount);
      if (milestoneReached && milestoneReached > lastClaimedMilestone) {
        setClaim(true);
        setExtraGem(25);
      }
    };
    updateStatusAndGems();
  }, [CpplevelCount, JavalevelCount, PythonlevelCount, JSlevelCount, isdataLoaded, lastClaimedMilestone]);

  const handleClaim = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const userId = user?.uid;
    if (!userId) return;
    const maxCount = Math.max(CpplevelCount, JavalevelCount, PythonlevelCount, JSlevelCount);
    const userRef = doc(db, 'users', userId);
    await addGemsToUser(userId, ExtraGem);
    await updateDoc(userRef, { lastClaimedMilestone: maxCount });
    setLastClaimedMilestone(maxCount);
    setClaim(false);
  };

  const handleAvatarChange = async (newAvatarUrl) => {
    setAvatar(newAvatarUrl);
    localStorage.setItem('selectedAvatar', newAvatarUrl);
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, { avatar: newAvatarUrl });
    }
    setShowAvatarSelector(false);
  };


  // Return your full JSX layout here
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 via-blue-800 to-green-500 p-6">

      {logoutBox && (
        <motion.div
          initial={{ y: '-100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.5 }}
          className='absolute top-0 lg:left-[400px] xl:left-[600px] 2xl:left-[800px] z-50 w-[300px] h-[150px] flex gap-5 flex-col justify-center items-center rounded-xl bg-gray-900 border border-gray-300' >

          <h1 className='text-lg text-white font-semibold w-[80%] align-middle'>Do you Want to Logout from Master Debug ?</h1>

          <div className="flex gap-8">
            <button
              onClick={() => { logout(), setlogoutBox(false) }}
              className="cursor-pointer w-fit px-5 rounded-lg text-lg text-white border border-white hover:scale-110 transition-transform  shadow-md hover:shadow-white"> Yes </button>

            <button
              onClick={() => { setlogoutBox(false) }}
              className="cursor-pointer w-fit px-5 rounded-lg text-lg text-black bg-white hover:scale-110 transition-transform  shadow-md hover:shadow-black">  No </button>
          </div>

        </motion.div>
      )
      }

      {Claim ? (
        <div className="relative w-[400px] h-[350px] bg-white text-black text-2xl rounded-3xl flex flex-col justify-center items-center shadow-[0_0_60px_15px_rgba(255,215,0,0.5)] before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-br before:from-yellow-400 before:to-yellow-100 before:blur-2xl before:opacity-30 before:-z-10">

          <div className="font-md text-gray-500">Recieve Your Status and Gems</div>

          <div className="text-4xl font-bold py-14 text-red-600 animate-pulse transition duration-1000 ease-in-out drop-shadow-[0_0_15px_rgba(255,215,0,0.8)]">
            {Status}
          </div>

          <div className="flex gap-2 pb-8">
            <img src={assets.ruby} alt="ruby" className="w-8" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-pink-500 to-pink-600 drop-shadow-[0_0_10px_rgba(255,255,255,0.4)] font-semibold">
              {ExtraGem} Gems
            </span>
          </div>
          <button
            className="cursor-pointer bg-gradient-to-br from-red-600 to-pink-500 hover:font-bold transition rounded-xl py-2 font-semibold px-8 hover:scale-105"
            onClick={async () => {
              const auth = getAuth();
              const user = auth.currentUser;
              const userId = user?.uid;
              if (!userId) return;

              const maxCount = Math.max(CpplevelCount, JavalevelCount, PythonlevelCount, JSlevelCount); // ✅ Recalculate here

              const userRef = doc(db, 'users', userId);
              await addGemsToUser(userId, ExtraGem);
              await updateDoc(userRef, { lastClaimedMilestone: maxCount }); // ✅ Use local maxCount
              setClaim(false); // ✅ Hide the popup
            }}

          >
            Claim
          </button>
        </div>
      ) : (
        <div className="bg-gradient-to-br from-blue-900 via-sky-600 to-green-500 bg-opacity-10 backdrop-blur-md rounded-3xl shadow-2xl text-white p-10 w-full max-w-[700px] mx-auto">
          <div className="flex justify-between items-center">
            <img
              src={assets.arrow}
              className="w-8 cursor-pointer invert"
              onClick={() => navigate('/')}
              alt="Back"
            />
            <div className="flex items-center gap-2 relative">
              {Gemdiv && (
                <div className="absolute top-[-25px] right-5 text-xl bg-gradient-to-r from-blue-900 via-purple-600 to-pink-500 text-transparent bg-clip-text">
                  Gem
                </div>
              )}
              <img
                src={assets.ruby}
                className="w-8 cursor-pointer"
                onMouseEnter={() => setGemdiv(true)}
                onMouseLeave={() => setGemdiv(false)}
                alt="Gem"
              />
              <span className="text-2xl">{UserExist ? Gem : 0}</span>
            </div>
          </div>

          {/* Profile Section */}
          <div className="text-center mb-20 flex justify-center items-center gap-4">
            <div className="relative inline-block">
              {/* Avatar Image */}
              <img
                src={avatar || avatarOptions[0]}
                alt="User"
                className="w-28 h-28 rounded-full border-4 border-white shadow-xl cursor-pointer"
                onClick={() => setShowAvatarSelector(true)}
              />

              {/* Edit Icon */}
              <div
                className="absolute bottom-1 right-1 bg-white p-1 rounded-full cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowAvatarSelector(true); // Only open
                }}
              >
                <img
                  src={assets.camera}
                  alt="Edit"
                  className="w-5 h-5"
                />
              </div>
            </div>

            {showAvatarSelector && (
              <div
                className="fixed  inset-0 bg-transparent bg-opacity-50 flex flex-wrap justify-center items-center z-50"
                onClick={() => setShowAvatarSelector(false)}
              >
                <div
                  className="bg-gray-500 p-4 rounded shadow-lg relative z-60"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ProfileAvatarSelector
                    avatarOptions={avatarOptions}
                    selectedAvatar={avatar}
                    onAvatarSelect={handleAvatarChange}
                  />
                </div>
              </div>
            )}


            <div className="flex flex-col items-start">
              <h2 className="text-2xl font-bold">{Name || 'User not logged in'}</h2>
              <p className="text-lg text-gray-200 pb-2">{Status}</p>

              {isPro && (
                <div onClick={() => { navigate('/upgrade') }} className='w-fit h-fit px-2 py-1 rounded-full bg-gradient-to-r from-blue-500 via-pink-500 to-red-500 text-white text-sm font-semibold shadow-lg hover:scale-105  cursor-pointer  flex gap-1 items-center'>PRO <img src={assets.feather} className='w-5' /></div>
              )}
            </div>
          </div>


          {UserExist ? (
            <div className="space-y-4 text-sm text-center">
              <h1 className="flex gap-1 items-center mb-6">
                <img src={assets.cup} className="w-10" alt="cup" />
                <span className="text-3xl font-semibold">Your Achievements</span>
              </h1>

              <div className="flex flex-col gap-6 items-center justify-center">
                <div className="flex flex-wrap gap-6 justify-center w-full">
                  {[
                    { name: "C++", count: CpplevelCount, colors: "from-purple-800 to-purple-500", bar: "bg-yellow-400" },
                    { name: "Java", count: JavalevelCount, colors: "from-red-600 to-pink-500", bar: "bg-green-300" },
                  ].map((lang, idx) => (
                    <div
                      onClick={() => {
                        if (lang.name === "C++") { navigate('/levelspage/cpp') }
                        else if (lang.name === "Java") { navigate('/levelspage/java') }
                      }}
                      key={idx}
                      className={`cursor-pointer bg-gradient-to-r ${lang.colors} p-5 rounded-2xl shadow-2xl w-72 transition-transform hover:scale-105`}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-bold">{lang.name}</h3>
                        <span className="text-sm font-semibold bg-black/20 px-3 py-1 rounded-full">
                          {lang.count} Levels
                        </span>
                      </div>
                      <div className="h-2 bg-white/20 rounded-full">
                        <div
                          className={`h-full ${lang.bar} rounded-full transition-all duration-300`}
                          style={{ width: `${(lang.count / 50) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-6 justify-center w-full">
                  {[
                    { name: "Python", count: PythonlevelCount, colors: "from-green-700 to-lime-500", bar: "bg-green-900" },
                    { name: "JavaScript", count: JSlevelCount, colors: "from-yellow-600 to-orange-400", bar: "bg-pink-800" },
                  ].map((lang, idx) => (
                    <div
                      onClick={() => {
                        if (lang.name === "Python") { navigate('/levelspage/python') }
                        else if (lang.name === "JavaScript") { navigate('/levelspage/javascript') }
                      }}
                      key={idx}
                      className={`cursor-pointer bg-gradient-to-r ${lang.colors} p-5 rounded-2xl shadow-2xl w-72 transition-transform hover:scale-105`}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-bold">{lang.name}</h3>
                        <span className="text-sm font-semibold bg-black/20 px-3 py-1 rounded-full">
                          {lang.count} Levels
                        </span>
                      </div>
                      <div className="h-2 bg-white/20 rounded-full">
                        <div
                          className={`h-full ${lang.bar} rounded-full transition-all duration-300`}
                          style={{ width: `${(lang.count / 50) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {joinDate && (
                <div className="flex w-[60%] mx-auto justify-between border-t border-gray-300 pt-5 mt-10">
                  <div className="flex gap-2 items-center justify-center">
                    <FaCalendarAlt className="text-white text-base" />
                    <span className="text-white text-sm">Member Since</span>
                  </div>
                  <span className="font-medium text-white">{joinDate}</span>
                </div>
              )}
            </div>
          ) : (
            'No Achievements !'
          )}

          <div className="mt-10 flex w-[70%] m-auto flex-col gap-6">
            {UserExist ? (
              <button
                onClick={() => setlogoutBox(true)}
                className="cursor-pointer bg-gradient-to-br from-red-600 to-pink-500 hover:font-bold transition rounded-xl py-2 font-semibold"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => navigate('/loginpage')}
                className="cursor-pointer bg-gradient-to-br from-red-600 to-pink-500 hover:font-bold transition rounded-xl py-2 font-semibold"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;