import React, { useState, useRef } from 'react';
import { RiUploadCloud2Line, RiFileTextLine, RiFileImageLine, RiCloseCircleLine } from 'react-icons/ri';

const FileUpload = ({
  onFileSelect,
  uploading = false,
  progress = 0,
  accept = '.pdf,.docx,.png,.jpg,.jpeg',
  title = 'Upload Resume',
  description = 'Supports PDF, DOCX, PNG, JPG, or JPEG up to 5MB'
}) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  // Validate the selected file
  const validateAndSelectFile = (file) => {
    setError('');
    if (!file) return;

    // Check size limit (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File is too large. Maximum size is 5MB.');
      return;
    }

    // Check mime type / extension
    const extension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    const allowedExtensions = accept.split(',');
    
    if (!allowedExtensions.includes(extension)) {
      setError(`Invalid file type. Only ${accept} files are supported.`);
      return;
    }

    setSelectedFile(file);
    onFileSelect(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSelectFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      validateAndSelectFile(e.target.files[0]);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
    onFileSelect(null);
  };

  const isImageFile = (file) => {
    return file && file.type.startsWith('image/');
  };

  return (
    <div className="w-full space-y-4">
      {/* Drag & Drop Container */}
      {!selectedFile ? (
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={handleButtonClick}
          className={`flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-8 cursor-pointer transition-all duration-300 ${
            isDragActive
              ? 'border-neonCyan bg-neonCyan/5 shadow-neon-border scale-[1.01]'
              : 'border-slate-800 hover:border-slate-700 bg-slate-900/10'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept={accept}
            onChange={handleChange}
            disabled={uploading}
          />
          <div className="p-4 rounded-full bg-slate-900/60 border border-glassBorder text-neonCyan mb-4 shadow-glass-glow">
            <RiUploadCloud2Line className="w-8 h-8 animate-pulse" />
          </div>
          <p className="text-base font-semibold text-white">{title}</p>
          <p className="text-sm text-glassTextMuted mt-1">{description}</p>
          <button
            type="button"
            className="mt-4 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg bg-white/5 border border-glassBorder hover:bg-white/10 text-white transition-colors"
          >
            Browse Files
          </button>
        </div>
      ) : (
        /* Selected File View */
        <div className="border border-glassBorder rounded-2xl p-6 bg-slate-900/40 relative">
          <button
            onClick={clearSelection}
            disabled={uploading}
            className="absolute top-4 right-4 text-glassTextMuted hover:text-red-400 transition-colors disabled:opacity-50"
            title="Clear file"
          >
            <RiCloseCircleLine className="w-6 h-6" />
          </button>

          <div className="flex items-center space-x-4">
            {isImageFile(selectedFile) ? (
              <div className="w-16 h-16 rounded-xl border border-glassBorder overflow-hidden bg-slate-900 flex items-center justify-center">
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-xl border border-glassBorder bg-slate-900 flex items-center justify-center text-neonPurple shadow-glass-glow">
                <RiFileTextLine className="w-8 h-8" />
              </div>
            )}

            <div className="flex-1 min-w-0 pr-8">
              <p className="text-sm font-bold text-white truncate">{selectedFile.name}</p>
              <p className="text-xs text-glassTextMuted mt-0.5">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>

          {/* Uploading progress bar */}
          {uploading && (
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-xs text-glassTextMuted">
                <span>Uploading to Cloudinary...</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-neonCyan to-neonPurple transition-all duration-150"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-red-950/40 border border-red-500/30 text-red-300 text-xs rounded-xl flex items-center space-x-2">
          <span>⚠️ {error}</span>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
