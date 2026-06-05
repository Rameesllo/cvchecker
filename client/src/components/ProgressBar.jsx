import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ label = '', score = 0, colorClass = 'bg-gradient-to-r from-neonCyan to-neonPurple' }) => {
  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between items-center text-sm">
        <span className="font-medium text-glassTextMuted">{label}</span>
        <span className="font-bold text-white">{score}%</span>
      </div>
      <div className="w-full h-2.5 bg-slate-900/60 rounded-full overflow-hidden p-[1px] border border-glassBorder">
        <motion.div
          className={`h-full rounded-full ${colorClass}`}
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(Math.max(score, 0), 100)}%` }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
