import React from 'react';
import { motion } from 'framer-motion';
import { RiFileList3Line, RiUserSearchLine, RiCompass3Line, RiShieldUserLine } from 'react-icons/ri';
import GlassCard from '../components/GlassCard';

const Home = ({ setCurrentPage }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <div className="relative overflow-hidden py-12 md:py-24">
      {/* Decorative blurred backdrops */}
      <div className="glow-blur glow-cyan w-[350px] h-[350px] top-10 left-[10%]"></div>
      <div className="glow-blur glow-purple w-[450px] h-[450px] bottom-10 right-[15%]"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center space-y-8"
        >
          {/* Header Badge */}
          <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-glassBorder backdrop-blur-md shadow-glass-glow">
            <span className="w-2 h-2 rounded-full bg-neonCyan animate-ping"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-neonCyan">Powered by GPT-4o AI</span>
          </motion.div>

          {/* Title */}
          <motion.h1 
            variants={itemVariants} 
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-tight"
          >
            Optimize Your Professional <br className="hidden sm:inline" />
            <span className="text-gradient-cyan-purple">Presence in Seconds</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            variants={itemVariants}
            className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-glassTextMuted leading-relaxed"
          >
            Upload your resume and professional portrait. Our advanced AI scans for ATS compatibility, evaluates skills alignment, checks professional formatting, and grades headshot photography suitability.
          </motion.p>

          {/* Action Button */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setCurrentPage('upload')}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-neonCyan to-neonPurple text-darkBg font-extrabold text-base rounded-xl transition-all duration-300 hover:opacity-95 shadow-glass-glow hover:shadow-neon-border hover:scale-105 active:scale-95"
            >
              Analyze Your Resume Now
            </button>
            <button
              onClick={() => setCurrentPage('photo')}
              className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-glassBorder hover:bg-white/10 text-white font-extrabold text-base rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center space-x-2"
            >
              <RiUserSearchLine className="w-5 h-5 text-neonPurple" />
              <span>Review Profile Photo</span>
            </button>
          </motion.div>

          {/* Cards Section */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16"
          >
            <GlassCard delay={0.1}>
              <div className="p-3 w-12 h-12 rounded-xl bg-neonCyan/10 border border-neonCyan/20 text-neonCyan flex items-center justify-center mb-4 mx-auto">
                <RiFileList3Line className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Deep ATS Audit</h3>
              <p className="text-sm text-glassTextMuted">
                Identifies critical keywords, missing contact points, formatting flags, and structural errors holding you back.
              </p>
            </GlassCard>

            <GlassCard delay={0.2}>
              <div className="p-3 w-12 h-12 rounded-xl bg-neonPurple/10 border border-neonPurple/20 text-neonPurple flex items-center justify-center mb-4 mx-auto">
                <RiCompass3Line className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Actionable Suggestions</h3>
              <p className="text-sm text-glassTextMuted">
                Get exact text rewrites, bullet optimization, missing skills recommendations, and structural formatting advice.
              </p>
            </GlassCard>

            <GlassCard delay={0.3}>
              <div className="p-3 w-12 h-12 rounded-xl bg-neonFuchsia/10 border border-neonFuchsia/20 text-neonFuchsia flex items-center justify-center mb-4 mx-auto">
                <RiShieldUserLine className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">AI Portrait Scoring</h3>
              <p className="text-sm text-glassTextMuted">
                Analyzes background distractions, lighting issues, portrait expressions, and LinkedIn suitability using computer vision.
              </p>
            </GlassCard>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
