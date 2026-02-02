const express = require('express');
const router = express.Router();
const {createTransaction} = transactionController;
const {protect} = require('../middleware/authMiddleware');

// Create transaction route
router.post('/', protect, createTransaction);


module.exports = router;