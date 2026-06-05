# ResumeIQ AI

ResumeIQ AI is a production-ready, AI-powered web application that evaluates professional resumes and portrait headshots. Users can upload a resume (PDF, DOCX, or Image formats) or a separate profile photo, securely store them in Cloudinary, automatically extract text (including via OCR for images), and send the results to OpenAI for comprehensive evaluation dashboards and vision-based portrait branding suggestions.

## Key Features

1. **Multi-Format Resume Upload**: Supports PDF, DOCX, PNG, JPG, and JPEG files up to 5MB.
2. **Text Extraction Pipeline**:
   - Parses text directly from standard PDF layouts (`pdf-parse`).
   - Extracts formatted texts from Word documents (`mammoth`).
   - Runs advanced OCR processing on image-based resumes (`tesseract.js`).
3. **Deep ATS & HR Audit**: Evaluates overall scores, ATS compatibility, skills alignment, work experience, projects, education, and communication.
4. **Actionable Feedback**: Pinpoints exact strengths, weaknesses, layout suggestions, and copy edits.
5. **AI Profile Photo Review**: Multi-modal vision analysis evaluating lighting, appearance, background, image clarity, and LinkedIn/resume suitability.
6. **Premium Glassmorphic UI**: Responsive dark mode SaaS theme with smooth Framer Motion entry and tab animations.

---

## Tech Stack

### Frontend (Client)
- **Vite + React.js** (SPA tabs routing)
- **Tailwind CSS** (Custom dark layout theme + glassmorphism utility classes)
- **Framer Motion** (Dynamic transition animations)
- **React Icons** & **Axios**

### Backend (Server)
- **Node.js** & **Express.js** (JSON API server)
- **Multer** (Memory-buffered file streaming)
- **Tesseract.js** (OCR), **pdf-parse**, **mammoth**
- **Cloudinary SDK** (Upload stream buffer routing)
- **OpenAI Node SDK** (Structured JSON response configuration)

---

## Project Structure

```
d:/llo/cv checker/
├── client/                  # Vite + React Client
│   ├── src/
│   │   ├── components/      # GlassCard, Progress bars, Upload dropzone, Navbar, Footer
│   │   ├── pages/           # Home, Upload, Dashboard, PhotoAnalysis
│   │   ├── services/        # Axios API client
│   │   ├── index.css
│   │   ├── main.jsx
│   │   └── App.jsx
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── vite.config.js
│   └── package.json
│
├── server/                  # Node.js Express API Server
│   ├── controllers/         # Upload & analyze handlers
│   ├── middleware/          # Multer memory validator
│   ├── routes/              # Express API endpoints
│   ├── utils/               # Text extractor, OpenAI callers
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## Getting Started

### 1. Prerequisites
- **Node.js** (v18 or above recommended)
- **OpenAI API Key**
- **Cloudinary Account** (Cloud Name, API Key, API Secret)

### 2. Environment Setup
Create a `.env` file inside the `server/` directory:
```env
PORT=5000
OPENAI_API_KEY=your_openai_api_key_here
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name_here
CLOUDINARY_API_KEY=your_cloudinary_api_key_here
CLOUDINARY_API_SECRET=your_cloudinary_api_secret_here
```

### 3. Installation
Install dependencies in both directories:
```bash
# In the server directory
cd server
npm install

# In the client directory
cd ../client
npm install
```

### 4. Running the Application

To run both servers locally in development mode:

**Start the Express Backend:**
```bash
cd server
npm run dev
# Server runs at http://localhost:5000
```

**Start the Vite Frontend:**
```bash
cd client
npm run dev
# Client runs at http://localhost:5173 (proxied to API)
```
Navigate to `http://localhost:5173` to interact with ResumeIQ AI.
