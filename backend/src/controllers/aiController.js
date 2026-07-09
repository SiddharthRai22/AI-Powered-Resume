/**
 * AI Controller — handles AI-powered resume operations.
 */

const aiService = require('../services/aiService');

// ─── POST /api/ai/improve ─────────────────────────────────────────────────────
async function improveContent(req, res, next) {
  try {
    const { text, type, context } = req.body;

    if (!text || !type) {
      return res.status(400).json({ message: 'Text and type are required.' });
    }

    const validTypes = ['summary', 'bullets', 'skills', 'general'];
    if (!validTypes.includes(type)) {
      return res.status(400).json({ message: `Type must be one of: ${validTypes.join(', ')}` });
    }

    const result = await aiService.improveContent(text, type, context);
    res.json(result);
  } catch (err) {
    console.error('[AI Improve Error]', err.message);
    // Return a graceful fallback if AI fails
    res.status(500).json({
      message: 'AI service temporarily unavailable. Please check your GROQ_API_KEY.',
      error: err.message,
    });
  }
}

// ─── POST /api/ai/generate ────────────────────────────────────────────────────
async function generateResume(req, res, next) {
  try {
    const { jobDescription, userInfo } = req.body;

    if (!jobDescription) {
      return res.status(400).json({ message: 'Job description is required.' });
    }

    const result = await aiService.generateResume(jobDescription, userInfo || {});
    res.json(result);
  } catch (err) {
    console.error('[AI Generate Error]', err.message);
    res.status(500).json({
      message: 'AI service temporarily unavailable. Please check your GROQ_API_KEY.',
      error: err.message,
    });
  }
}

// ─── POST /api/ai/ats-check ───────────────────────────────────────────────────
async function atsCheck(req, res, next) {
  try {
    const { resumeContent, jobDescription } = req.body;

    if (!resumeContent) {
      return res.status(400).json({ message: 'Resume content is required.' });
    }

    const result = await aiService.checkATS(resumeContent, jobDescription || '');
    res.json(result);
  } catch (err) {
    console.error('[ATS Check Error]', err.message);
    res.status(500).json({
      message: 'AI service temporarily unavailable. Please check your GROQ_API_KEY.',
      error: err.message,
    });
  }
}

module.exports = { improveContent, generateResume, atsCheck };
