import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
async function connectDB() {
  try {
   
    await mongoose.connect(`${process.env.MONGO_URI}`);
    console.log("Connecting to:", process.env.MONGO_URI);
    console.log("MongoDB connected......");
  } catch (error) {
    console.error(`${error.message}`);
    process.exit(1);
  }
}
export default connectDB;