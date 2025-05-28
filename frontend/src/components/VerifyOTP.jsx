import { useState } from "react";
import axios from "axios";

const VerifyOTP = ({ email }) => {
  const [otp, setOtp] = useState("");
  const [success, setSuccess] = useState(false);

  const handleVerify = async () => {
    try {
      await axios.post("/api/verify/verify-otp", { email, otp });
      alert("Signup successful!");
      setSuccess(true);
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  if (success) return <p>✅ Email Verified. You can now log in.</p>;

  return (
    <div>
      <p>Enter the OTP sent to {email}</p>
      <input value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="OTP" />
      <button onClick={handleVerify}>Verify</button>
    </div>
  );
};

export default VerifyOTP;
