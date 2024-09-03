import mongoose, { ConnectOptions } from 'mongoose';
import path from 'path';
import dotenv from 'dotenv';
import fs from 'fs';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') }); 

// Construct the absolute path to the global-bundle.pem file
const tlsCAFilePath = path.resolve(__dirname, '../global-bundle.pem');

// MongoDB connection string with reference to the certificate file
const connectDB = async (): Promise<void> => {
  try {
    if (mongoose.connection.readyState === 0) {
      const dbUrl = process.env.DB_URL;
      if (!dbUrl) {
        throw new Error('DB_URL is not set in environment variables');
      }

      const options: ConnectOptions = {
        tlsCAFile: tlsCAFilePath, // Use the PEM file for TLS
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,  // Optional: Increase if needed
        connectTimeoutMS: 10000,         // Optional: Increase if needed
        directConnection: true,
      };

      await mongoose.connect(dbUrl, options);
      console.log('Connected to DocumentDB');
    } else {
      console.log('Already connected to DocumentDB');
    }
  } catch (err) {
    console.error('Error connecting to DocumentDB:', err);
  }
};

export default connectDB;
