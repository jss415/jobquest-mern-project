import { Router } from "express";

import { getCheckoutSession } from "../controllers/paymentController.js";

const router = Router();

router.post("/checkout-session", getCheckoutSession);

export default router;
