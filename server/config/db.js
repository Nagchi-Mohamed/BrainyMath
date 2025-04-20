// backend/config/db.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Load env vars

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', true); // Prepare for Mongoose 7 change
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
