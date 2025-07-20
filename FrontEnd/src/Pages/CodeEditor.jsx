import React, { useEffect, useRef, useState } from 'react';
import { FaPlay, FaLightbulb, FaFolder, FaTerminal, FaBolt } from 'react-icons/fa';
import CodeMirror from '@uiw/react-codemirror';
import { closeBrackets } from "@codemirror/autocomplete";
import { indentOnInput } from '@codemirror/language';
import { highlightActiveLine, highlightActiveLineGutter } from '@codemirror/view';
import { cpp } from '@codemirror/lang-cpp';
import { java } from '@codemirror/lang-java';
import { python } from '@codemirror/lang-python';
import { javascript } from '@codemirror/lang-javascript';
import { assets } from '../assets/assets';
import { tokyoNightStorm } from '@uiw/codemirror-theme-tokyo-night-storm';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { monokai } from '@uiw/codemirror-theme-monokai';
import { githubDark } from '@uiw/codemirror-theme-github';
import { androidstudio } from '@uiw/codemirror-theme-androidstudio';
import { aura } from '@uiw/codemirror-theme-aura';
import { okaidia } from '@uiw/codemirror-theme-okaidia';
import { xcodeDark } from '@uiw/codemirror-theme-xcode';
import { motion } from 'framer-motion';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase.js';
import { useNavigate } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter';
import { EditorView } from '@codemirror/view';
import { toast } from 'react-toastify';


const customFontSize = EditorView.theme({
    '.cm-content': {
        fontSize: '20px',
        lineHeight: '1.5',
    },
});



const defaultCode = {
    cpp: `#include <iostream>  // Default Code
using namespace std;

int main() {
  int n;
  cin >> n;
  cout << "Square is: " << n * n << endl;
  return 0;
}`,
    java: `import java.util.Scanner;  // Default Code
public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    int n = sc.nextInt();
    System.out.println("Square is: " + (n * n));
  }
}`,
    python: `n = int(input())  # Default Code
print("Square is:", n * n)`,

};

const EnergeticVSCodeClone = () => {

    const navigate = useNavigate()

    const [code, setCode] = useState(defaultCode['cpp']);
    const [language, setLanguage] = useState('cpp');
    const [output, setOutput] = useState('');
    const [userInput, setUserInput] = useState('');
    const [ThemeDiv, setThemeDiv] = useState(false)
    const [Theme, setTheme] = useState(tokyoNightStorm)
    const [isPro, setisPro] = useState(false)
    const [ProDiv, setProDiv] = useState(false)
    const [saveDiv, setsaveDiv] = useState(false)
    const [PreviousCode, setPreviousCode] = useState("")


    //Showing the Upgrade div
    useEffect(() => {
        if (ProDiv) {
            const timer = setTimeout(() => {
                setProDiv(false);
            }, 3000);

            return () => clearTimeout(timer); // Cleanup
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


    const languageExtensions = {
        cpp: cpp(),
        java: java(),
        python: python(),
    };


    const handleRun = async () => {
        setOutput('⏳ Running your code...');
        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/studio-run`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    code,
                    input: userInput + '\n',
                    language
                }),
            });

            const data = await res.json();
            setOutput(data.output || data.error || 'No output');
        } catch (err) {
            setOutput('❌ Failed to run code.');
        }
    };


    const handleLanguageChange = (e) => {
        const newLang = e.target.value;
        setLanguage(newLang);
        setCode(defaultCode[newLang]);
        setOutput('');
        setUserInput('');
    };

    return (
        <div className="flex h-screen w-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white relative">

            {/* Main Editor */}
            <div className="flex flex-col flex-grow">

                {/* Header */}
                <div className="flex justify-between items-center px-6 py-3 bg-black bg-opacity-50 backdrop-blur-md shadow-lg">

                    <div className='flex flex-col '>
                        <img onClick={() => { navigate('/') }} src={assets.arrow} className='w-5 invert pb-2 cursor-pointer' alt="Arrow" />
                        <h1 className="flex gap-3 items-center text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-400 to-pink-500 drop-shadow-md animate-fadeIn">
                            Master Code Studio ⚡
                        </h1>
                    </div>

                    <div className="flex gap-6 relative">
                        <select
                            value={language}
                            onChange={handleLanguageChange}
                            className="bg-black border text-white border-gray-600 rounded px-2 py-1 cursor-pointer"
                        >
                            <option value="cpp">C++</option>
                            <option value="python">Python</option>
                        </select>

                        <button
                            onClick={handleRun}
                            className="cursor-pointer text-xl px-4 py-0 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg text-white font-semibold hover:scale-105 transition-transform flex items-center gap-2"
                        >
                            <FaPlay /> Run
                        </button>
                        <button onClick={() => { setThemeDiv(!ThemeDiv) }} className='border-none cursor-pointer bg-gradient-to-br from-red-600 to-pink-500 hover:scale-105 text-xl font-semibold px-4 py-2 rounded-lg'>Theme</button>



                    </div>

                </div>

                {/* Editor + Terminal */}
                <div className="flex flex-grow">
                    <div className="w-5/7 px-5 py-0 overflow-auto bg-black bg-opacity-30 backdrop-blur-xl border-r border-gray-600">

                        <div className='flex justify-between items-center pb-2'>
                            <div className='flex items-center gap-5 '>
                                <h2 className="text-2xl font-bold mb-2 text-blue-300">{language === 'cpp' ? 'C++' : language} Code</h2>
                                <h3 className="text-md pl-5 hidden xl:block">
                                    <Typewriter
                                        words={['Write and Edit Your Code here and Become a Master Coder !']}
                                        loop={1} // 0 = infinite loop i use 1 because i want to show the effect for 1 time.
                                        cursor
                                        cursorStyle="|"
                                        typeSpeed={70}
                                        deleteSpeed={50}
                                        delaySpeed={2000}
                                    />
                                </h3>
                            </div>

                            <div className='flex gap-3 pt-1'>

                                <div className='p-1 hover:bg-gray-900 rounded-full flex justify-center items-center'><img onClick={() => { console.log("working"), setCode(PreviousCode) }} src={assets.leftArrow} className='invert w-10 cursor-pointer' alt="Arrow" /></div>

                                <button onClick={() => { setsaveDiv(true) }} className='cursor-pointer  px-3 text-lg bg-gradient-to-r from-blue-900 to-pink-600 rounded-full text-white hover:scale-105'>New Page</button>

                            </div>
                        </div>

                        <div className="rounded-lg overflow-hidden border border-gray-800 shadow-lg overflow-y-scroll">

                            {saveDiv && (
                                <motion.div
                                    initial={{ y: '-100%', opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: '-100%', opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className='absolute top-0 right-60 z-50 w-[300px] h-[120px] flex gap-5 flex-col justify-center items-center rounded-xl bg-gray-800 border border-gray-300'
                                >
                                    <h1 className='text-lg text-white font-semibold'>Do you Want to Save this Code ?</h1>

                                    <div className='flex gap-6'>
                                        <button
                                            onClick={() => {
                                                setPreviousCode(code);
                                                toast.success("Your Code Saved (One-Time)");
                                                setCode("");
                                                setOutput('⚙️ Run code to see output...')
                                                setUserInput("")
                                                setsaveDiv(false);
                                            }}
                                            className='cursor-pointer w-fit px-3 rounded-lg border-none outline-none text-lg text-white bg-gradient-to-r from-blue-800 to-sky-600'
                                        >
                                            Save
                                        </button>

                                        <button
                                            onClick={() => {
                                                setCode("");
                                                setOutput('⚙️ Run code to see output...')
                                                setUserInput("")
                                                setsaveDiv(false);
                                            }}
                                            className='cursor-pointer w-fit px-3 rounded-lg border-none outline-none text-lg text-black bg-white hover:scale-105'
                                        >
                                            Don't Save
                                        </button>
                                    </div>
                                </motion.div>
                            )}



                            <div className="h-[800px] overflow-y-auto">
                                <CodeMirror
                                    value={code}
                                    height="100%"
                                    theme={Theme}
                                    extensions={[
                                        cpp(),
                                        java(),
                                        python(),
                                        closeBrackets(),
                                        indentOnInput(),
                                        highlightActiveLine(),
                                        highlightActiveLineGutter(),
                                        customFontSize,
                                    ]}
                                    basicSetup={{
                                        lineNumbers: true,
                                        highlightActiveLine: true,
                                        highlightSelectionMatches: true,
                                    }}
                                    onChange={(value) => {
                                        setCode(value);
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {ProDiv && (
                        <motion.div
                            initial={{ x: '-100%', opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: '-100%', opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className='absolute bottom-0 z-50 border border-black rounded-2xl w-fit px-10 py-4 mb-8 ml-6 bg-gray-800 flex gap-5 items-center'>
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

                    <div className="w-2/7 bg-black bg-opacity-40 backdrop-blur-lg p-4 text-green-400 font-mono overflow-auto animate-fadeIn ">
                        <p className="text-xl text-white pb-4">Terminal Output</p>
                        <hr className='border-gray-800 w-full mx-auto h-0 pt-1' />

                        {ThemeDiv && <div className='z-50 w-[180px] h-fit text-lg  text-white  bg-gray-800 rounded-md absolute top-0 right-5'>
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


                        <div className='flex justify-between flex-col h-[800px]'>
                            <div className="bg-black bg-opacity-60 p-2 mt-2 text-lg rounded-md shadow-inner  whitespace-pre-wrap ">
                                {output || '⚙️ Run code to see output...'}
                            </div>
                            <div className="">
                                <label className="block text-md mb-1 text-white">Enter Input Here</label>
                                <textarea
                                    rows={3}
                                    value={userInput}
                                    onChange={(e) => setUserInput(e.target.value)}
                                    placeholder="Enter your input here"
                                    className="w-full p-2 rounded bg-black text-white border border-gray-800"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EnergeticVSCodeClone;
