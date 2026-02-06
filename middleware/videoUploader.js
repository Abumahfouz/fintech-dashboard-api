const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads'); // Ensure this directory exists
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-vid-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const filetypes = ['mp4', 'mov', 'mkv', 'avi', '3gp'];
  const extname = filetypes.includes(
    path.extname(file.originalname).toLowerCase().substring(1)
  );
  const sizeLimit = 20 * 1024 * 1024; // 20MB
  const mimetype = filetypes.includes(file.mimetype.split('/')[1]);
  if (file.size > sizeLimit) {
    return cb(new Error('File size exceeds 20MB limit'));
  }
  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only mp4, mov, mkv, avi, 3gp files are allowed'));
  }
};

const videoUploader = multer({
  storage,
  fileFilter
});

module.exports = { videoUploader };