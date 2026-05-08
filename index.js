import express from 'express';
import multer from 'multer';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

app.post('/upload', upload.single('media'), async (req, res) => {
  try {
    const { caption, platforms } = req.body;
    const file = req.file;

    console.log('Upload received');
    console.log('Caption:', caption);
    console.log('Platforms:', platforms);
    console.log('File:', file?.originalname);

    return res.json({ success: true, message: 'Upload received' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(3000, () => console.log('Backend running on port 3000'));

