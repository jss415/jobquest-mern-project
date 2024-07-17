import { StatusCodes } from "http-status-codes";

import Application from "../models/applicationModel.js";
import User from "../models/userModel.js";
import Job from "../models/jobModel.js";

export const getAllApplications = async (req, res, next) => {
  try {
    const applications = await Application.find({});
    res.status(StatusCodes.OK).json({
      applications: applications,
    });
  } catch (error) {
    next(error);
  }
};

export const getApplication = async () => {
  try {
    const { id } = req.params;
    const application = await Application.findById(id);

    if (!application) {
      throw new NotFoundError(`Cannot find find with id ${id}`);
    }

    res.status(StatusCodes.OK).json({});
  } catch (error) {
    next(error);
  }
};

export const getAllApplicationsByUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);
    const applications = await Application.find({ user: user.id }).populate(
      "job"
    );

    if (!applications.length) {
      res.status(StatusCodes.OK).json({ data: [] });
    }

    const jobs = applications.map((application) => application.job);

    res.status(StatusCodes.OK).json({ data: jobs });
  } catch (error) {
    next(error);
  }
};

export const createApplication = async (req, res, next) => {
  const user = await User.findById(req.user.userId);
  const job = await Job.findById(req.params.jobId);

  if (!job || !user) {
    throw new NotFoundError(`Cannot find a job or user.`);
  }

  if (user.appliedJobs.includes(job.id)) {
    return new BadRequestError("You have already applied to this job.");
  }

  const application = await Application.create({
    user,
    job,
  });

  user.appliedJobs.push(application.id);
  await user.save();

  res.status(StatusCodes.OK).json({
    status: "success",
    application: application,
  });
};

export const deleteApplication = async (req, res, next) => {
  const user = await User.findById(req.user.userId);
  const job = await Job.findById(req.params.id);

  if (!user) {
    return new BadRequestError("Cannot find user!");
  }

  if (!job) {
    return new BadRequestError("Cannot find job!");
  }

  const application = await Application.findOne({
    user: user._id,
    job: job._id,
  });

  if (!application) {
    return next(new BadRequestError("Cannot find application!"));
  }

  await Application.deleteOne({ user: user._id, job: job._id });

  user.appliedJobs = user.appliedJobs.filter(
    (appId) => appId.toString() !== application._id.toString()
  );

  await user.save();

  res.status(200).json({});
};
