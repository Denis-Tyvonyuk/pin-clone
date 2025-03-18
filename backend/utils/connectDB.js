import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("mongo db connect");
  } catch (err) {
    console.log("mongo error", err);
  }
};

export default connectDB;
