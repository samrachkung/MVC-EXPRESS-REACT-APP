import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

export const connectDB = async () => {
    const uri = process.env.MONGO_URI;

    if (!uri) {
        console.error("MongoDB URI is undefined. Check your environment variables.");
        process.exit(1); // Exit the process with failure code
    }

    try {
        await mongoose.connect(uri);
        console.log("huj database connect hx ot error te !!");
    } catch (error) {
        console.error("Error connecting to the database:", error.message);
        process.exit(1); // Exit the process with failure code
    }
};
