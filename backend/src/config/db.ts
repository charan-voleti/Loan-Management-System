import mongoose from "mongoose";

const connectDB = async () => {
    console.log("connecting to db")
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("MongoDB Connected");
  } catch (error) {
    console.log("DB Error", error);
    process.exit(1);
  }
};

export default connectDB;