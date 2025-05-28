// Signup with OTP Verification
import express from "express";
import { sendOTPEmail } from "../lib/sendOTPEmail.js"
import User from "../models/user.model.js";

const router = express.Router();
const otpMap = new Map(); // { email: { otp, expiresAt, userData } }

router.post("/send-otp", async (req, res) => {
  const { fullName, email, password, username } = req.body;
  if (!email || !password || !fullName || !username) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + 10 * 60 * 1000;

  const sent = await sendOTPEmail(email, otp);
  if (!sent) return res.status(500).json({ message: "Failed to send OTP" });

  otpMap.set(email, {
    otp,
    expiresAt,
    userData: { fullName, email, password, username }
  });

  res.status(200).json({ message: "OTP sent to email" });
});

router.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;
  const record = otpMap.get(email);

  if (!record || record.otp !== otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  if (Date.now() > record.expiresAt) {
    otpMap.delete(email);
    return res.status(400).json({ message: "OTP expired" });
  }

  const { fullName, password, username } = record.userData;

  const newUser = await User.create({ fullName, email, password, username });
  otpMap.delete(email);

  res.status(201).json({
    message: "User registered successfully",
    user: { _id: newUser._id, fullName, email }
  });
});

export default router;
