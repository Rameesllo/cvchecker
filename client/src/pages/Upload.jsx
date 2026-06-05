import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiFileLine, RiArrowRightLine, RiCpuLine, RiLoader4Line } from 'react-icons/ri';
import FileUpload from '../components/FileUpload';
import GlassCard from '../components/GlassCard';
import { uploadResumeFile, analyzeResumeText } from '../services/api';

const Upload = ({ setResumeResult, setCurrentPage }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [extractedText, setExtractedText] = useState('');
  const [cloudinaryUrl, setCloudinaryUrl] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState('');

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
    setExtractedText('');
    setCloudinaryUrl('');
    setError('');
  };

  const handleUploadAndExtract = async () => {
    if (!file) return;
    setUploading(true);
    setUploadProgress(0);
    setError('');

    try {
      const data = await uploadResumeFile(file, (progress) => {
        setUploadProgress(progress);
      });
      setCloudinaryUrl(data.url);
      setExtractedText(data.text);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.error ||
        'Failed to process file. Make sure it is a readable document or valid image.'
      );
      setFile(null);
    } finally {
      setUploading(false);
    }
  };

  const handleStartAnalysis = async () => {
    if (!extractedText) return;
    setAnalyzing(true);
    setError('');

    try {
      const result = await analyzeResumeText(extractedText);
      // Inject the uploaded resume URL into the result so we can reference it
      setResumeResult({ ...result, resumeUrl: cloudinaryUrl });
      setCurrentPage('dashboard');
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.error ||
        'Error communicating with OpenAI APIs. Please check your credentials.'
      );
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 relative">
      <div className="glow-blur glow-cyan w-[250px] h-[250px] top-10 left-[20%]"></div>
      <div className="glow-blur glow-purple w-[300px] h-[300px] bottom-10 right-[20%]"></div>

      <div className="space-y-8 relative z-10">
        <div className="text-center space-y-2">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Evaluate Your <span className="text-gradient-cyan-purple">Resume</span>
          </h2>
          <p className="text-sm text-glassTextMuted max-w-lg mx-auto">
            Upload your resume document to securely host it, extract structural contents, and run full-scale AI analysis.
          </p>
        </div>

        {error && (
          <div className="p-4 bg-red-950/40 border border-red-500/30 text-red-200 text-sm rounded-xl">
            ⚠️ {error}
          </div>
        )}

        <GlassCard hover={false} className="space-y-6">
          {!extractedText ? (
            /* Upload step */
            <div className="space-y-6">
              <FileUpload
                onFileSelect={handleFileSelect}
                uploading={uploading}
                progress={uploadProgress}
                title="Drag & Drop Resume"
                description="Supports PDF, DOCX, PNG, JPG, JPEG up to 5MB"
              />

              {file && !uploading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-end"
                >
                  <button
                    onClick={handleUploadAndExtract}
                    className="px-6 py-3 bg-neonCyan text-darkBg font-bold text-sm rounded-xl flex items-center space-x-2 hover:shadow-neon-border hover:scale-102 transition-all duration-200 active:scale-95"
                  >
                    <span>Upload & Extract Text</span>
                    <RiArrowRightLine className="w-4 h-4" />
                  </button>
                </motion.div>
              )}
            </div>
          ) : (
            /* Analysis Preview Step */
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between border-b border-glassBorder pb-4">
                <div className="flex items-center space-x-2">
                  <RiFileLine className="w-5 h-5 text-neonCyan" />
                  <span className="font-bold text-white text-sm sm:text-base">Extracted Resume Text</span>
                </div>
                <button
                  onClick={() => {
                    setFile(null);
                    setExtractedText('');
                    setCloudinaryUrl('');
                  }}
                  className="text-xs text-red-400 hover:underline font-semibold"
                  disabled={analyzing}
                >
                  Upload Different File
                </button>
              </div>

              {/* Text Preview Box */}
              <div className="bg-slate-950/60 border border-glassBorder rounded-xl p-4 max-h-[300px] overflow-y-auto text-xs font-mono text-glassTextMuted leading-relaxed scrollbar">
                {extractedText}
              </div>

              {/* Action and loader */}
              <div className="flex items-center justify-end">
                {analyzing ? (
                  <div className="flex items-center space-x-2 text-neonPurple font-semibold text-sm">
                    <RiLoader4Line className="w-5 h-5 animate-spin" />
                    <span>Analyzing resume with OpenAI...</span>
                  </div>
                ) : (
                  <button
                    onClick={handleStartAnalysis}
                    className="px-8 py-3.5 bg-gradient-to-r from-neonCyan to-neonPurple text-darkBg font-extrabold text-sm rounded-xl flex items-center space-x-2 hover:shadow-neon-border hover:scale-102 transition-all duration-200 active:scale-95 shadow-glass-glow"
                  >
                    <RiCpuLine className="w-4 h-4" />
                    <span>Run AI Analysis</span>
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </GlassCard>
      </div>
    </div>
  );
};

export default Upload;
