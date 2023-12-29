const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const authController = require('@controllers/authController');

router.post('/register', authController.register);
router.get('/user/:id', authController.getUser);
router.put('/user', authController.updateUser);
router.post('/upload-image', upload.single('file'), authController.uploadImage);

module.exports = router;
