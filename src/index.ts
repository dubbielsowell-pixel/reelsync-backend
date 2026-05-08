import express, { Request, Response } from 'express';
import multer from 'multer';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Multer handles media uploads in memory
const upload = multer({ storage: multer.memoryStorage() });

interface UploadRequest extends Request {
  body: {
    caption: string;
    platforms: string;
  };
  file?: Express.Multer.File;
}

app.post('/upload', upload.single('media'), async (req: UploadRequest, res: Response) => {
  try {
    const { caption, platforms } = req.body;
    const file = req.file;

    console.log('--- Upload Received ---');
    console.log('Caption:', caption);
    console.log('Platforms:', platforms);
    console.log('File:', file?.originalname);

    // TODO: TikTok API upload
    // TODO: Instagram Reels API upload
    // TODO: YouTube Shorts API upload
    // TODO: Facebook Reels API upload

    return res.json({
      success: true,
      message: 'Upload received',
      fileName: file?.originalname,
    });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(3000, () => {
  console.log('ReelSync backend running on port 3000');
});
