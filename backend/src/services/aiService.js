/**
 * AI Service — integrates with Groq AI for resume intelligence.
 * Uses Llama-3.3-70b-versatile with response_format for robust JSON output.
 */

const Groq = require('groq-sdk');

// Fallback to empty string if GROQ_API_KEY is not defined
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || ''
});

/**
 * Helper to call Groq chat completion endpoint with JSON formatting.
 */
async function callGroq(prompt) {
  const completion = await groq.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: 'You are an expert AI resume builder service. You must respond ONLY with a valid JSON object matching the requested schema.'
      },
      {
        role: 'user',
        content: prompt
      }
    ],
    model: 'llama-3.3-70b-versatile',
    response_format: { type: 'json_object' }
  });

  const content = completion.choices[0]?.message?.content;
  if (!content) {
    throw new Error('Empty response from Groq AI service.');
  }

  return JSON.parse(content);
}

// ─── Improve Resume Section ───────────────────────────────────────────────────
/**
 * Improves a specific resume section using AI.
 * @param {string} text - Original content to improve
 * @param {string} type - Section type: 'summary' | 'bullets' | 'skills' | 'general'
 * @param {string} context - Optional additional context (job title, company, etc.)
 */
async function improveContent(text, type, context = '') {
  const prompts = {
    summary: `You are an expert resume writer and career coach. Improve the following professional summary to make it more impactful, ATS-friendly, and compelling to hiring managers. Focus on quantifiable achievements, strong action verbs, and clear value proposition.

Original Summary: "${text}"
${context ? `Context: ${context}` : ''}

Return a JSON object with this exact structure:
{
  "improvedText": "The improved summary (2-4 sentences, powerful and concise)",
  "suggestions": ["Tip 1", "Tip 2", "Tip 3"],
  "confidence": 92
}`,

    bullets: `You are an expert resume writer. Improve these experience bullet points to be more impactful using the STAR method (Situation, Task, Action, Result). Use strong action verbs, quantify achievements where possible, and make them ATS-optimized.

Original Bullets: "${text}"
${context ? `Job Context: ${context}` : ''}

Return a JSON object with this exact structure:
{
  "improvedText": "• Improved bullet 1\\n• Improved bullet 2\\n• Improved bullet 3",
  "suggestions": ["Tip 1", "Tip 2", "Tip 3"],
  "confidence": 88
}`,

    skills: `You are a technical resume expert. Analyze and improve this skills section. Organize skills by category, add missing relevant skills, remove outdated ones, and format them professionally.

Original Skills: "${text}"
${context ? `Role/Industry: ${context}` : ''}

Return a JSON object with this exact structure:
{
  "improvedText": "Skill1, Skill2, Skill3, Skill4, Skill5",
  "suggestions": ["Tip 1", "Tip 2", "Tip 3"],
  "confidence": 85
}`,

    general: `You are an expert resume writer. Improve the following resume content to be more professional, impactful, and ATS-friendly.

Original Content: "${text}"
${context ? `Context: ${context}` : ''}

Return a JSON object with this exact structure:
{
  "improvedText": "The improved content",
  "suggestions": ["Tip 1", "Tip 2", "Tip 3"],
  "confidence": 80
}`
  };

  const prompt = prompts[type] || prompts.general;
  const parsed = await callGroq(prompt);

  return {
    originalText: text,
    improvedText: parsed.improvedText || text,
    suggestions: parsed.suggestions || [],
    confidence: parsed.confidence || 80
  };
}

// ─── Generate Full Resume ─────────────────────────────────────────────────────
/**
 * Generates a complete resume from a job description and basic user info.
 */
async function generateResume(jobDescription, userInfo = {}) {
  const prompt = `You are an expert resume writer and career strategist. Generate a complete, ATS-optimized professional resume for the following job description and candidate information.

Job Description:
${jobDescription}

Candidate Info:
- Name: ${userInfo.fullName || 'John Doe'}
- Current Role: ${userInfo.currentRole || 'Professional'}
- Years of Experience: ${userInfo.yearsExp || '3+'}

Generate a complete, realistic, and highly professional resume. Use strong action verbs, quantify achievements, and ensure ATS compatibility.

Return a JSON object with this exact structure:
{
  "personalInfo": {
    "fullName": "${userInfo.fullName || 'Professional Name'}",
    "headline": "Professional headline matching the job",
    "email": "${userInfo.email || 'email@example.com'}",
    "phone": "+1 (555) 000-0000",
    "location": "City, State",
    "linkedin": "linkedin.com/in/username",
    "github": "github.com/username",
    "portfolio": "portfolio.dev"
  },
  "summary": "A compelling 3-sentence professional summary that directly addresses the job requirements and showcases unique value",
  "experience": [
    {
      "company": "Company Name",
      "role": "Job Title",
      "duration": "Jan 2022 - Present",
      "highlights": [
        "Achievement 1 with metrics (e.g., Increased revenue by 30%)",
        "Achievement 2 with impact",
        "Achievement 3 with scope"
      ]
    }
  ],
  "education": [
    {
      "institution": "University Name",
      "degree": "Bachelor of Science in Computer Science",
      "year": "2021"
    }
  ],
  "skills": ["Skill 1", "Skill 2", "Skill 3", "Skill 4", "Skill 5", "Skill 6", "Skill 7", "Skill 8"],
  "projects": [
    {
      "name": "Relevant Project",
      "description": "Impact-driven project description with technologies used and outcomes",
      "link": "github.com/username/project"
    }
  ],
  "certifications": ["Certification 1", "Certification 2"],
  "languages": ["English (Native)", "Spanish (Conversational)"]
}`;

  return await callGemini(prompt);
}

// ─── ATS Score Check ──────────────────────────────────────────────────────────
/**
 * Analyzes resume content against a job description for ATS compatibility.
 */
async function checkATS(resumeContent, jobDescription) {
  const prompt = `You are an ATS (Applicant Tracking System) expert. Analyze this resume against the job description and provide a detailed ATS compatibility report.

Resume Content:
${JSON.stringify(resumeContent, null, 2)}

Job Description:
${jobDescription || 'General professional position'}

Analyze keyword matching, formatting, content quality, and ATS compatibility. Be thorough and specific.

Return a JSON object with this exact structure:
{
  "atsScore": 78,
  "keywordMatchPercentage": 72,
  "matchedKeywords": ["keyword1", "keyword2", "keyword3"],
  "missingKeywords": ["keyword4", "keyword5"],
  "improvements": [
    "Specific improvement 1",
    "Specific improvement 2",
    "Specific improvement 3"
  ],
  "overallFeedback": "Overall assessment in 2-3 sentences",
  "sectionScores": {
    "summary": 80,
    "experience": 85,
    "skills": 70,
    "education": 90
  }
}`;

  return await callGemini(prompt);
}

module.exports = { improveContent, generateResume, checkATS };
