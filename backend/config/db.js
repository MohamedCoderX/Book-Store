import mongoose from "mongoose";



export const connectDb = async()=>{
    const uri = process.env.MONGO_URI;
    try{
        await mongoose.connect(uri);
        console.log("MongoDB connected successfully");
    }catch(err){
        console.error("MongoDB connection error:", err);
        
    }
}