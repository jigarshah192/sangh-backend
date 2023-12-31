const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String },
  city: { type: String, enum: ['Bhavnagar', 'Ahmedabad', 'Surat', 'Mumbai', 'Vadodara'] },
  gender: { type: String, enum: ['Male', 'Female'] },
  tapashcharya: { type: String },
  charriProblem: { type: String },
  which: { type: String },
  aadharNo: { type: String },
  whatsappNumber: { type: String },
  coming: { type: Boolean },
  startingFrom: { type: String, enum: ['Ningala', 'Talaja'] },
  profilePic: { type: String },
  medicalIssue: { type: String },
  age: { type: Number, min: 1, max: 100 },
  photoCopyType: { type: String },
  aadharCopyType: { type: String },
  medicalIssue: { type: String },
  alternateMobile: { type: String },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;