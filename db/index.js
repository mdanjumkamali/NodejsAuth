import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB Connected!!");
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDB;
