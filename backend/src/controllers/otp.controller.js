import bcrypt from "bcryptjs";
import { Resend } from "resend";
import dotenv from "dotenv";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";

dotenv.config();
const resend = new Resend(process.env.RESEND_API_KEY);

const otpStore = new Map(); // email → { fullName, email, password, otp, expiresAt }

export const sendOTP =  async (req, res) => {
  const { fullName, email, password } = req.body;
  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (await User.exists({ email })) {
    return res.status(400).json({ message: "Email already in use" });
  }

  // Generate OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + 10 * 60 * 1000; // 10 min

  // Send via Resend
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Your OTP Code",
      html: `<p>Your OTP is <strong>${otp}</strong>. It expires in 10 minutes.</p>`,
    });
  } catch (err) {
    console.error("Resend error:", err);
    return res.status(500).json({ message: "Failed to send OTP email" });
  }

  // Store pending user
  otpStore.set(email, { fullName, email, password, otp, expiresAt });
  return res.status(200).json({ message: "OTP sent" });
}

export const verifyOPT =  async (req, res) => {
  const { email, otp } = req.body;
  const record = otpStore.get(email);
  if (!record) {
    return res.status(400).json({ message: "No OTP request found" });
  }
  if (Date.now() > record.expiresAt) {
    otpStore.delete(email);
    return res.status(400).json({ message: "OTP expired" });
  }
  if (record.otp !== otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  // Hash password & create user
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(record.password, salt);

  const newUser = await User.create({
    fullName: record.fullName,
    email: record.email,
    password: hashed,
    isVerified: true,
  });

  otpStore.delete(email);

  // Generate JWT cookie
  generateToken(newUser._id, res);

  return res.status(201).json({
    _id: newUser._id,
    fullName: newUser.fullName,
    email: newUser.email,
    profilePic: newUser.profilePic,
  });
}