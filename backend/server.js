import express from "express";
import connect from "./config/db.js";
import dotenv from "dotenv";
import products from "./data/products.js";

dotenv.config();
const app = express();

app.get("/data", (req, res) => {
  res.json(products);
});

app.get("/data/:id", (req, res) => {
  const params = req.params.id;
  const finder = products.find((item) => item._id === params);
  res.json(finder);
});

connect();

app.listen(process.env.PORT, () => {
  console.log("connect");
});
