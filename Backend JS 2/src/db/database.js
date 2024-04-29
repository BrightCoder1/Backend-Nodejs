// const mongoose = require("mongoose");
import mongoose from "mongoose";
const URL = "mongodb://127.0.0.1:27017/testBackend";

const connectDB = async ()=>{
    try {
        await mongoose.connect(URL);
        console.log("DONE DB");
    } catch (error) {
        console.log("DB error:",error);
        process.exit(1);
    }
}

export default connectDB;