// src/middleware/file-upload.middleware.js
const multer = require('multer');
const path = require('path');

// Set up storage engine
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function(req, file, cb) {
        // Create a unique filename: fieldname-timestamp.extension
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Initialize upload variable
const upload = multer({
    storage: storage,
    limits: { fileSize: 10000000 }, // Limit file size to 10MB
    fileFilter: function(req, file, cb) {
        // You can add logic here to only allow certain file types
        cb(null, true);
    }
}).single('logFile'); // 'logFile' is the name of the form field for the file

module.exports = upload;