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
  whatsappNumber: { type: String, required: true },
  coming: { type: Boolean, required: true },
  startingFrom: { type: String, required: true, enum: ['Ningala', 'Talaja'] },
  profilePic: { type: String }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;