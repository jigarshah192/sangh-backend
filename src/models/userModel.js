const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String },
  city: { type: String, enum: ['Bhavnagar', 'Ahmedabad', 'Surat', 'Mumbai', 'Vadodara'] },
  gender: { type: String, enum: ['male', 'female'] },
  tapashcharya: { type: String },
  charriProblem: { type: String },
  which: { type: String },
  aadharNo: { type: String },
  whatsappNumber: { type: String, required: true },
  coming: { type: Boolean, required: true },
  startingFrom: { type: String, required: true, enum: ['Ningala', 'Talaja'] },
  profilePic: { type: String },
  medicalIssue: { type: String },
  age: { type: Number, required: true, min: 1, max: 100 },
  photoCopyType: { type: String, required: true },
  aadharCopyType: { type: String, required: true },
  medicalIssue: { type: String },
  alternateMobile: { type: String },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;