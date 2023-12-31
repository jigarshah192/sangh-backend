const mongoose = require('mongoose');

const connectDatabase = async () => {
  try {
    console.log('Connecting to MongoDB...');
    const status = await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connection successful.');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
};

module.exports = connectDatabase;
