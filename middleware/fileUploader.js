const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads'); // Ensure this directory exists
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const filetypes = ['jpeg', 'jpg', 'png', 'pdf'];
  const extname = filetypes.includes(
    path.extname(file.originalname).toLowerCase().substring(1)
  );
  const mimetype = filetypes.includes(file.mimetype.split('/')[1]);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only jpeg, jpg, png, pdf files are allowed'));
  }
};

const fileUploader = multer({
  storage,
  fileFilter
});

module.exports = { fileUploader };