import path from "path";
import express from "express";
import connect from "./config/db.js";

import dotenv from "dotenv";
import cookieparser from "cookie-parser";
import router from "./routes/productroutes.js";
import userRouter from "./routes/userroutes.js";
import orderRouter from "./routes/orderRout.js";
import uploader from "./routes/uploadRout.js";
dotenv.config();
const app = express();
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieparser());
app.use(express.urlencoded({ extended: true }));

app.use("/data", router);
app.use("/upload", uploader);
app.use("/users", userRouter);
app.use("/orders", orderRouter);
app.get("/config/paypal", async (req, res) => {
  res.send({ clientId: process.env.PAYPAL });
});
app.use("/uploads", express.static(__dirname + "/upload"));

connect();

app.listen(process.env.PORT, () => {
  console.log("connect");
});
