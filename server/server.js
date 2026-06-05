import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './routes/api.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend requests
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true
}));

// Increase JSON body limits for handling large raw texts
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Log requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// API Routes
app.use('/api', apiRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'LLO ResumeIQ AI API is running' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err);
  
  // Specific Multer file size error handling
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      error: 'File is too large. Maximum size allowed is 5MB.'
    });
  }

  res.status(err.status || 500).json({
    error: err.message || 'An unexpected server error occurred.'
  });
});

// Start listening
app.listen(PORT, () => {
  console.log(`=========================================`);
  console.log(`🚀 LLO ResumeIQ AI Server running on port ${PORT}`);
  console.log(`=========================================`);
});
