import React from 'react';
import { motion } from 'framer-motion';
import {
  RiCheckDoubleLine,
  RiCloseCircleFill,
  RiCheckboxCircleFill,
  RiArrowLeftLine,
  RiExternalLinkLine,
  RiThumbUpLine,
  RiFlagLine,
  RiLightbulbLine,
  RiPencilLine
} from 'react-icons/ri';
import CircularProgress from '../components/CircularProgress';
import ProgressBar from '../components/ProgressBar';
import GlassCard from '../components/GlassCard';

const Dashboard = ({ result, setCurrentPage }) => {
  if (!result) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <h2 className="text-2xl font-bold text-white">No Analysis Data Found</h2>
        <p className="text-glassTextMuted">Please upload a resume first to view the dashboard.</p>
        <button
          onClick={() => setCurrentPage('upload')}
          className="px-6 py-3 bg-neonCyan text-darkBg font-bold text-sm rounded-xl"
        >
          Go to Upload
        </button>
      </div>
    );
  }

  const {
    overallScore = 0,
    atsScore = 0,
    skillsScore = 0,
    experienceScore = 0,
    projectsScore = 0,
    educationScore = 0,
    communicationScore = 0,
    checks = {},
    strengths = [],
    weaknesses = [],
    suggestions = [],
    recommendedChanges = [],
    resumeUrl = ''
  } = result;

  // Checklist mapping for easy UI rendering
  const auditChecks = [
    { key: 'missingContactInfo', label: 'Contact Information Present', invert: true },
    { key: 'missingGithub', label: 'GitHub Link Present', invert: true },
    { key: 'missingLinkedin', label: 'LinkedIn Link Present', invert: true },
    { key: 'missingSkills', label: 'Skills Section Included', invert: true },
    { key: 'missingProjects', label: 'Projects Section Included', invert: true },
    { key: 'missingExperience', label: 'Work Experience Section', invert: true },
    { key: 'missingEducation', label: 'Education Details Included', invert: true },
    { key: 'weakProjectDescriptions', label: 'Strong Project Bulletpoints', invert: true },
    { key: 'repetitiveActionVerbs', label: 'Varied Action Verbs Used', invert: true },
    { key: 'poorFormatting', label: 'Standard Layout Structure', invert: true },
    { key: 'atsCompatibility', label: 'ATS Parsable Compatibility', invert: false }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 relative">
      <div className="glow-blur glow-cyan w-[300px] h-[300px] top-10 left-[5%]"></div>
      <div className="glow-blur glow-purple w-[400px] h-[400px] bottom-10 right-[5%]"></div>

      {/* Top Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 relative z-10">
        <div>
          <h2 className="text-3xl font-extrabold text-white">Evaluation Dashboard</h2>
          <p className="text-sm text-glassTextMuted mt-1">
            Overall resume performance rating and structural checklist analysis.
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setCurrentPage('upload')}
            className="flex items-center space-x-1 px-4 py-2.5 bg-white/5 border border-glassBorder rounded-xl hover:bg-white/10 text-white font-semibold text-sm transition-colors"
          >
            <RiArrowLeftLine className="w-4 h-4" />
            <span>Upload Another</span>
          </button>
          
          {resumeUrl && (
            <a
              href={resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-1 px-4 py-2.5 bg-neonCyan/10 border border-neonCyan/20 rounded-xl hover:bg-neonCyan/20 text-neonCyan font-semibold text-sm transition-colors"
            >
              <span>View Source File</span>
              <RiExternalLinkLine className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      {/* Scores Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
        {/* Overall Score Dial */}
        <GlassCard className="flex flex-col items-center justify-center py-8 text-center space-y-4">
          <h3 className="text-base font-bold text-glassTextMuted uppercase tracking-wider">Overall Assessment</h3>
          <CircularProgress score={overallScore} size={180} strokeWidth={14} colorClass="text-neonCyan" />
          <div className="pt-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-neonCyan/10 text-neonCyan border border-neonCyan/20">
              {overallScore >= 80 ? 'Excellent' : overallScore >= 60 ? 'Competitive' : 'Needs Optimization'}
            </span>
          </div>
        </GlassCard>

        {/* Detailed Category Scores */}
        <GlassCard className="lg:col-span-2 space-y-6">
          <h3 className="text-lg font-bold text-white border-b border-glassBorder pb-3">Sub-Category Performance</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
            <ProgressBar label="ATS Compatibility Score" score={atsScore} colorClass="bg-gradient-to-r from-cyan-400 to-blue-500" />
            <ProgressBar label="Skills Profile Strength" score={skillsScore} colorClass="bg-gradient-to-r from-purple-400 to-indigo-500" />
            <ProgressBar label="Professional Work History" score={experienceScore} colorClass="bg-gradient-to-r from-fuchsia-400 to-pink-500" />
            <ProgressBar label="Project Implementations" score={projectsScore} colorClass="bg-gradient-to-r from-amber-400 to-orange-500" />
            <ProgressBar label="Academic Profile Quality" score={educationScore} colorClass="bg-gradient-to-r from-emerald-400 to-teal-500" />
            <ProgressBar label="Communication & Writing" score={communicationScore} colorClass="bg-gradient-to-r from-sky-400 to-cyan-500" />
          </div>
        </GlassCard>
      </div>

      {/* Structural Checklist Grid */}
      <GlassCard className="space-y-6 relative z-10">
        <div className="flex items-center space-x-2 border-b border-glassBorder pb-3">
          <RiCheckDoubleLine className="w-5 h-5 text-neonPurple" />
          <h3 className="text-lg font-bold text-white">ATS Compliance Audit</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {auditChecks.map((item) => {
            // Evaluates pass status.
            // If invert is true, missingX = false is a PASS.
            // If invert is false, compatibility = true is a PASS.
            const isMissing = checks[item.key];
            const isPass = item.invert ? !isMissing : isMissing;

            return (
              <div
                key={item.key}
                className="flex items-center space-x-3 p-3 rounded-xl bg-slate-900/40 border border-glassBorder"
              >
                {isPass ? (
                  <RiCheckboxCircleFill className="w-5 h-5 text-neonGreen shrink-0" />
                ) : (
                  <RiCloseCircleFill className="w-5 h-5 text-red-400 shrink-0" />
                )}
                <span className="text-xs font-semibold text-glassText truncate" title={item.label}>
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </GlassCard>

      {/* Detailed Analysis Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        {/* Strengths */}
        <GlassCard className="space-y-4">
          <div className="flex items-center space-x-2 border-b border-glassBorder pb-3 text-neonGreen">
            <RiThumbUpLine className="w-5 h-5" />
            <h3 className="text-lg font-bold text-white">Key Strengths</h3>
          </div>
          <ul className="space-y-3">
            {strengths.length > 0 ? (
              strengths.map((str, idx) => (
                <li key={idx} className="flex items-start space-x-2.5 text-sm leading-relaxed text-glassText">
                  <span className="text-neonGreen mt-1">•</span>
                  <span>{str}</span>
                </li>
              ))
            ) : (
              <p className="text-sm text-glassTextMuted italic">No significant strengths highlighted.</p>
            )}
          </ul>
        </GlassCard>

        {/* Weaknesses */}
        <GlassCard className="space-y-4">
          <div className="flex items-center space-x-2 border-b border-glassBorder pb-3 text-red-400">
            <RiFlagLine className="w-5 h-5" />
            <h3 className="text-lg font-bold text-white">Critical Weaknesses</h3>
          </div>
          <ul className="space-y-3">
            {weaknesses.length > 0 ? (
              weaknesses.map((weak, idx) => (
                <li key={idx} className="flex items-start space-x-2.5 text-sm leading-relaxed text-glassText">
                  <span className="text-red-400 mt-1">•</span>
                  <span>{weak}</span>
                </li>
              ))
            ) : (
              <p className="text-sm text-glassTextMuted italic">No critical weaknesses detected.</p>
            )}
          </ul>
        </GlassCard>

        {/* Suggestions */}
        <GlassCard className="space-y-4">
          <div className="flex items-center space-x-2 border-b border-glassBorder pb-3 text-neonCyan">
            <RiLightbulbLine className="w-5 h-5" />
            <h3 className="text-lg font-bold text-white">Detailed Suggestions</h3>
          </div>
          <ul className="space-y-3">
            {suggestions.length > 0 ? (
              suggestions.map((sug, idx) => (
                <li key={idx} className="flex items-start space-x-2.5 text-sm leading-relaxed text-glassText">
                  <span className="text-neonCyan mt-1">•</span>
                  <span>{sug}</span>
                </li>
              ))
            ) : (
              <p className="text-sm text-glassTextMuted italic">No recommendations required.</p>
            )}
          </ul>
        </GlassCard>

        {/* Recommended Changes */}
        <GlassCard className="space-y-4">
          <div className="flex items-center space-x-2 border-b border-glassBorder pb-3 text-neonPurple">
            <RiPencilLine className="w-5 h-5" />
            <h3 className="text-lg font-bold text-white">Recommended Edits</h3>
          </div>
          <ul className="space-y-3">
            {recommendedChanges.length > 0 ? (
              recommendedChanges.map((change, idx) => (
                <li key={idx} className="flex items-start space-x-2.5 text-sm leading-relaxed text-glassText">
                  <span className="text-neonPurple mt-1">•</span>
                  <span>{change}</span>
                </li>
              ))
            ) : (
              <p className="text-sm text-glassTextMuted italic">No recommended copy edits specified.</p>
            )}
          </ul>
        </GlassCard>
      </div>
    </div>
  );
};

export default Dashboard;
