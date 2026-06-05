/**
 * Simulated Frontend Client API for LLO ResumeIQ AI
 * Runs 100% client-side to allow serverless hosting on Vercel or GitHub Pages.
 */

// Helper to simulate progressive upload ticks
const simulateProgress = (onProgress) => {
  return new Promise((resolve) => {
    let current = 0;
    const interval = setInterval(() => {
      current += 10;
      if (onProgress) onProgress(current);
      if (current >= 100) {
        clearInterval(interval);
        resolve();
      }
    }, 120);
  });
};

/**
 * local mock resume grading algorithm based on keywords
 */
const generateLocalMockResumeAnalysis = (text) => {
  const normalizedText = text.toLowerCase();
  
  const hasEmail = normalizedText.includes('@') || normalizedText.includes('email') || normalizedText.includes('.com');
  const hasPhone = /\+?\d{8,12}/.test(normalizedText) || normalizedText.includes('phone') || normalizedText.includes('contact');
  const hasGithub = normalizedText.includes('github.com') || normalizedText.includes('github.io');
  const hasLinkedin = normalizedText.includes('linkedin.com') || normalizedText.includes('linkedin.in');
  const hasProjects = normalizedText.includes('project') || normalizedText.includes('portfolio') || normalizedText.includes('built');
  const hasSkills = normalizedText.includes('skills') || normalizedText.includes('technologies') || normalizedText.includes('languages') || normalizedText.includes('tools');
  const hasExperience = normalizedText.includes('experience') || normalizedText.includes('employment') || normalizedText.includes('work history') || normalizedText.includes('intern');
  const hasEducation = normalizedText.includes('education') || normalizedText.includes('university') || normalizedText.includes('college') || normalizedText.includes('degree');

  // Enforce realistic average scores to show optimization potential
  const overallScore = 71;
  const atsScore = 65;
  const skillsScore = hasSkills ? 75 : 45;
  const experienceScore = hasExperience ? 70 : 38;
  const projectsScore = hasProjects ? 68 : 32;
  const educationScore = hasEducation ? 76 : 50;
  const communicationScore = 69;

  const strengths = [];
  const weaknesses = [];
  const suggestions = [];
  const recommendedChanges = [];

  // Strengths
  strengths.push('Contact detail parameters appear to be present in the header.');
  if (hasSkills) {
    strengths.push('Technical stack details are indexed successfully.');
  }
  strengths.push('Raw text matches standard parser token layouts.');

  // Enforced/Dynamic Weaknesses (Bugs/Errors in the resume)
  weaknesses.push('ATS compatibility issue: Multi-column structural table layout detected which can cause reading order scrambling.');
  weaknesses.push('Weak project description metrics: Project achievements do not showcase quantitative metrics (e.g. speedup %, revenue, scale).');
  weaknesses.push('Repetitive action verbs: Multiple bullet points start with passive verbs like "assisted", "helped", or "managed".');

  if (!hasGithub) {
    weaknesses.push('Missing portfolio profile link: No GitHub link was indexed.');
  }
  if (!hasLinkedin) {
    weaknesses.push('Missing professional network link: No LinkedIn URL detected.');
  }

  // Actionable Suggestions
  suggestions.push('Convert the double-column structure to a clean, single-column chronological format.');
  suggestions.push('Add numeric evidence to project achievements (e.g. changing "speed up queries" to "reduced API response time by 32%").');
  suggestions.push('Expand your vocabulary. Replace "managed" or "helped" with "spearheaded", "engineered", or "architected".');

  if (!hasGithub) {
    suggestions.push('Add a link to your GitHub profile header to show active code contributions.');
    recommendedChanges.push('Insert contact field: "GitHub: github.com/your-username"');
  }
  if (!hasLinkedin) {
    suggestions.push('Include a LinkedIn profile address to facilitate recruiter search.');
    recommendedChanges.push('Insert contact field: "LinkedIn: linkedin.com/in/your-profile"');
  }

  // Recommended Edits
  recommendedChanges.push('Reformat the entire resume template from a two-column design to a clean vertical block layout.');
  recommendedChanges.push('Rewrite experience bullets: change "responsible for managing servers" to "Engineered highly scalable server architecture, improving reliability to 99.9% uptime".');

  return {
    overallScore,
    atsScore,
    skillsScore,
    experienceScore,
    projectsScore,
    educationScore,
    communicationScore,
    checks: {
      missingContactInfo: !(hasEmail && hasPhone),
      missingGithub: !hasGithub,
      missingLinkedin: !hasLinkedin,
      missingProjects: !hasProjects,
      missingSkills: !hasSkills,
      missingExperience: !hasExperience,
      missingEducation: !hasEducation,
      weakProjectDescriptions: true, // Mark as failed check (red flag)
      repetitiveActionVerbs: true,   // Mark as failed check (red flag)
      poorFormatting: true,          // Mark as failed check (red flag)
      atsCompatibility: false        // Mark as compatibility failure
    },
    strengths,
    weaknesses,
    suggestions,
    recommendedChanges,
    sandboxMode: true
  };
};

/**
 * local mock photo grading
 */
const generateLocalMockPhotoAnalysis = () => {
  return {
    photoScore: 68, // Lower grade to highlight need for correction
    professionalAppearance: 72,
    backgroundQuality: 60,
    lightingQuality: 65,
    imageClarity: 80,
    linkedinSuitability: 66,
    resumeSuitability: 50,
    suggestions: [
      "[Audit Warning] Cluttered background: The backdrop contains home clutter. We recommend using a clean, neutral, single-colored wall.",
      "[Audit Warning] Incorrect lighting angles: The main light source is behind or to the side, casting shadows. Position light directly in front of you.",
      "[Audit Warning] Non-professional photo: The headshot seems to be a cropped holiday photo. Use a front-facing headshot taken in professional attire.",
      "[Audit Warning] Layout advise: Avoid embedding photos directly onto standard chronological resumes as they violate recruitment protocols in many regions.",
      "[Audit Warning] Image sharpness is moderate. Ensure the picture has high sharpness and is free of pixelation."
    ],
    sandboxMode: true
  };
};

/**
 * Simulates uploading a resume file and returning mock text content.
 */
export const uploadResumeFile = async (file, onProgress) => {
  await simulateProgress(onProgress);

  // Read file details to construct realistic mock text
  let mockText = `========================================================\n`;
  mockText += `  RESUME DATA EXTRACTED FROM: ${file.name.toUpperCase()}\n`;
  mockText += `========================================================\n\n`;
  mockText += `NAME: LLO Applicant\n`;
  mockText += `ROLE: Full Stack Developer\n\n`;
  
  // Conditionally search or map elements based on filename/type
  const isDocx = file.name.endsWith('.docx');
  const isImage = file.name.endsWith('.png') || file.name.endsWith('.jpg') || file.name.endsWith('.jpeg');
  
  mockText += `CONTACT INFORMATION:\n`;
  mockText += `Email: llo.applicant@example.com\n`;
  mockText += `Phone: +1 (555) 012-3456\n`;
  mockText += `Portfolio: llo-portfolio.dev\n\n`;

  mockText += `WORK HISTORY:\n`;
  mockText += `Software Developer - LLO Tech Solutions (2024 - Present)\n`;
  mockText += `- Managed React client user interface and resolved layout design feedback.\n`;
  mockText += `- Helped team lead write REST API controllers and setup database models.\n`;
  mockText += `- Assisted with deployments and wrote documentation.\n\n`;

  mockText += `PROJECTS:\n`;
  mockText += `1. Resume Analyzer App\n`;
  mockText += `- Built frontend with React, Tailwind CSS, and Framer Motion.\n`;
  mockText += `- Worked on text parser utility modules and handled OpenAI endpoints.\n\n`;

  mockText += `SKILLS:\n`;
  mockText += `JavaScript, React, Node.js, Express, CSS, Tailwind CSS, Git, HTML, SQL\n\n`;

  mockText += `EDUCATION:\n`;
  mockText += `Bachelor of Science in Information Technology (Graduated 2023)\n`;

  return {
    url: 'https://res.cloudinary.com/demo/image/upload/sample.jpg',
    text: mockText
  };
};

/**
 * Simulates uploading a profile photo file and returns a local preview URL.
 */
export const uploadPhotoFile = async (file, onProgress) => {
  await simulateProgress(onProgress);
  
  // Create local preview URL directly so user actually sees their portrait in the scorecard
  const previewUrl = URL.createObjectURL(file);
  
  return {
    url: previewUrl
  };
};

/**
 * Simulates analyzing resume text client-side.
 */
export const analyzeResumeText = async (text) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return generateLocalMockResumeAnalysis(text);
};

/**
 * Simulates analyzing profile photo URL client-side.
 */
export const analyzePhotoUrl = async (imageUrl) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return generateLocalMockPhotoAnalysis();
};

export default {
  uploadResumeFile,
  uploadPhotoFile,
  analyzeResumeText,
  analyzePhotoUrl
};
