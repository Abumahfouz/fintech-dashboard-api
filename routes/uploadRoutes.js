const express = require ('express');
const router = express.Router();
const { uploadImageFile } = require('../controllers/imageUploadController');
const { uploadVideoFile } = require('../controllers/videoUploadController');
const { protect } = require('../middleware/authMiddleware');
const { imageUploader } = require('../middleware/imageUploader');
const {videoUploader} = require('../middleware/videoUploader');

// route for uploading image files
router.post('/upload-image', protect, imageUploader.single('image'), uploadImageFile);

// route for uploading video files
router.post('/upload-video', protect, videoUploader.single('video'), uploadVideoFile);

module.exports = router;