import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import nodemailer from "nodemailer";

dotenv.config();

const otpStore = new Map(); // email → { fullName, email, password, otp, expiresAt }

export const sendOTP = async (req, res) => {
  const { fullName, email, password } = req.body;

  // 1️⃣ Validate inputs
  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // 2️⃣ Generate a 6-digit OTP and expiry
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

  // 3️⃣ Store the record for later verification
  otpStore.set(email, { fullName, email, password, otp, expiresAt });

  // 4️⃣ Email the generated OTP
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is ${otp}`,  // now uses the server‐generated OTP
    });
    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (err) {
    console.error("Error sending OTP:", err);
    return res.status(500).json({ message: "Failed to send OTP" });
  }
};


export const verifyOTP =  async (req, res) => {
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