// ===============================
// IMPORTS
// ===============================
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

// ===============================
// APP SETUP
// ===============================
const app = express();
app.use(cors());
app.use(express.json());

// ===============================
// FILE UPLOAD SETUP
// ===============================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // local folder
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// ===============================
// HEALTH CHECK ROUTE
// ===============================
app.get('/', (req, res) => {
  res.json({ status: 'ReelSync backend is live!' });
});

// ===============================
// UPLOAD ROUTE
// ===============================
app.post('/upload', upload.single('video'), (req, res) => {
  console.log('--- New Upload Received ---');
  console.log('Caption:', req.body.caption);
  console.log('Platforms:', req.body.platforms);
  console.log('File:', req.file);

  res.json({
    message: 'Upload received successfully',
    file: req.file,
    caption: req.body.caption,
    platforms: req.body.platforms
  });
});

// ===============================
// START SERVER (REQUIRED FOR RENDER)
// ===============================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`ReelSync backend running on port ${PORT}`);
});
