import { Router } from "express";
import mongoose from "mongoose";
import {
  jobValidationRules,
  validate,
  validateIdParam,
} from "../validators/validators.js";

import {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
  getAllUserJobs,
} from "../controllers/jobController.js";

const router = Router();

router
  .route("/")
  .get(getAllJobs)
  .post(jobValidationRules(), validate, createJob);

router.route("/user-jobs").get(getAllUserJobs);

router
  .route("/:id")
  .get(validateIdParam(), validate, getJob)
  .patch(jobValidationRules(), validate, updateJob)
  .delete(deleteJob);

export default router;
