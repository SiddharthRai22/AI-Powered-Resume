import api from './api';

export const aiService = {
  /**
   * Improve a specific resume section using AI.
   * @param {string} text - Original content
   * @param {'summary'|'bullets'|'skills'|'general'} type - Section type
   * @param {string} [context] - Additional context
   */
  improve: (text, type, context = '') =>
    api.post('/ai/improve', { text, type, context }).then((r) => r.data),

  /**
   * Generate a complete resume from a job description.
   * @param {string} jobDescription
   * @param {object} userInfo - { fullName, email, currentRole, yearsExp }
   */
  generate: (jobDescription, userInfo = {}) =>
    api.post('/ai/generate', { jobDescription, userInfo }).then((r) => r.data),

  /**
   * Check ATS compatibility of a resume against a job description.
   * @param {object} resumeContent
   * @param {string} [jobDescription]
   */
  atsCheck: (resumeContent, jobDescription = '') =>
    api.post('/ai/ats-check', { resumeContent, jobDescription }).then((r) => r.data),
};
