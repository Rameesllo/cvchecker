import React, { useState } from 'react';
import Home from './pages/Home';
import Upload from './pages/Upload';
import Dashboard from './pages/Dashboard';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [resumeResult, setResumeResult] = useState(null);

  const renderPage = () => {
    switch (currentPage) {
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
      case 'home':
      default:
        return <Home setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900">
      <header className="border-b border-slate-200">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <button
            type="button"
            onClick={() => setCurrentPage('home')}
            className="text-lg font-bold tracking-tight text-slate-900"
          >
            Resume Checker
          </button>
          <div className="flex items-center gap-2 sm:gap-5">
            <button
              type="button"
              onClick={() => setCurrentPage('home')}
              className="px-2 py-2 text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage('upload')}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Check resume
            </button>
          </div>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1">
        {renderPage()}
      </main>

      <footer className="border-t border-slate-200 px-6 py-4 text-center text-sm text-slate-500">
        Resume Checker
      </footer>
    </div>
  );
};

export default App;
