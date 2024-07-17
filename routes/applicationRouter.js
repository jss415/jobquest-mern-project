import { Router } from "express";
import {
  createApplication,
  deleteApplication,
  getAllApplications,
  getAllApplicationsByUser,
} from "../controllers/applicationController.js";

const router = Router();

router.route("/").get(getAllApplications);
router.get("/stats", getAllApplicationsByUser);
router.post("/apply/:jobId", createApplication);
router.post("/withdraw/:id", deleteApplication);

export default router;
