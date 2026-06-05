import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Upload from './pages/Upload';
import Dashboard from './pages/Dashboard';
import PhotoAnalysis from './pages/PhotoAnalysis';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [resumeResult, setResumeResult] = useState(null);

  // Determine which page viewport to mount
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home setCurrentPage={setCurrentPage} />;
      case 'upload':
        return (
          <Upload
            setResumeResult={setResumeResult}
            setCurrentPage={setCurrentPage}
          />
        );
      case 'dashboard':
        return (
          <Dashboard
            result={resumeResult}
            setCurrentPage={setCurrentPage}
          />
        );
      case 'photo':
        return <PhotoAnalysis />;
      default:
        return <Home setCurrentPage={setCurrentPage} />;
    }
  };

  const pageTransition = {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <div 
      className="flex flex-col min-h-screen relative bg-[#060810]"
      style={{
        backgroundImage: 'linear-gradient(rgba(6, 8, 16, 0.78), rgba(6, 8, 16, 0.85)), url("/background.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Dynamic atmospheric light dots */}
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-neonCyan/5 blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-neonPurple/5 blur-[120px] pointer-events-none z-0"></div>

      {/* Navigation bar */}
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageTransition}
            className="w-full"
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer bar */}
      <Footer />
    </div>
  );
};

export default App;
