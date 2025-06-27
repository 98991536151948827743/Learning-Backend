import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import { connectToIndexDB, dbConnection } from './src/Db/IndexDB.js';
import { DB_NAME } from './src/Constants.js';

const app = express();
app.use(cors());

// await connectToIndexDB();

// console.log("Mongoose state:", mongoose.connection.readyState);
// console.log("Custom DB Connection:", dbConnection.connection.readyState);





(async () => {
  try {
    const uri = process.env.MONGO_URI;
    console.log("Connecting to MongoDB..." + uri);

    if (!uri) {
      throw new Error("MONGODB_URI is not defined in .env file.");
    }

    await mongoose.connect(uri);
    console.log("✅ Connected to MongoDB");

  } catch (err) {
    console.error("❌ Error connecting to MongoDB:", err);
  }
})();