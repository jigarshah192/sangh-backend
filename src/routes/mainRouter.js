const express = require('express');
const mainRouter = express.Router();

const authRoutes = require('@routes/authRoutes.js');

mainRouter.use('/auth', authRoutes);

module.exports = mainRouter;