import express from "express";
import connect from "./config/db.js";
import dotenv from "dotenv";
import router from "./routes/productroutes.js";
import userRouter from "./routes/userroutes.js";
dotenv.config();

const app = express();

app.use("/data", router);
app.use("/users", userRouter);

connect();

app.listen(process.env.PORT, () => {
  console.log("connect");
});
