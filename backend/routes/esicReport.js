const express = require('express');
const router = express.Router();
const { generateEsicReport } = require('../controllers/dashboard');
const validateToken = require('../middleware/validateTokenHandler');

// @desc Generate ESIC Challan Excel Report
// @route GET /api/v1/esic-report
// @access Private: Needs Login
router.get('/', validateToken, generateEsicReport);

module.exports = router;
