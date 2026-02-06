const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directory exists
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    try {
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      cb(null, uploadDir);
    } catch (err) {
      console.error('Error creating upload directory:', err);
      cb(new Error('Failed to create upload directory'));
    }
  },
  filename: function (req, file, cb) {
    try {
      if (!file.originalname) {
        return cb(new Error('Original filename is missing'));
      }
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = path.extname(file.originalname);
      const filename = uniqueSuffix + ext;
      cb(null, filename);
    } catch (err) {
      console.error('Error generating filename:', err);
      cb(new Error('Failed to generate filename'));
    }
  }
});

const fileFilter = (req, file, cb) => {
  try {
    // Validate file object
    if (!file) {
      return cb(new Error('File object is missing'));
    }

    if (!file.originalname) {
      return cb(new Error('File name is missing'));
    }

    if (!file.mimetype) {
      return cb(new Error('File MIME type is missing'));
    }

    if (file.size === undefined) {
      return cb(new Error('File size information is missing'));
    }

    const allowedMimetypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    const allowedExtensions = ['jpeg', 'jpg', 'png', 'pdf'];
    
    // Validate file size (5MB limit)
    const sizeLimit = 5 * 1024 * 1024;
    if (file.size > sizeLimit) {
      return cb(new Error('File size exceeds 5MB limit'));
    }

    // Validate file size is not zero
    if (file.size === 0) {
      return cb(new Error('File is empty'));
    }

    // Get file extension
    const ext = path.extname(file.originalname).toLowerCase().substring(1);
    
    // Validate extension
    if (!allowedExtensions.includes(ext)) {
      return cb(new Error(`Invalid file extension. Allowed: ${allowedExtensions.join(', ')}`));
    }

    // Validate MIME type
    if (!allowedMimetypes.includes(file.mimetype)) {
      return cb(new Error(`Invalid file type. Allowed: ${allowedMimetypes.join(', ')}`));
    }

    // All validations passed
    cb(null, true);
  } catch (err) {
    console.error('Error in file filter:', err);
    cb(new Error('File validation failed'));
  }
};

// Create multer instance with error handling
const imageUploader = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
    files: 1 // Only allow single file upload
  }
});

module.exports = { imageUploader };