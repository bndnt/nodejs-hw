import mongoose from 'mongoose';
export const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('✅ MongoDB connection established successfully');
  } catch (error) {
    console.log('Error connecting to DB', error);
    process.exit(1);
  }
};
