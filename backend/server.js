import path from "path";
import express from "express";
import connect from "./config/db.js";
import { dirname } from "path";
import { fileURLToPath } from "url";

import dotenv from "dotenv";
import cookieparser from "cookie-parser";
import router from "./routes/productroutes.js";
import userRouter from "./routes/userroutes.js";
import orderRouter from "./routes/orderRout.js";
import uploader from "./routes/uploadRout.js";
import cors from "cors";
dotenv.config();
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
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

app.use(express.static(path.join(__dirname, "..", "/frontend/dist")));

app.use("/uploads", express.static(path.join(__dirname, "..", "/upload")));

connect();
app.get("*", (req, res) => {
  if (process.env.ENVIRENMENT !== "development") {
    res.sendFile(
      path.join(path.join(__dirname, "..", "/frontend/dist/index.html"))
    );
  }
});

app.listen(process.env.PORT, () => {
  console.log("connect");
});
