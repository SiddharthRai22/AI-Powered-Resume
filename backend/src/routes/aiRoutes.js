const express = require('express');
const { improveContent, generateResume, atsCheck } = require('../controllers/aiController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// All AI routes require authentication
router.use(authMiddleware);

router.post('/improve', improveContent);
router.post('/generate', generateResume);
router.post('/ats-check', atsCheck);

module.exports = router;
