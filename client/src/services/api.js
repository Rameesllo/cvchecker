import axios from 'axios';

const api = axios.create({
  baseURL: '', // Empty because Vite proxy catches /api
  timeout: 120000 // 2 minutes, as OCR and OpenAI calls might take some time
});

/**
 * Uploads a resume file and extracts its text.
 * @param {File} file - PDF, DOCX, or Image file.
 * @param {Function} onProgress - Callback for tracking progress.
 */
export const uploadResumeFile = async (file, onProgress) => {
  const formData = new FormData();
  formData.append('resume', file);

  const response = await api.post('/api/upload-resume', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    onUploadProgress: (progressEvent) => {
      const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      if (onProgress) onProgress(percentCompleted);
    }
  });
  return response.data;
};

/**
 * Uploads a profile photo file.
 * @param {File} file - Profile photo image file.
 * @param {Function} onProgress - Callback for tracking progress.
 */
export const uploadPhotoFile = async (file, onProgress) => {
  const formData = new FormData();
  formData.append('photo', file);

  const response = await api.post('/api/upload-photo', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    onUploadProgress: (progressEvent) => {
      const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      if (onProgress) onProgress(percentCompleted);
    }
  });
  return response.data;
};

/**
 * Requests resume text analysis from OpenAI.
 * @param {string} text - The raw resume text.
 */
export const analyzeResumeText = async (text) => {
  const response = await api.post('/api/analyze-resume', { text });
  return response.data;
};

/**
 * Requests OpenAI Vision analysis for a profile photo URL.
 * @param {string} imageUrl - Cloudinary profile photo URL.
 */
export const analyzePhotoUrl = async (imageUrl) => {
  const response = await api.post('/api/analyze-photo', { imageUrl });
  return response.data;
};

export default api;
