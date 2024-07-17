import { Router } from "express";
const router = Router();

import {
  getCurrentUser,
  getApplicationStats,
  updateUser,
  followJob,
  unfollowJob,
  getFollowedJobs,
} from "../controllers/userController.js";

import upload from "../middlewares/uploadAvatar.js";

router.get("/current-user", getCurrentUser);
router.get("/admin/app-stats", getApplicationStats);
router.patch("/update-user", upload.single("avatar"), updateUser);
router.post("/follow/:jobId", followJob);
router.post("/unfollow/:jobId", unfollowJob);
router.get("/getFollowedJobs", getFollowedJobs);
export default router;
