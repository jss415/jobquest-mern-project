import Job from "../models/jobModel.js";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../utils/customErrors.js";

export const getAllJobs = async (req, res, next) => {
  const { keyword, jobLocation, jobStatus, jobType, sort } = req.query;

  const queryObject = {};

  if (keyword) {
    queryObject.$or = [
      { position: { $regex: keyword, $options: "i" } },
      { company: { $regex: keyword, $options: "i" } },
    ];
  }

  if (jobLocation) {
    queryObject.jobLocation = { $regex: jobLocation, $options: "i" };
  }

  if (jobStatus && jobStatus !== "all") {
    queryObject.jobStatus = jobStatus;
  }
  if (jobType && jobType !== "all") {
    queryObject.jobType = jobType;
  }

  const sortOptions = {
    newest: "-createdAt",
    oldest: "createdAt",
    "a-z": "position",
    "z-a": "-position",
  };

  const sortKey = sortOptions[sort] || sortOptions.newest;

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const jobs = await Job.find(queryObject)
      .sort(sortKey)
      .skip(skip)
      .limit(limit)
      .populate({
        path: "createdBy",
        select: "email _id role name lastName avatar",
      });

    const totalJobs = await Job.countDocuments(queryObject);
    const numOfPages = Math.ceil(totalJobs / limit);

    res.status(StatusCodes.OK).json({
      totalJobs: totalJobs,
      jobs: jobs,
      numOfPages: numOfPages,
      currentPage: page,
      status: "success",
    });
  } catch (error) {
    console.error("Error fetching jobs: ", error);

    // Call the next middleware with the error to ensure the error handler catches it
    next(error);
  }
};

export const getAllUserJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find({ createdBy: req.user.userId });
    res
      .status(StatusCodes.OK)
      .json({ length: jobs.length, jobs: jobs, status: "success" });
  } catch (error) {
    console.error("Error fetching jobs: ", error);

    // Call the next middleware with the error to ensure the error handler catches it
    next(error);
  }
};

export const createJob = async (req, res, next) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.OK).json({
    status: "success",
    job: job,
  });
};

export const getJob = async (req, res, next) => {
  const { id } = req.params;
  const job = await Job.findById(id);
  if (!job) {
    throw new NotFoundError(`Cannot find find with id ${id}`);
  }
  res.status(200).json({ job });
};

export const updateJob = async (req, res, next) => {
  const { id } = req.params;

  const updatedJob = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!updatedJob) {
    throw new NotFoundError(`Cannot find find with id ${id}`);
  }

  res.status(200).json({ job: updatedJob });
};

export const deleteJob = async (req, res, next) => {
  const { id } = req.params;
  const job = await Job.findByIdAndDelete(id);

  if (!job) {
    throw new NotFoundError(`Cannot find find with id ${id}`);
  }
  res.status(200).json({
    job: job,
    status: "success",
  });
};
