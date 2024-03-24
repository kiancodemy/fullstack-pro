import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.ADDRESS);
    console.log("mongoose connected");
  } catch (err) {
    console.log(`the error is ${err}`);
  }
};

export default connect;
