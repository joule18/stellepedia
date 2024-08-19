import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to database.");
  } catch (error) {
    console.error("Error connecting to database " + error);
    process.exit(1);
  }
};
export default connectDB;
