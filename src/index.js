import mongoose from 'mongoose';
import { DB_NAME } from './Constants';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
dotenv.config();

const app = express();
app.use(cors());


(async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI||`mongodb://localhost:27017/${DB_NAME}`, { 
        });
        app.on('error', (err) => {
            console.error('MongoDB connection error:', err);
            throw err;
        });
        console.log('Connected to MongoDB');
        app.listen(process.env.PORT || 3000, () => {
            console.log(`Server is running on port ${process.env.PORT || 3000}`);
        }); 
    
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
})()