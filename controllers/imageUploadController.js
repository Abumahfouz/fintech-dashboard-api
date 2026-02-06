const User = require('../models/userModel');

// @route   POST /api/profile/upload-image
// @desc    upload image
// @access  Private
const uploadImageFile = async (req, res) => {
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
        await User.findByIdAndUpdate(
            req.user.userId, 
            { profileImage: req.file.path }, 
            { new: true }
        );
        res.json({ message: 'Profile image uploaded successfully', profileImage: req.file.path });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { uploadImageFile };