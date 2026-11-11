import React, { useState } from 'react';
import { analyzeResumeText, uploadResumeFile } from '../services/api';

const allowedExtensions = ['.pdf', '.docx', '.png', '.jpg', '.jpeg'];
const maxFileSize = 5 * 1024 * 1024;

const Upload = ({ setResumeResult, setCurrentPage }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [extractedText, setExtractedText] = useState('');
  const [resumeUrl, setResumeUrl] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    const extension = selectedFile.name.slice(selectedFile.name.lastIndexOf('.')).toLowerCase();
    if (!allowedExtensions.includes(extension)) {
      setError('Choose a PDF, DOCX, PNG, JPG, or JPEG file.');
      setFile(null);
      return;
    }

    if (selectedFile.size > maxFileSize) {
      setError('File must be smaller than 5 MB.');
      setFile(null);
      return;
    }

    setError('');
    setFile(selectedFile);
    setExtractedText('');
    setResumeUrl('');
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setProgress(0);
    setError('');

    try {
      const result = await uploadResumeFile(file, setProgress);
      setExtractedText(result.text);
      setResumeUrl(result.url);
    } catch (uploadError) {
      console.error(uploadError);
      setError(uploadError.message || 'Could not process this file.');
    } finally {
      setUploading(false);
    }
  };

  const handleAnalysis = async () => {
    if (!extractedText) return;
    setAnalyzing(true);
    setError('');

    try {
      const result = await analyzeResumeText(extractedText);
      setResumeResult({ ...result, resumeUrl });
      setCurrentPage('dashboard');
    } catch (analysisError) {
      console.error(analysisError);
      setError(analysisError.message || 'Could not analyze this resume.');
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <section className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="text-3xl font-bold text-slate-900">Check your resume</h1>
      <p className="mt-2 text-slate-600">Choose a file up to 5 MB to get started.</p>

      {error && (
        <p role="alert" className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="mt-8 rounded-xl border border-slate-200 p-6">
        {!extractedText ? (
          <div className="space-y-4">
            <label htmlFor="resume-file" className="block text-sm font-medium text-slate-700">
              Resume file (PDF, DOCX, PNG, JPG)
            </label>
            <input
              id="resume-file"
              type="file"
              accept=".pdf,.docx,.png,.jpg,.jpeg"
              onChange={handleFileChange}
              disabled={uploading}
              className="block w-full text-sm text-slate-600 file:mr-4 file:rounded-md file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
            />
            {file && <p className="text-sm text-slate-600">{file.name}</p>}
            {uploading && (
              <p className="text-sm text-slate-600" aria-live="polite">
                Processing file: {progress}%
              </p>
            )}
            <button
              type="button"
              onClick={handleUpload}
              disabled={!file || uploading}
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {uploading ? 'Processing…' : 'Continue'}
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between gap-4">
              <h2 className="font-semibold text-slate-900">Resume text</h2>
              <button
                type="button"
                onClick={() => {
                  setFile(null);
                  setExtractedText('');
                  setResumeUrl('');
                }}
                disabled={analyzing}
                className="text-sm font-medium text-blue-700 hover:underline disabled:opacity-50"
              >
                Choose another file
              </button>
            </div>
            <pre className="mt-4 max-h-72 overflow-auto whitespace-pre-wrap rounded-lg bg-slate-50 p-4 text-sm text-slate-700">
              {extractedText}
            </pre>
            <button
              type="button"
              onClick={handleAnalysis}
              disabled={analyzing}
              className="mt-5 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-wait disabled:opacity-50"
            >
              {analyzing ? 'Analyzing…' : 'Analyze resume'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Upload;
