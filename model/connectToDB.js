import mongoose from "mongoose";

export async function connectDB(url) {
    try {
        await mongoose.connect(url);
        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        process.exit(1);
    }
}