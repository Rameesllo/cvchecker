import React from 'react';
import { motion } from 'framer-motion';

const CircularProgress = ({ score = 0, size = 160, strokeWidth = 12, colorClass = 'text-neonCyan' }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (Math.min(Math.max(score, 0), 100) / 100) * circumference;

  // Derive color class for SVG stroke
  const getStrokeColor = () => {
    if (colorClass.includes('Cyan')) return '#00f2fe';
    if (colorClass.includes('Purple')) return '#a78bfa';
    if (colorClass.includes('Fuchsia')) return '#f472b6';
    if (colorClass.includes('Green')) return '#34d399';
    return '#00f2fe'; // Default neonCyan
  };

  return (
    <div className="relative flex items-center justify-center select-none" style={{ width: size, height: size }}>
      <svg className="w-full h-full transform -rotate-90">
        {/* Background Circle */}
        <circle
          stroke="rgba(255, 255, 255, 0.05)"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Progress Circle */}
        <motion.circle
          stroke={getStrokeColor()}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          strokeLinecap="round"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      {/* Absolute text layer */}
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-4xl font-extrabold text-white leading-none tracking-tight">{score}</span>
        <span className="text-[10px] block text-glassTextMuted uppercase font-bold tracking-widest mt-1">
          Grade
        </span>
      </div>
    </div>
  );
};

export default CircularProgress;
