import express from "express";
import { sendOTP, verifyOPT } from "../controllers/otp.controller.js";

const router = express.Router();
 
router.post("/send-otp", sendOTP);

router.post("/verify-otp",verifyOPT);

export default router;
