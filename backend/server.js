import express from "express";
import connect from "./config/db.js";
import dotenv from "dotenv";
import router from "./routes/productroutes.js";
dotenv.config();

const app = express();

app.use("/data", router);

connect();

app.listen(process.env.PORT, () => {
  console.log("connect");
});
