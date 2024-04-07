import mongoose from "mongoose";

import products from "./data/products.js";
import users from "./data/user.js";
import Product from "./models/productmodel.js";
import User from "./models/usermodel.js";
import Order from "./models/ordermodel.js";
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
const importdata = async () => {
  try {
    await Product.deleteMany();
    /*await User.deleteMany();
    await Order.deleteMany();
    const allusers = await User.create(users);
    const id = allusers[0]._id;
    const allproducts = products.map((item) => {
      return { ...item, user: id };
    });*/
    await Product.insertMany(products);
    console.log("inserted done");
    process.exit();
  } catch (err) {
    console.log(`the eroor is ${err}`);
    process.exit(1);
  }
};
const deletedata = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();
    await Order.deleteMany();

    console.log("delete done");
    process.exit();
  } catch (err) {
    console.log(`the eroor is ${err}`);
    process.exit(1);
  }
};
connect();

if (process.argv[2] === "-delete") {
  deletedata();
} else if (process.argv[2] === "-import") {
  importdata();
}
