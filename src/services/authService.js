const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const s3 = new S3Client(
  {
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const User = require('@models/userModel');

const register = async (userData) => {
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

module.exports = {
  register,
  getUser,
  updateUser,
  uploadFile,
};
