import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js";
import Job from "../models/jobModel.js";
import DatauriParser from "datauri/parser.js";
import path from "path";
import cloudinary from "cloudinary";
import sharp from "sharp";
import { BadRequestError, NotFoundError } from "../utils/customErrors.js";

export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId }).select("-password");

  res.status(StatusCodes.OK).json({ user });
};

export const getApplicationStats = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "application stats" });
};

export const updateUser = async (req, res) => {
  const newUser = { ...req.body };

  console.log("user", newUser);

  if (req.file) {
    const resizedImageBuffer = await sharp(req.file.buffer)
      .resize(100, 100)
      .toBuffer();

    const parser = new DatauriParser();
    const extName = path.extname(req.file.originalname).toString();
    const file64 = parser.format(extName, resizedImageBuffer);
    const response = await cloudinary.v2.uploader.upload(file64.content);
    newUser.avatar = response.secure_url;
    newUser.avatarPublicId = response.public_id;
  }

  const updatedUser = await User.findByIdAndUpdate(req.user.userId, newUser);

  if (req.file && updatedUser.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId);
  }

  res.status(StatusCodes.OK).json({ updatedUser });
};

export const followJob = async (req, res) => {
  const user = await User.findById(req.user.userId);
  const job = await Job.findById(req.params.jobId);

  console.log("user: ", user);
  console.log("job: ", job);

  if (!job || !user) {
    throw new NotFoundError(`Cannot find a job or user.`);
  }

  if (user.followedJobs.includes(job.id)) {
    return new BadRequestError(
      "You are already following this job. Try again."
    );
  }

  user.followedJobs.push(job.id);
  await user.save();

  res.status(200).json({ message: "Job followed successfully" });
};

export const unfollowJob = async (req, res) => {
  const user = await User.findById(req.user.userId);
  const job = await Job.findById(req.params.jobId);

  user.followedJobs = user.followedJobs.filter(
    (jobId) => jobId.toString() !== job.id.toString()
  );

  user.save();

  res.status(200).json({ message: "Job unfollowed successfully" });
};

export const getFollowedJobs = async (req, res) => {
  const userId = req.user.userId; // Assuming userId is passed as a parameter

  try {
    const user = await User.findById(userId).populate("followedJobs");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Extract followed jobs from user document
    const followedJobs = user.followedJobs;

    res.status(200).json({
      data: followedJobs,
      message: "success",
    });
  } catch (error) {
    console.error("Error fetching followed jobs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
