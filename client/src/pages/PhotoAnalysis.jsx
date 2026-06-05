import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  RiCameraSwitchLine,
  RiLoader4Line,
  RiScanLine,
  RiCheckDoubleLine,
  RiSparklingLine,
  RiUserStarLine
} from 'react-icons/ri';
import FileUpload from '../components/FileUpload';
import GlassCard from '../components/GlassCard';
import CircularProgress from '../components/CircularProgress';
import ProgressBar from '../components/ProgressBar';
import { uploadPhotoFile, analyzePhotoUrl } from '../services/api';

const PhotoAnalysis = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [photoUrl, setPhotoUrl] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const getErrorMessage = (err, defaultMsg) => {
    if (err.response?.status === 404) {
      return 'API server endpoint not found (404). Please make sure your Node.js backend server is started and running, and that VITE_API_URL is configured in your deployment settings.';
    }
    const errorData = err.response?.data?.error;
    if (!errorData) return err.message || defaultMsg;
    if (typeof errorData === 'object') {
      return errorData.message || JSON.stringify(errorData);
    }
    return errorData;
  };

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
    setPhotoUrl('');
    setResult(null);
    setError('');
  };

  const handleUploadAndAnalyze = async () => {
    if (!file) return;
    setUploading(true);
    setUploadProgress(0);
    setError('');

    try {
      // 1. Upload portrait to Cloudinary
      const uploadData = await uploadPhotoFile(file, (progress) => {
        setUploadProgress(progress);
      });
      setPhotoUrl(uploadData.url);

      // 2. Analyze URL using OpenAI Vision
      setAnalyzing(true);
      const analysisData = await analyzePhotoUrl(uploadData.url);
      setResult(analysisData);
    } catch (err) {
      console.error(err);
      setError(getErrorMessage(err, 'Error uploading or analyzing portrait image. Please make sure OpenAI API keys are valid.'));
      setFile(null);
    } finally {
      setUploading(false);
      setAnalyzing(false);
    }
  };

  const resetAnalysis = () => {
    setFile(null);
    setPhotoUrl('');
    setResult(null);
    setError('');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 relative">
      <div className="glow-blur glow-fuchsia w-[250px] h-[250px] top-10 right-[10%]"></div>
      <div className="glow-blur glow-purple w-[300px] h-[300px] bottom-10 left-[10%]"></div>

      <div className="space-y-8 relative z-10">
        <div className="text-center space-y-2">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Professional <span className="text-gradient-purple-fuchsia">Photo Audit</span>
          </h2>
          <p className="text-sm text-glassTextMuted max-w-lg mx-auto">
            Audit your LinkedIn portrait or resume headshot for lighting, professional composition, and appearance quality.
          </p>
        </div>

        {error && (
          <div className="p-4 bg-red-950/40 border border-red-500/30 text-red-200 text-sm rounded-xl">
            ⚠️ {error}
          </div>
        )}

        {!result ? (
          /* Upload view */
          <GlassCard hover={false} className="max-w-xl mx-auto space-y-6">
            <FileUpload
              onFileSelect={handleFileSelect}
              uploading={uploading || analyzing}
              progress={uploadProgress}
              accept=".png,.jpg,.jpeg"
              title="Upload Professional Photo"
              description="Supports PNG, JPG, or JPEG up to 5MB"
            />

            {file && !uploading && !analyzing && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-end"
              >
                <button
                  onClick={handleUploadAndAnalyze}
                  className="px-6 py-3 bg-gradient-to-r from-neonPurple to-neonFuchsia text-white font-bold text-sm rounded-xl flex items-center space-x-2 hover:opacity-95 shadow-glass-glow hover:scale-102 transition-all duration-200 active:scale-95"
                >
                  <RiScanLine className="w-4 h-4 animate-spin-slow" />
                  <span>Upload & Analyze Photo</span>
                </button>
              </motion.div>
            )}

            {analyzing && (
              <div className="flex flex-col items-center justify-center py-6 space-y-3">
                <RiLoader4Line className="w-10 h-10 text-neonPurple animate-spin" />
                <span className="text-sm font-semibold text-neonPurple">
                  Running OpenAI Vision composition analysis...
                </span>
              </div>
            )}
          </GlassCard>
        ) : (
          /* Report View */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Image display & Overall Score */}
            <div className="space-y-6">
              <GlassCard hover={false} className="flex flex-col items-center space-y-6">
                <div className="w-48 h-48 rounded-2xl border-2 border-glassBorder overflow-hidden bg-slate-900 flex items-center justify-center shadow-glass-glow">
                  <img
                    src={photoUrl}
                    alt="Uploaded Portrait"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col items-center">
                  <h3 className="text-sm font-bold text-glassTextMuted uppercase tracking-wider mb-2">
                    Portrait Suitability
                  </h3>
                  <CircularProgress
                    score={result.photoScore}
                    size={150}
                    strokeWidth={12}
                    colorClass="text-neonPurple"
                  />
                </div>
                <button
                  onClick={resetAnalysis}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-white/5 border border-glassBorder rounded-xl hover:bg-white/10 text-white font-semibold text-sm transition-colors"
                >
                  <RiCameraSwitchLine className="w-4 h-4 text-neonFuchsia" />
                  <span>Upload New Portrait</span>
                </button>
              </GlassCard>
            </div>

            {/* Ratings & Recommendations */}
            <div className="lg:col-span-2 space-y-6">
              {/* Detailed Metrics */}
              <GlassCard hover={false} className="space-y-6">
                <h3 className="text-lg font-bold text-white border-b border-glassBorder pb-3 flex items-center space-x-2">
                  <RiUserStarLine className="w-5 h-5 text-neonPurple" />
                  <span>Composition Scores</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
                  <ProgressBar
                    label="Professional Appearance"
                    score={result.professionalAppearance}
                    colorClass="bg-gradient-to-r from-indigo-400 to-purple-500"
                  />
                  <ProgressBar
                    label="Background Composition"
                    score={result.backgroundQuality}
                    colorClass="bg-gradient-to-r from-purple-400 to-pink-500"
                  />
                  <ProgressBar
                    label="Lighting & Highlights"
                    score={result.lightingQuality}
                    colorClass="bg-gradient-to-r from-amber-400 to-orange-500"
                  />
                  <ProgressBar
                    label="Image Clarity & Sharpness"
                    score={result.imageClarity}
                    colorClass="bg-gradient-to-r from-emerald-400 to-teal-500"
                  />
                  <ProgressBar
                    label="LinkedIn Suitability"
                    score={result.linkedinSuitability}
                    colorClass="bg-gradient-to-r from-sky-400 to-cyan-500"
                  />
                  <ProgressBar
                    label="Resume Suitability"
                    score={result.resumeSuitability}
                    colorClass="bg-gradient-to-r from-fuchsia-400 to-pink-500"
                  />
                </div>
              </GlassCard>

              {/* Suggestions */}
              <GlassCard hover={false} className="space-y-4">
                <h3 className="text-lg font-bold text-white border-b border-glassBorder pb-3 flex items-center space-x-2 text-neonFuchsia">
                  <RiSparklingLine className="w-5 h-5 animate-pulse" />
                  <span>Branding Recommendations</span>
                </h3>
                <ul className="space-y-3">
                  {result.suggestions && result.suggestions.length > 0 ? (
                    result.suggestions.map((sug, idx) => (
                      <li key={idx} className="flex items-start space-x-2.5 text-sm leading-relaxed text-glassText">
                        <span className="text-neonFuchsia mt-1">•</span>
                        <span>{sug}</span>
                      </li>
                    ))
                  ) : (
                    <p className="text-sm text-glassTextMuted italic">
                      Portrait meets all executive quality criteria. No suggestions.
                    </p>
                  )}
                </ul>
              </GlassCard>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoAnalysis;
