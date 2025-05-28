// components/EmailVerification.jsx
import { useState } from "react";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-toastify";

export default function EmailVerification() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);

  const sendOtp = async () => {
    try {
      await axiosInstance.post("/verify/send-otp", { email });
      toast.success("OTP sent to your email");
      setStep(2);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await axiosInstance.post("/verify/verify-otp", { email, otp });
      toast.success("Email verified!");
      console.log("JWT Token:", res.data.token); // Optional: Save to localStorage
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div className="space-y-4">
      {step === 1 ? (
        <>
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter email" />
          <button onClick={sendOtp}>Send OTP</button>
        </>
      ) : (
        <>
          <input value={otp} onChange={e => setOtp(e.target.value)} placeholder="Enter OTP" />
          <button onClick={verifyOtp}>Verify</button>
        </>
      )}
    </div>
  );
}
