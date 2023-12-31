const Joi = require('joi');

const registerValidator = Joi.object({
  name: Joi.string().required(),
  whatsappNumber: Joi.string().pattern(/^[6-9]\d{9}$/).required(), // Indian mobile number validation
  coming: Joi.boolean().required(),
  startingFrom: Joi.string().valid('Ningala', 'Talaja').required(),
  familyNumber: Joi.number().required(),
});

const getUserValidator = Joi.object({
  id: Joi.string().required(),
});

const updateUserValidator = Joi.object({
  id: Joi.string().required(),
  address: Joi.string().required(),
  city: Joi.string().valid('Bhavnagar', 'Ahmedabad', 'Surat', 'Mumbai', 'Vadodara').required(),
  gender: Joi.string().valid('Male', 'Female').required(),
  tapashcharya: Joi.string().optional(),
  charriProblem: Joi.string().required(),
  which: Joi.string().optional(),
  photoCopyType: Joi.string().required(),
  profilePic: Joi.string().optional(),
  aadharCopyType: Joi.string().required(),
  aadharNo: Joi.string(),
  age: Joi.number().required(),
  medicalIssue: Joi.string().optional(),
  alternateMobile: Joi.string().optional(),
});

const uploadImageValidator = Joi.object({
  fileName: Joi.string().required(),
  fileType: Joi.string().required()
});

module.exports = {
  registerValidator,
  getUserValidator,
  updateUserValidator,
  uploadImageValidator
};