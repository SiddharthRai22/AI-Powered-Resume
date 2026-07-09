/**
 * Resume Controller — CRUD operations for resumes.
 */

const { resumes } = require('../models/dataStore');

// ─── GET /api/resumes ─────────────────────────────────────────────────────────
function getUserResumes(req, res, next) {
  try {
    const userResumes = resumes.findByUserId(req.user.id);
    // Return in reverse chronological order
    const sorted = [...userResumes].sort(
      (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
    );
    res.json(sorted);
  } catch (err) {
    next(err);
  }
}

// ─── GET /api/resumes/:id ─────────────────────────────────────────────────────
function getResumeById(req, res, next) {
  try {
    const resume = resumes.findById(req.params.id);
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found.' });
    }
    // Ensure user owns this resume
    if (resume.userId !== req.user.id) {
      return res.status(403).json({ message: 'Access denied.' });
    }
    res.json(resume);
  } catch (err) {
    next(err);
  }
}

// ─── POST /api/resumes ────────────────────────────────────────────────────────
function createResume(req, res, next) {
  try {
    const { title, templateId, content } = req.body;

    if (!title || !templateId) {
      return res.status(400).json({ message: 'Title and templateId are required.' });
    }

    const resume = resumes.create({
      userId: req.user.id,
      title,
      templateId,
      content: content || getEmptyContent(templateId),
    });

    res.status(201).json(resume);
  } catch (err) {
    next(err);
  }
}

// ─── PUT /api/resumes/:id ─────────────────────────────────────────────────────
function updateResume(req, res, next) {
  try {
    const existing = resumes.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({ message: 'Resume not found.' });
    }
    if (existing.userId !== req.user.id) {
      return res.status(403).json({ message: 'Access denied.' });
    }

    const { title, templateId, content } = req.body;
    const updated = resumes.update(req.params.id, {
      ...(title && { title }),
      ...(templateId && { templateId }),
      ...(content && { content }),
    });

    res.json(updated);
  } catch (err) {
    next(err);
  }
}

// ─── DELETE /api/resumes/:id ──────────────────────────────────────────────────
function deleteResume(req, res, next) {
  try {
    const existing = resumes.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({ message: 'Resume not found.' });
    }
    if (existing.userId !== req.user.id) {
      return res.status(403).json({ message: 'Access denied.' });
    }

    resumes.delete(req.params.id);
    res.json({ message: 'Resume deleted successfully.' });
  } catch (err) {
    next(err);
  }
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function getEmptyContent(templateId) {
  return {
    templateId,
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      headline: '',
      linkedin: '',
      github: '',
      portfolio: '',
    },
    summary: '',
    experience: [{ company: '', role: '', duration: '', highlights: [''] }],
    education: [{ institution: '', degree: '', year: '' }],
    skills: [],
    projects: [{ name: '', description: '', link: '' }],
    certifications: [],
    languages: [],
  };
}

module.exports = { getUserResumes, getResumeById, createResume, updateResume, deleteResume };
