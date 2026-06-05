import pdf from 'pdf-parse';
import mammoth from 'mammoth';
import Tesseract from 'tesseract.js';

/**
 * Extracts text from a file buffer based on the file type (mime-type).
 * @param {Buffer} buffer - The file buffer.
 * @param {string} mimetype - The file mimetype.
 * @returns {Promise<string>} - The extracted text content.
 */
export const extractTextFromBuffer = async (buffer, mimetype) => {
  if (mimetype === 'application/pdf') {
    const data = await pdf(buffer);
    return data.text;
  } 
  
  if (mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  }
  
  if (mimetype.startsWith('image/')) {
    const result = await Tesseract.recognize(buffer, 'eng');
    return result.data.text;
  }

  throw new Error('Unsupported file format for text extraction');
};
