import express from 'express';
import upload from '../middleware/upload.js';
import {
  uploadResume,
  uploadPhoto,
  analyzeResume,
  analyzePhoto
} from '../controllers/analyzeController.js';

const router = express.Router();

// Route to upload resume file, extract text, and get Cloudinary URL
router.post('/upload-resume', upload.single('resume'), uploadResume);

// Route to upload profile headshot and get Cloudinary URL
router.post('/upload-photo', upload.single('photo'), uploadPhoto);

// Route to perform OpenAI evaluation on resume text
router.post('/analyze-resume', analyzeResume);

// Route to perform OpenAI Vision analysis on uploaded photo URL
router.post('/analyze-photo', analyzePhoto);

export default router;
