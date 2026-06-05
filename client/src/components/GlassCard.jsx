import React from 'react';
import { motion } from 'framer-motion';

const GlassCard = ({ children, className = '', hover = true, delay = 0, ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`glass-panel p-6 rounded-2xl ${
        hover ? 'glass-panel-hover shadow-glass-glow' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
