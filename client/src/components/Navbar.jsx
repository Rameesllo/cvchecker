import React from 'react';
import { RiScan2Line, RiUserSearchLine, RiDashboardLine, RiHome4Line } from 'react-icons/ri';

const Navbar = ({ currentPage, setCurrentPage }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: RiHome4Line },
    { id: 'upload', label: 'Upload & Process', icon: RiScan2Line },
    { id: 'dashboard', label: 'Resume Dashboard', icon: RiDashboardLine, disabled: false },
    { id: 'photo', label: 'Photo Audit', icon: RiUserSearchLine }
  ];

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-glassBorder backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            onClick={() => setCurrentPage('home')}
            className="flex items-center space-x-2 cursor-pointer group"
          >
            <div className="px-2 h-10 rounded-xl bg-gradient-to-tr from-neonCyan to-neonPurple flex items-center justify-center text-darkBg font-bold text-sm shadow-glass-glow transition-transform duration-300 group-hover:scale-105">
              LLO
            </div>
            <span className="font-extrabold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-neonCyan bg-clip-text text-transparent group-hover:opacity-95 transition-opacity">
              <span className="inline sm:hidden">LLO</span>
              <span className="hidden sm:inline">LLO ResumeIQ</span>
              <span className="text-neonPurple font-medium text-xs sm:text-sm ml-0.5">AI</span>
            </span>
          </div>

          {/* Navigation links */}
          <nav className="flex space-x-1 sm:space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`flex items-center space-x-1 sm:space-x-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-neonCyan/20 to-neonPurple/20 text-neonCyan border border-neonCyan/30 shadow-neon-border'
                      : 'text-glassTextMuted hover:text-glassText hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-neonCyan' : 'text-glassTextMuted'}`} />
                  <span className="hidden md:inline">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
