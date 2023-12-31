const authService = require('@services/authService');
const multer = require('multer');
const { registerValidator, getUserValidator, updateUserValidator, uploadImageValidator } = require('@validators/authValidator');
const { uploadFile} = require('@services/authService');
const upload = multer({ storage: multer.memoryStorage() });

const register = async (req, res) => {
  try {
    await registerValidator.validateAsync(req.body);

    const user = await authService.register(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    await getUserValidator.validateAsync(req.params);

    const user = await authService.getUser(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    await updateUserValidator.validateAsync(req.body);

    const user = await authService.updateUser(req.body);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const uploadImage = async (req, res) => {
  try {

    await uploadImageValidator.validateAsync(req.body)
  
    const {fileName, fileType} = req.body
    const path = `${fileName}.${fileType}`
    const preSignedUrl = await uploadFile(path, fileType);

    res.status(200).json({ preSignedUrl });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

const sendWhatsAppMessage = async (req, res) => {
  try {
    // await updateUserValidator.validateAsync(req.body);

    const response = await authService.sendWhatsAppMessage(req.body);
    return res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  register,
  getUser,
  updateUser,
  uploadImage,
  upload,
  sendWhatsAppMessage
};