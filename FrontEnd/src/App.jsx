import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import LevelsPage from './Pages/LevelsPage';
import LevelData from './Pages/LevelData';
import About from './Pages/About';
import Account from './Pages/Account';
import Terms from './Pages/Terms';
import FollowUs from './Pages/FollowUs';
import ContactUs from './Pages/ContactUs';
import Features from './Pages/Features';
import Loginpage from './Pages/Loginpage';
import CompleteAllLevels from './Pages/CompleteAllLevels.jsx';
import CodeEditor from './Pages/CodeEditor.jsx';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Upgrade from './Pages/Upgrade.jsx';
import PaymentStatus from './Pages/PaymentStatus.jsx';

const App = () => {
  const navigate = useNavigate();

useEffect(() => {
  const handleKeyDown = (e) => {
    const key = e.key.toLowerCase();
    if (
      (e.ctrlKey && ['c', 'v', 'u', 's'].includes(key)) || 
      (e.ctrlKey && e.shiftKey && key === 'i') ||          
      key === 'f12'                                        
    ) {
      e.preventDefault();
    }
  };

  const handleRightClick = (e) => {
    e.preventDefault();
  };

  document.addEventListener('keydown', handleKeyDown);
  document.addEventListener('contextmenu', handleRightClick);

  return () => {
    document.removeEventListener('keydown', handleKeyDown);
    document.removeEventListener('contextmenu', handleRightClick);
  };
}, []);



  //  Auth protection
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      const currentPath = window.location.pathname;

      if (user) {
        console.log('Logged In');
        if (currentPath === '/loginpage') {
          navigate('/');
        }
      } else {
        console.log('Logged Out');
        if (currentPath !== '/loginpage') {
          navigate('/loginpage');
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-700 via-blue-500 to-green-500 relative overflow-hidden">
      {/* Dark vignette edges for white text contrast */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0)_0%,_rgba(0,0,0,0.3)_100%)] pointer-events-none z-0"></div>

      {/* Central blurred glowing object */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-500 opacity-30 rounded-full blur-[120px] z-0"></div>

      {/* Other background blur blobs for depth */}
      <div className="absolute top-[-50px] left-[-50px] w-[300px] h-[300px] bg-violet-700 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-[-60px] right-[-60px] w-[400px] h-[400px] bg-green-700 rounded-full blur-2xl opacity-20 animate-pulse delay-200"></div>
      <div className="absolute top-1/3 left-1/2 w-[250px] h-[250px] bg-sky-500 rounded-full blur-2xl opacity-25 rotate-45"></div>

      {/* Content */}
      <div className="relative z-10">
        <ToastContainer theme='dark' />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/levelspage/:section' element={<LevelsPage />} />
          <Route path='/levelspage/:section/:levelId' element={<LevelData />} />
          <Route path='/account' element={<Account />} />
          <Route path='/about' element={<About />} />
          <Route path='/features' element={<Features />} />
          <Route path="/terms" element={<Terms />} />
          <Route path='/followus' element={<FollowUs />} />
          <Route path='/contactus' element={<ContactUs />} />
          <Route path='/loginpage' element={<Loginpage />} />
          <Route path='/upgrade' element={<Upgrade />} />
          <Route path='/codeeditor' element={<CodeEditor />} />
          <Route path='/upgrade/paymentstatus' element={<PaymentStatus />} />
          <Route path='/completealllevels' element={<CompleteAllLevels />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
