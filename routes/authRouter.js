import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/authController.js";
import {
  validate,
  registerValidationRules,
  loginValidationRules,
} from "../validators/validators.js";

const router = Router();

router.post("/register", registerValidationRules(), validate, registerUser);
router.post("/login", loginValidationRules(), validate, loginUser);
router.get("/logout", logoutUser);

export default router;
