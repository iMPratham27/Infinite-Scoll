import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

export const connectDB = async(): Promise<void> => {
    try{
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log("MongoDB is successfully connected!");

    }catch(err){
        console.error("Failed in MongoDB connection", err);
        process.exit(1);
    }
}