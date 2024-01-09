const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const axios = require('axios');
const FormData = require('form-data');

const s3 = new S3Client(
  {
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
});

const User = require('@models/userModel');

const register = async (userData) => {
  userData.onhold = true;
  const user = new User(userData);
  return await user.save();
};

const getUser = async (id) => {
  return await User.findById(id);
};

const updateUser = async (userData) => {
  const user = await User.findById(userData.id);
  if (!user) {
    return null;
  }
  user.address = userData.address;
  user.city = userData.city;
  user.gender = userData.gender;
  user.tapashcharya = userData.tapashcharya;
  user.charriProblem = userData.charriProblem;
  user.which = userData.which;
  user.aadharNo = userData.aadharNo;
  user.profilePic = userData.profilePic;
  user.medicalIssue = userData.medicalIssue;
  user.age = userData.age;
  user.photoCopyType = userData.photoCopyType;
  user.aadharCopyType = userData.aadharCopyType;
  return await user.save();
};

const uploadFile = async (fileName, fileType) => {
  const putParams = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: fileName,
    // Body: file.buffer,
    ContentType: fileType,
    // ACL: 'public-read',
  };
  const command = new PutObjectCommand(putParams);
  return getSignedUrl(s3, command, { expiresIn: 3600 });
}

const sendWhatsAppMessage = async ({ templateId, variables }) => {
  const users = await User.find({coming: true});
  console.log('users', users.length);
  for (const user of users) {
    const variables = [user.name, user._id.toString()];
    // console.log("test", user.whatsappNumber, user.name, user._id.toString());
    await sendMessage(user.whatsappNumber, templateId, variables);
  }
  return {};
}

const sendMessage = async (phoneNumber, templateId, variables) => {
  const form = new FormData();
  form.append('appkey', process.env.WHATSAPP_APP_KEY);
  form.append('authkey', process.env.WHATSAPP_AUTH_KEY);
  form.append('to', phoneNumber);
  form.append('template_id', templateId);
  form.append('variables[{1}]', variables[0]);
  form.append('variables[{2}]', variables[1]);

  console.log('Form:', form);

  try {
      // Send the request
      const response = await axios.post(`${process.env.WHATSAPP_APP_URL}/api/create-message`, form, {
          headers: form.getHeaders()
      });

      console.log('Response:', response.data);
  } catch (error) {
      console.error('Error:', error);
  }
}

const getUsers = async () => {
  try {
    const users = await User.find({});
    return users;
  } catch (err) {
    throw err;
  }
};


module.exports = {
  register,
  getUser,
  updateUser,
  uploadFile,
  sendWhatsAppMessage,
  getUsers
};
