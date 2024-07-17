import { body, validationResult, param } from "express-validator";
import mongoose from "mongoose";

import Job from "../models/jobModel.js";
import User from "../models/userModel.js";

import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../utils/customErrors.js";

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const errorMessages = errors.array().map((error) => error.msg);
  if (errorMessages[0].startsWith("no job")) {
    throw new NotFoundError(errorMessages);
  }

  if (errorMessages[0].startsWith("not authorized")) {
    throw new UnauthorizedError("not authorized to access this route");
  }

  throw new BadRequestError(errorMessages);
};

export const jobValidationRules = () => {
  return [
    body("company").notEmpty().withMessage("company is required"),
    body("position").notEmpty().withMessage("position is required"),
    body("jobLocation").notEmpty().withMessage("job location is required"),
    body("jobStatus")
      .isIn(Object.values(JOB_STATUS))
      .withMessage("invalid status value"),
    body("jobType")
      .isIn(Object.values(JOB_TYPE))
      .withMessage("invalid job type"),
  ];
};

export const validateIdParam = () => {
  return [
    param("id").custom(async (value, { req }) => {
      const isValidId = mongoose.Types.ObjectId.isValid(value);
      if (!isValidId) throw new BadRequestError("invalid MongoDB id");
      const job = await Job.findById(value);
      if (!job) throw new NotFoundError(`no job with id : ${value}`);
      const isAdmin = req.user.role === "admin";
      const isOwner = req.user.userId === job.createdBy.toString();
      if (!isAdmin && !isOwner)
        throw new UnauthorizedError("not authorized to access this route");
    }),
  ];
};

export const registerValidationRules = () => {
  return [
    body("name").notEmpty().withMessage("name is required"),
    body("email")
      .notEmpty()
      .withMessage("email is required")
      .isEmail()
      .withMessage("invalid email format")
      .trim()
      .custom(async (email) => {
        const user = await User.findOne({ email });
        if (user) {
          throw new BadRequestError("email already exists");
        }
      }),
    body("password")
      .notEmpty()
      .trim()
      .withMessage("password is required")
      .isLength({ min: 5 })
      .withMessage("password must be at least 5 characters long"),
    body("passwordConfirm")
      .notEmpty()
      .withMessage("passwordConfirm is required")
      .isLength({ min: 5 })
      .withMessage("passwordConfirm must be at least 5 characters long")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new BadRequestError("passwords do not match");
        }
        return true;
      }),
    body("location").notEmpty().withMessage("location is required"),
    body("lastName").notEmpty().withMessage("last name is required"),
  ];
};

export const loginValidationRules = () => {
  return [
    body("email")
      .notEmpty()
      .withMessage("email is required")
      .isEmail()
      .withMessage("invalid email format"),
    body("password").notEmpty().withMessage("password is required"),
  ];
};

export const updateValidationRules = () => {
  return [
    body("name").notEmpty().withMessage("name is required"),
    body("email")
      .notEmpty()
      .withMessage("email is required")
      .isEmail()
      .withMessage("invalid email format")
      .custom(async (email, { req }) => {
        const user = await User.findOne({ email });
        if (user && user._id.toString() !== req.user.userId) {
          throw new Error("email already exists");
        }
      }),
    body("lastName").notEmpty().withMessage("last name is required"),
    body("location").notEmpty().withMessage("location is required"),
  ];
};
