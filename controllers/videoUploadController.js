const User = require('../models/userModel');

// @route   POST /api/profile/upload-video
// @desc    upload video
// @access  Private
const uploadVideoFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        console.log('user request:', req.user);
        const user = await User.findById(req.user.userId);
        if (!user) {
            console.error('User not found for ID:', req.user.userId);
            return res.status(404).json({ message: 'User not found' });
        }
        const existingVideos = user.videos || [];
        const updatedVideos = [...existingVideos, req.file.path];
        await User.findByIdAndUpdate(
            req.user.userId, 
            { videos: updatedVideos }, 
            { new: true }
        );
        res.json({ message: 'Video uploaded successfully', video: updatedVideos });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { uploadVideoFile };