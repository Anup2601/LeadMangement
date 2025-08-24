import mongoose from "mongoose";

export const connectDB= async ()=>{
    try{
        const conn= await mongoose.connect('mongodb://127.0.0.1/user');
        console.log('mongoose connected');
    }
    catch(error){
        console.log("MongoDB connection error", error)
    }
};