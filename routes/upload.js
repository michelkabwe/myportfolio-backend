const express = require('express');
const router = express.Router();
const multer = require('multer');
const admin = require('firebase-admin');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/', upload.single('file'), async (req, res) => {
  try {
    const uploadedFile = req.file;
    if (!uploadedFile) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    const bucket = admin.storage().bucket();
    const fileRef = bucket.file(`images/${uploadedFile.originalname}`);

    await fileRef.setMetadata({ contentType: uploadedFile.mimetype });

    const fileStream = fileRef.createWriteStream({
      metadata: {
        contentType: uploadedFile.mimetype
      }
    });

    fileStream.on('error', (error) => {
      console.error('Error uploading file:', error);
      res.status(500).send('Internal Server Error');
    });

    fileStream.on('finish', async () => {
      try {
        // Get the download URL for the uploaded file
        const [downloadUrl] = await fileRef.getSignedUrl({
          action: 'read'
          //expires: '01-01-2025' // Set an expiration date for the URL if needed
        });

        res.status(200).json({
          message: 'File uploaded successfully',
          imageUrl: downloadUrl
        });
      } catch (error) {
        console.error('Error getting download URL:', error);
        res.status(500).send('Internal Server Error');
      }
    });

    fileStream.end(uploadedFile.buffer);
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
