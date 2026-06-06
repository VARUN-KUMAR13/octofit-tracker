import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

export async function connectDatabase() {
  await mongoose.connect(mongoUri, {
    dbName: 'octofit_db'
  });
}

export { mongoose };
