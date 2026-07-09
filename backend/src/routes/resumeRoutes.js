const express = require('express');
const {
  getUserResumes,
  getResumeById,
  createResume,
  updateResume,
  deleteResume,
} = require('../controllers/resumeController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// All resume routes require authentication
router.use(authMiddleware);

router.get('/', getUserResumes);
router.get('/:id', getResumeById);
router.post('/', createResume);
router.put('/:id', updateResume);
router.delete('/:id', deleteResume);

module.exports = router;
