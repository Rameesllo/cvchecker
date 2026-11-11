import React from 'react';

const Home = ({ setCurrentPage }) => {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-6 py-20 text-center">
      <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-blue-600">
        Resume Checker
      </p>
      <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
        Make your next move
        <span className="block text-blue-600">with confidence.</span>
      </h1>
      <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
        Get clear, practical feedback on your resume in just a few steps.
      </p>
      <button
        type="button"
        onClick={() => setCurrentPage('upload')}
        className="mt-9 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Check my resume
      </button>
    </section>
  );
};

export default Home;
