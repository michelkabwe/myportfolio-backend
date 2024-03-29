const express = require('express');
const router = express.Router();
const multer = require('multer');
const admin = require('firebase-admin');

const bucket = admin.storage().bucket();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(200).json({
        message: 'No file uploaded',
        imageUrl: null // You can set it to null or any default value you prefer
      });
    }

    const uploadedFile = req.file;
    const destination = bucket.file(`images/${uploadedFile.originalname}`);

    // Ensure you're passing the file buffer directly to the Firebase bucket upload
    await destination.save(uploadedFile.buffer, {
      metadata: {
        contentType: uploadedFile.mimetype,
      },
    });

    const expirationDate = new Date('2100-01-01T00:00:00Z');

    const [downloadUrl] = await destination.getSignedUrl({
      action: 'read',
      expires: expirationDate,


    });

    res.status(200).json({
      message: 'File uploaded successfully',
      imageUrl: downloadUrl
    });

    // Send a success response
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error uploading file:', error);
    return res.status(500).send('Error uploading file.');
  }
});


module.exports = router;
