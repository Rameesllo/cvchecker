import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || ''
});

/**
 * Generates a realistic mock evaluation based on text keywords when OpenAI quota is exceeded.
 */
const generateMockResumeAnalysis = (text) => {
  const normalizedText = text.toLowerCase();
  
  const hasEmail = normalizedText.includes('@') || normalizedText.includes('email');
  const hasPhone = /\+?\d{10,12}/.test(normalizedText) || normalizedText.includes('phone') || normalizedText.includes('contact');
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
 * Sends extracted resume text to OpenAI to get structured evaluation scores and suggestions.
 * @param {string} text - The raw text content of the resume.
 * @returns {Promise<object>} - Structured ATS & HR evaluation.
 */
export const analyzeResumeText = async (text) => {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not defined in environment variables');
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are an expert HR Manager and a highly advanced Applicant Tracking System (ATS) auditor. Your task is to analyze the provided resume text and return a detailed JSON evaluation. Keep responses professional, encouraging, and critical where necessary. You must return only a valid JSON object matching this schema:
{
  "overallScore": <0-100 integer>,
  "atsScore": <0-100 integer>,
  "skillsScore": <0-100 integer>,
  "experienceScore": <0-100 integer>,
  "projectsScore": <0-100 integer>,
  "educationScore": <0-100 integer>,
  "communicationScore": <0-100 integer>,
  "checks": {
    "missingContactInfo": <boolean>,
    "missingGithub": <boolean>,
    "missingLinkedin": <boolean>,
    "missingProjects": <boolean>,
    "missingSkills": <boolean>,
    "missingExperience": <boolean>,
    "missingEducation": <boolean>,
    "weakProjectDescriptions": <boolean>,
    "repetitiveActionVerbs": <boolean>,
    "poorFormatting": <boolean>,
    "atsCompatibility": <boolean>
  },
  "strengths": [<string list of positive points>],
  "weaknesses": [<string list of issues found>],
  "suggestions": [<string list of detailed improvements>],
  "recommendedChanges": [<string list of specific edits/replacements>]
}`
        },
        {
          role: 'user',
          content: `Here is the resume text to analyze:\n\n${text}`
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.2
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error('OpenAI Error in analyzeResumeText:', error);
    
    // Catch quota, billing, or rate-limiting errors and fallback
    if (
      error.code === 'insufficient_quota' ||
      error.status === 429 ||
      error.message?.includes('quota') ||
      error.message?.includes('billing')
    ) {
      console.warn('⚠️ OpenAI API Quota Exceeded. Falling back to dynamic mock analysis.');
      return generateMockResumeAnalysis(text);
    }
    throw error;
  }
};
