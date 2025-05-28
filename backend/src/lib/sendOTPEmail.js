import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendOTPEmail = async (email, otp) => {
  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev", // Use Resend's domain in free tier
      to: email,
      subject: "Verify Your Email",
      html: `<p>Your OTP is <strong>${otp}</strong>. It expires in 10 minutes.</p>`,
    });

    console.log("OTP email sent: ", data);
    return true;
  } catch (error) {
    console.error("Error sending OTP email:", error);
    return false;
  }
};
