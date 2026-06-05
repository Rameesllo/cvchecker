import React from 'react';
import { RiCloudLine, RiCpuLine, RiShieldKeyholeLine } from 'react-icons/ri';

const Footer = () => {
  return (
    <footer className="w-full mt-auto border-t border-glassBorder bg-darkBg/80 backdrop-blur-sm py-8 text-glassTextMuted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div>
            <p className="text-sm">
              &copy; {new Date().getFullYear()} <span className="text-white font-medium">LLO ResumeIQ AI</span>. All rights reserved.
            </p>
            <p className="text-xs mt-1 text-slate-500">
              Evaluate, optimize, and score resumes and professional portraits with speed.
            </p>
          </div>
          
          <div className="flex items-center space-x-6 text-sm">
            <span className="flex items-center space-x-1 hover:text-neonCyan transition-colors">
              <RiCpuLine className="w-4 h-4 text-neonPurple" />
              <span>OpenAI API</span>
            </span>
            <span className="flex items-center space-x-1 hover:text-neonCyan transition-colors">
              <RiCloudLine className="w-4 h-4 text-neonCyan" />
              <span>Cloudinary</span>
            </span>
            <span className="flex items-center space-x-1 hover:text-neonCyan transition-colors">
              <RiShieldKeyholeLine className="w-4 h-4 text-neonFuchsia" />
              <span>Secure OCR</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
