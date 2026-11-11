import express from 'express';
import upload from '../middleware/upload.js';
import { uploadResume, analyzeResume } from '../controllers/analyzeController.js';

const router = express.Router();

// Route to upload resume file, extract text, and get Cloudinary URL
router.post('/upload-resume', upload.single('resume'), uploadResume);

// Route to perform OpenAI evaluation on resume text
router.post('/analyze-resume', analyzeResume);

export default router;
