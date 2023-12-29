const authService = require('@services/authService');
const multer = require('multer');
const { registerValidator, getUserValidator, updateUserValidator, uploadFile } = require('@validators/authValidator');

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
  // await uploadImageValidator.validateAsync({ ...req.body, ...req.file });
  try {
    // Validate the file metadata
    // await fileSchema.validateAsync({
    //   originalname: req.file.originalname,
    //   mimetype: req.file.mimetype,
    //   size: req.file.size
    // });

    const url = await authService.uploadFile(req.file, req.body.userId);
    res.status(200).json({ url });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  register,
  getUser,
  updateUser,
  uploadImage,
  upload,
};