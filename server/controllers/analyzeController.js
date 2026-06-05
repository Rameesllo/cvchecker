import { v2 as cloudinary } from 'cloudinary';
import { extractTextFromBuffer } from '../utils/extractor.js';
import { analyzeResumeText, analyzeProfilePhoto } from '../utils/openai.js';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
  api_key: process.env.CLOUDINARY_API_KEY || '',
  api_secret: process.env.CLOUDINARY_API_SECRET || ''
});

/**
 * Helper function to upload buffer to Cloudinary using stream
 * @param {Buffer} buffer - File buffer
 * @param {object} options - Cloudinary upload options
 * @returns {Promise<object>} - Cloudinary upload result
 */
const uploadFromBuffer = (buffer, options = {}) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: 'auto', ...options },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    uploadStream.end(buffer);
  });
};

/**
 * Uploads resume, extracts text, and returns URL and text.
 */
export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No resume file uploaded.' });
    }

    // 1. Upload file to Cloudinary
    // Use raw or auto depending on type, add folder
    const uploadResult = await uploadFromBuffer(req.file.buffer, {
      folder: 'resumes',
      public_id: `resume_${Date.now()}_${req.file.originalname.replace(/[^a-zA-Z0-9]/g, '_')}`
    });

    // 2. Extract text from the uploaded file buffer
    const extractedText = await extractTextFromBuffer(req.file.buffer, req.file.mimetype);

    if (!extractedText || extractedText.trim().length === 0) {
      return res.status(422).json({
        error: 'Unable to extract text from the uploaded file. Please make sure the file contains readable text or is not empty.',
        url: uploadResult.secure_url
      });
    }

    return res.status(200).json({
      message: 'Resume uploaded and processed successfully.',
      url: uploadResult.secure_url,
      text: extractedText
    });
  } catch (error) {
    console.error('Error in uploadResume controller:', error);
    return res.status(500).json({
      error: error.message || 'Server error occurred while processing the resume.'
    });
  }
};

/**
 * Uploads a profile photo to Cloudinary.
 */
export const uploadPhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file uploaded.' });
    }

    // Ensure it is indeed an image
    if (!req.file.mimetype.startsWith('image/')) {
      return res.status(400).json({ error: 'Uploaded file is not a valid image.' });
    }

    // Upload to Cloudinary under profile_photos
    const uploadResult = await uploadFromBuffer(req.file.buffer, {
      folder: 'profile_photos',
      public_id: `photo_${Date.now()}`
    });

    return res.status(200).json({
      message: 'Photo uploaded successfully.',
      url: uploadResult.secure_url
    });
  } catch (error) {
    console.error('Error in uploadPhoto controller:', error);
    return res.status(500).json({
      error: error.message || 'Server error occurred while uploading the photo.'
    });
  }
};

/**
 * Invokes OpenAI to analyze extracted resume text.
 */
export const analyzeResume = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || text.trim().length === 0) {
      return res.status(400).json({ error: 'No resume text provided for analysis.' });
    }

    const evaluation = await analyzeResumeText(text);

    return res.status(200).json(evaluation);
  } catch (error) {
    console.error('Error in analyzeResume controller:', error);
    return res.status(500).json({
      error: error.message || 'Server error occurred while analyzing the resume.'
    });
  }
};

/**
 * Invokes OpenAI Vision to analyze profile photo from a Cloudinary URL.
 */
export const analyzePhoto = async (req, res) => {
  try {
    const { imageUrl } = req.body;
    if (!imageUrl) {
      return res.status(400).json({ error: 'No image URL provided for analysis.' });
    }

    const analysis = await analyzeProfilePhoto(imageUrl);

    return res.status(200).json(analysis);
  } catch (error) {
    console.error('Error in analyzePhoto controller:', error);
    return res.status(500).json({
      error: error.message || 'Server error occurred while analyzing the profile photo.'
    });
  }
};
