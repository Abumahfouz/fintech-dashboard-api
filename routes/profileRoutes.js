const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/authMiddleware');
const {fileUploader} = require('../middleware/fileUploader');
const { uploadProfileImage } = require('../controllers/profileController');

router.post('/', protect, fileUploader.single('profileImage'), uploadProfileImage);

module.exports = router;