import mongoose from 'mongoose';
import config from '../config/env_config.js';

const connectDB = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(config.DB_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log('MongoDB disconnected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export { connectDB, disconnectDB };
