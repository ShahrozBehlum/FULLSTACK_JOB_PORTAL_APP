import mongoose from "mongoose";
import { dbName } from "../../constants.js";
import asyncHandler from '../utils/asyncHandler.js'
import ApiError from '../utils/ApiError.js'

const dbConnect = asyncHandler(async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${dbName}`)
        console.log(`MongoDB connected: ${connectionInstance.connection.host}`
    );
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        throw new ApiError(500, "Database connection failed");
    }
});

export default dbConnect;