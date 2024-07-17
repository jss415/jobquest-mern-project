import "express-async-errors";
import express from "express";
import * as dotenv from "dotenv";
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";

import jobRouter from "./routes/jobRouter.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import applicationRouter from "./routes/applicationRouter.js";
import paymentRouter from "./routes/paymentRouter.js";
import errorHandler from "./controllers/errorController.js";

import { authenticateUser } from "./middlewares/authentication.js";

dotenv.config();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(cookieParser());
app.use(express.json());
app.use("/api/v1/jobs", authenticateUser, jobRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", authenticateUser, userRouter);
app.use("/api/v1/applications", authenticateUser, applicationRouter);
app.use("/api/v1/payments", authenticateUser, paymentRouter);
app.get("/api/v1/test", (req, res) => {
  res.json({ msg: "test route" });
});

app.all("*", (req, res) => {
  res.status(404).json({
    msg: "Not found",
    status: "fail",
  });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(PORT, () => {
    console.log(`server running on PORT ${PORT}....`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
