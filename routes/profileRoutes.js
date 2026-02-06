const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/authMiddleware');
const {imageUploader} = require('../middleware/imageUploader');
const { uploadProfileImage } = require('../controllers/profileController');

router.post('/', protect, imageUploader.single('profileImage'), uploadProfileImage);


module.exports = router;