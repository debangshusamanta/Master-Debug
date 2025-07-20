import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CodeMirror from '@uiw/react-codemirror';
import { closeBrackets } from "@codemirror/autocomplete";
import { indentOnInput } from '@codemirror/language';
import { highlightActiveLine, highlightActiveLineGutter } from '@codemirror/view';
import { Typewriter } from 'react-simple-typewriter';
import { FaRegLightbulb } from "react-icons/fa";
import { cpp } from '@codemirror/lang-cpp';
import { assets } from '../assets/assets';
import { updateLevelCount, addGemsToUser } from '../firebase.js';
import { tokyoNightStorm } from '@uiw/codemirror-theme-tokyo-night-storm';
import { monokai } from '@uiw/codemirror-theme-monokai';
import { githubDark } from '@uiw/codemirror-theme-github';
import { androidstudio } from '@uiw/codemirror-theme-androidstudio';
import { okaidia } from '@uiw/codemirror-theme-okaidia';
import { xcodeDark } from '@uiw/codemirror-theme-xcode';
import { aura } from '@uiw/codemirror-theme-aura';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase.js';
import { EditorView } from '@codemirror/view';
import { motion } from 'framer-motion';

const customFontSize = EditorView.theme({
  '.cm-content': {
    fontSize: '20px',
    lineHeight: '1.5',
  },
});



const Level_Data = () => {


  const navigate = useNavigate()

  //All usestates
  const { section, levelId } = useParams();
  const [level, setLevel] = useState(null);
  const [nextLevel, setNextLevel] = useState(null);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [hint, setHint] = useState('');
  const [error, setError] = useState(null);
  const [showHintDiv, setShowHintDiv] = useState(false);
  const [buggyCode, setbuggyCode] = useState('')
  const [isComplete, setisComplete] = useState(false)
  const [showCompleteUI, setShowCompleteUI] = useState(false);
  const [ThemeDiv, setThemeDiv] = useState(false)
  const [Theme, setTheme] = useState(tokyoNightStorm)
  const [UseHint, setUseHint] = useState(false)
  const [isPro, setisPro] = useState(false)
  const [ProDiv, setProDiv] = useState(false)
  const [isFirstTime, setIsFirstTime] = useState(false)



  const displaySection = section === 'cpp' ? 'C++' : section;

  //Showing the Upgrade div
  useEffect(() => {
    if (ProDiv) {
      const timer = setTimeout(() => {
        setProDiv(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [ProDiv]);


  // Check the user is In Upgrade version or not
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          setisPro(docSnap.data().isPro);
        }
      } else {
        setisPro(false);
      }
    });

    return () => unsubscribe();
  }, []);


  // Fecth the levels and the sections to play.
  useEffect(() => {
    const controller = new AbortController();
    const fetchLevelData = async () => {
      try {
        // Fetch current level
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/levels/${section}/${levelId}`, {
          signal: controller.signal,

        });
        if (!res.ok) throw new Error('Level not found');
        const data = await res.json();
        setLevel(data);
        setCode(data.code);
        setbuggyCode(data.code);
        setHint(data.hint || 'No hint available');

        // Pre-fetch next level
        const nextId = parseInt(levelId) + 1;
        const nextRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/levels/${section}/${nextId}`, {
          signal: controller.signal,

        });
        if (nextRes.ok) {
          const nextData = await nextRes.json();
          setNextLevel(nextData);
        } else {
          setNextLevel(null);
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      }
    };

    fetchLevelData();

    return () => controller.abort(); // Cleanup on unmount
  }, [section, levelId]);



  const handleRun = async () => {
    const auth = getAuth();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/run`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });

      const data = await res.json();
      setOutput('⏳ Code is Checking...')
      if (res.ok) {
        
        setOutput(data.output || '✅ No output from program');
        setisComplete(true);

        const user = auth.currentUser;
        const userId = user?.uid;
        if (!userId) return;

        const allCompletedLevels = JSON.parse(localStorage.getItem('completedLevels')) || {};
        const userCompletedLevels = allCompletedLevels[userId] || {};
        const levelKey = `${section}-${levelId}`;

        if (!userCompletedLevels[levelKey]) {
          // Mark level complete
          userCompletedLevels[levelKey] = true;
          allCompletedLevels[userId] = userCompletedLevels;
          localStorage.setItem('completedLevels', JSON.stringify(allCompletedLevels));

          setIsFirstTime(true);

          // Increase level count in frontend
          if (section === 'cpp') updateLevelCount('cpp');
          else if (section === 'java') updateLevelCount('java');
          else if (section === 'python') updateLevelCount('python');
          else if (section === 'javascript') updateLevelCount('javascript');

          await addGemsToUser(userId, (UseHint ? 3 : 5)); // Example: 5 gems per level if use hint then 3 gems
        }

      } else {
        setOutput(`❌ Error:\n${data.error || 'Unknown error'}`);
        setIsFirstTime(false);
      }
    } catch (err) {
      setOutput(`❌ Request failed:\n${err.message}`);
    }
  };



  const handleHint = () => {
    if (isPro) { setShowHintDiv(!showHintDiv) }
    else { setProDiv(true) }

  };

  const handleReverse = () => {
    setisComplete(false);
    setCode(buggyCode);
    setOutput()
    setShowHintDiv(false)
  }

  const handleNext = () => {
    const nextId = parseInt(levelId) + 1;
    if (nextLevel) {
      setisComplete(false)
      setOutput('Output will appear here after running the code...')
      setShowHintDiv(false)
      // Push to next URL or update state
      navigate(`/levelspage/${section}/${nextId}`);
    } else {
      navigate('/completealllevels')
    }
  };


  useEffect(() => {
    if (isComplete) {
      const timeout = setTimeout(() => {
        setShowCompleteUI(true);
      }, 3000);

      return () => clearTimeout(timeout);
    } else {
      setShowCompleteUI(false);
    }
  }, [isComplete]);


  if (error) return <p className="text-red-500">{error}</p>;
  if (!level) return <p className="text-gray-400">Loading...</p>;

  return (
    <>

      <div className={`${showCompleteUI ? 'flex-none' : 'flex'} h-screen bg-[#0d0d0d] text-white font-mono`}>

        {showCompleteUI && (
          <div className='h-screen w-full z-50 flex flex-col gap-10 justify-center items-center'>
            
            {isFirstTime && (
              <div className='text-6xl flex items-center gap-4'>
                <span className='font-bold text-transparent bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] animate-pulse'>
                  {isPro ? (UseHint ? 'You Earn +3' : 'You Earn +5') : "You Earn +5"}
                </span>
                <img src={assets.ruby} alt="Magic" className='w-14 drop-shadow-[0_0_6px_rgba(255,0,150,0.6)]' />
              </div>
            )}
            <h1
              className="text-5xl font-semibold text-transparent bg-gradient-to-r from-pink-700 via-green-500 to-blue-600 bg-clip-text drop-shadow-[0_0_10px_rgba(255,255,0,0.2)]"
            >
              {`You Successfully Complete Level ${levelId}`}
            </h1>


            <div className='flex gap-10'>
              <button onClick={handleReverse} className='border-none bg-gradient-to-br from-pink-700 to-blue-600 cursor-pointer px-5 py-2 rounded-full'>
                <img src={assets.playAgain} alt="" className='w-12 h-12 invert hover:rotate-90 transition duration-300' />
              </button>

              <button onClick={handleNext} className='border-none bg-gradient-to-br from-pink-700 to-blue-600 cursor-pointer px-5 py-2 rounded-full'>
                <img src={assets.rightArrow} alt="" className='w-12 h-12 invert hover:scale-105' />
              </button>
            </div>
          </div>
        )}


        {/* Left Section - Code Editor */}
        <div className="w-4/6 border-r border-gray-800 p-4 flex flex-col relative">
          <div className="flex justify-between mb-2">
            <div className='flex flex-col gap-1'>
              <img src={assets.arrow} onClick={() => { navigate(`/levelspage/${section}`) }} className='w-5 mt-[-8px] invert cursor-pointer' />
              <div className='flex gap-3 items-center'>
                <img src={assets.logo} alt="Master Debug Logo" className='w-10 h-10' />
                <h2 className="text-4xl font-semibold">{`Level ${levelId}   ( ${displaySection} )`}</h2>
                <h3 className="text-xl pl-5 hidden 2xl:block">
                  <Typewriter
                    words={['Read the code carefully to fix the bugs !']}
                    loop={1} // 0 = infinite loop i use 1 because i want to show the effect for 1 time.
                    cursor
                    cursorStyle="|"
                    typeSpeed={70}
                    deleteSpeed={50}
                    delaySpeed={2000}
                  />
                </h3>
              </div>

              {showHintDiv && (
                <div className="flex items-center gap-2 bg-yellow-100 text-black px-4 py-2 rounded-lg shadow-md max-w-[100%] text-sm">
                  <FaRegLightbulb className="text-yellow-700 w-5 h-5" />
                  <p>{hint}</p>
                </div>
              )}
            </div>

            <div className="xl:space-x-6 lg:space-x-4 flex items-center pb-2">
              <button onClick={handleReverse} className='border-none bg-gradient-to-br from-pink-700 to-blue-600 hover:scale-110 cursor-pointer xl:px-5 lg:px-3  xl:py-3 lg:py-3 rounded-full'>
                <img src={assets.playAgain} alt="" className='xl:w-6 lg:w-5 invert hover:rotate-90 transition duration-300' />

              </button>
              <button
                onClick={() => {
                  handleHint();
                  isPro && setUseHint(true)
                }}

                className="flex gap-3 border-none xl:text-2xl lg:text-xl bg-gradient-to-br from-violet-900 to-blue-700 hover:scale-110 cursor-pointer px-5 py-2 rounded-2xl lg:rounded-full"
              >
                {!showHintDiv ? 'Show Hint' : 'Hide Hint'}
                <img src={assets.feather} className='w-6' alt="Pro" />
              </button>

              <button
                onClick={handleRun}
                className="border-none xl:text-2xl lg:text-xl cursor-pointer bg-gradient-to-br from-red-600 to-pink-500 hover:scale-110 px-4 py-2 rounded-2xl lg:rounded-full"
              >
                Run
              </button>
            </div>

            {ProDiv && (
              <motion.div
                initial={{ x: '-100%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '-100%', opacity: 0 }}
                transition={{ duration: 0.5 }}
                className='absolute bottom-0 border border-black rounded-2xl w-fit px-10 py-4 mb-8 ml-6 bg-gray-800 flex gap-5 items-center'>
                <span className='text-xl text-white'>
                  Upgrade to Pro Version to access the Hints and extra Themes.
                </span>
                <button
                  onClick={() => {
                    navigate('/upgrade');
                  }}
                  className='px-4 py-2 rounded-2xl bg-white text-black text-lg cursor-pointer hover:scale-105' >
                  Upgrade to Pro
                </button>
              </motion.div>
            )}
          </div>

          {/* Code Editor */}
          <div className="flex-grow overflow-y-hidden border border-gray-700 rounded custom-scroll overflow-x-scroll ">
            
            <CodeMirror
              value={code}
              height="100%"
              theme={Theme}
              extensions={[cpp(), closeBrackets(), indentOnInput(), highlightActiveLine(), highlightActiveLineGutter(), customFontSize]}
              onChange={(val) => setCode(val)}
              basicSetup={{
                lineNumbers: true,
                highlightActiveLine: true,
                highlightSelectionMatches: true,
              }}
            />
          </div>
        </div>

        {/* Right Section - Terminal Output */}
        <div className="w-2/6 p-4">
          <div className='flex justify-between'>
            <h2 className="xl:text-2xl lg:text-xl  border-b border-gray-700 pb-2">Your Output Terminal</h2>
            <button onClick={() => { setThemeDiv(!ThemeDiv) }} className='border-none cursor-pointer bg-gradient-to-br from-red-600 to-pink-500 hover:scale-105 xl:text-2xl lg:text-xl px-4 py-2 lg:rounded-full xl:rounded-2xl'>Theme</button>
          </div>

          <div className="mt-4 bg-[#0b0b0b] text-green-400 p-4 rounded h-[90%] overflow-auto border border-gray-600 whitespace-pre-wrap text-[18px] leading-[1.8] flex justify-between relative">
            {output || <span className="text-gray-500 text-lg">Output will appear here after running the code...</span>}

            {ThemeDiv && <div className='w-[180px] h-fit text-lg  text-white  bg-gray-800 rounded-md absolute top-0 right-0'>
              <ul className='py-4'>
                <li onClick={() => { setTheme(tokyoNightStorm) }} className='px-5 hover:bg-gray-700 py-1 hover:text-lg cursor-pointer'>Default</li>
                <li onClick={() => { setTheme(monokai) }} className='px-5 hover:bg-gray-700 py-1 hover:text-lg cursor-pointer'>Monokai</li>
                <li onClick={() => { setTheme(okaidia) }} className='px-5 hover:bg-gray-700 py-1 hover:text-lg cursor-pointer'>Space</li>

                <div onClick={() => { isPro ? setTheme(githubDark) : setProDiv(true) }} className='cursor-pointer flex items-center justify-between hover:bg-gray-700'>
                  <li className='px-5  py-1 hover:text-lg '>Github Dark</li>
                  <div className='px-2 py-0'><img src={assets.feather} className='w-6 ' alt="Pro" /></div>
                </div>
                <div onClick={() => { isPro ? setTheme(aura) : setProDiv(true) }} className='cursor-pointer flex items-center justify-between hover:bg-gray-700'>
                  <li className='px-5  py-1 hover:text-lg '>Aura</li>
                  <div className='px-2 py-0'><img src={assets.feather} className='w-6 ' alt="Pro" /></div>
                </div>
                <div onClick={() => { isPro ? setTheme(androidstudio) : setProDiv(true) }} className='cursor-pointer flex items-center justify-between hover:bg-gray-700'>
                  <li className='px-5  py-1 hover:text-lg '>Vibe</li>
                  <div className='px-2 py-0'><img src={assets.feather} className='w-6 ' alt="Pro" /></div>
                </div>
                <div onClick={() => { isPro ? setTheme(xcodeDark) : setProDiv(true) }} className='cursor-pointer flex items-center justify-between hover:bg-gray-700'>
                  <li className='px-5  py-1 hover:text-lg '>X code</li>
                  <div className='px-2 py-0'><img src={assets.feather} className='w-6 ' alt="Pro" /></div>
                </div>
              </ul>
            </div>}

          </div>
        </div>
      </div>
    </>
  );
};

export default Level_Data;
