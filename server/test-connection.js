import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

const testConnection = async () => {
    try {
        console.log('Attempting to connect to MongoDB Atlas...');
        console.log('Using URI:', process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Successfully connected to MongoDB Atlas!');
        
        // Test a simple operation
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('Available collections:', collections.map(c => c.name));
        
        await mongoose.connection.close();
        console.log('Connection closed');
    } catch (error) {
        console.error('Connection error:', error);
    } finally {
        process.exit();
    }
};

testConnection(); 