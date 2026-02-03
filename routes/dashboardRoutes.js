const dashboardController = require('../controllers/dashboardController');
const express = require('express');
const router = express.Router();

router.get('/summary', dashboardController.getDashboardSummary);

module.exports = router;