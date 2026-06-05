import pdf from 'pdf-parse';
import mammoth from 'mammoth';
import Tesseract from 'tesseract.js';
import OpenAI from 'openai';
import express from 'express';
import multer from 'multer';

console.log('------------------------------------------');
console.log('Running ES Module import verification...');
console.log('------------------------------------------');
console.log('PDF Parse import type:', typeof pdf);
console.log('Mammoth import type:', typeof mammoth);
console.log('Tesseract import type:', typeof Tesseract);
console.log('OpenAI import type:', typeof OpenAI);
console.log('Express import type:', typeof express);
console.log('Multer import type:', typeof multer);
console.log('------------------------------------------');
console.log('✅ All backend dependencies imported successfully!');
console.log('------------------------------------------');
