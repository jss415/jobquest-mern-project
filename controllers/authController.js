import { StatusCodes } from "http-status-codes";

import User from "../models/userModel.js";

import { UnauthenticatedError } from "../utils/customErrors.js";
import { hashPassword, comparePassword } from "../utils/passwordUtils.js";
import { createJWT } from "../utils/jwtUtils.js";
import sendEmail from "../utils/email.js";

export const registerUser = async (req, res) => {
  const isFirstAccount = (await User.countDocuments()) === 0;
  req.body.role = isFirstAccount ? "admin" : "user";
  const hashedPassword = await hashPassword(req.body.password);

  req.body.password = hashedPassword;
  req.body.passwordConfirm = undefined;

  const user = await User.create(req.body);

  const token = createJWT({ userId: user._id, role: user.role });

  const threeDays = 3 * 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + threeDays),
    secure: process.env.NODE_ENV === "production",
  });

  await sendEmail({
    email: user.email,
    firstName: user.name,
    subject: "Welcome to Job Quest!",
  });

  res.status(StatusCodes.CREATED).json({ user });
};

export const loginUser = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) throw new UnauthenticatedError("user does not exist");

  const isPasswordValid = await comparePassword(
    req.body.password,
    user.password
  );
  if (!isPasswordValid) throw new UnauthenticatedError("invalid credentials");

  const token = createJWT({ userId: user._id, role: user.role });

  const threeDays = 3 * 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + threeDays),
    secure: process.env.NODE_ENV === "production",
  });

  res.status(StatusCodes.OK).json({ status: "success" });
};

export const logoutUser = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ status: "success" });
};
