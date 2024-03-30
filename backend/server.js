import express from "express";
import connect from "./config/db.js";
import dotenv from "dotenv";
import cookieparser from "cookie-parser";
import router from "./routes/productroutes.js";
import userRouter from "./routes/userroutes.js";
import orderRouter from "./routes/orderRout.js"

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieparser());
app.use(express.urlencoded({ extended: true }));
app.use("/data", router);
app.use("/users", userRouter);
app.use("/orders", orderRouter);

connect();

app.listen(process.env.PORT, () => {
  console.log("connect");
});
