import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { toast } from "react-toastify";
import AuthImagePattern from "../components/AuthImagePattern";
import { User, Mail, Lock, Eye, EyeOff, Loader2, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const { signupWithOTP, verifyOTP, isSigningUp } = useAuthStore();

  const [form, setForm] = useState({ fullName: "", email: "", password: "" });
  const [otp, setOtp] = useState("");

  const handleSendOtp = async (e) => {
    e.preventDefault();
    const ok = await signupWithOTP(form);
    if (ok) setStep(2); // move to OTP step
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const success = await verifyOTP(form.email, otp);
    if (success) {
      toast.success("Email verified & account created!");
      // redirect or refresh → now authenticated
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 relative overflow-hidden">

      {/* animated blobs */}
      <div
        className="absolute w-[600px] h-[600px] bg-primary opacity-30 rounded-full filter blur-3xl animate-blob pointer-events-none z-0"
        style={{ top: "-10%", left: "-10%" }}
      />
      <div
        className="absolute w-[500px] h-[500px] bg-secondary opacity-35 rounded-full filter blur-2xl animate-blob animation-delay-2000 pointer-events-none z-0"
        style={{ top: "0%", right: "-15%" }}
      />
      <div
        className="absolute w-[550px] h-[550px] bg-accent opacity-20 rounded-full filter blur-2xl animate-blob animation-delay-4000 pointer-events-none z-0"
        style={{ top: "50%", right: "24%" }}
      />

      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-8">
            <MessageSquare className="size-6 text-primary mx-auto" />
            <h1 className="text-2xl font-bold mt-2">
              {step === 1 ? "Create Account" : "Verify Email"}
            </h1>
            <p className="text-base-content/60">
              {step === 1
                ? "Get started with your free account"
                : `Enter the OTP sent to ${form.email}`}
            </p>
          </div>

          <form onSubmit={step === 1 ? handleSendOtp : handleVerify} className="space-y-6">
            {step === 1 ? (
              <>
                {/* Full Name */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Full Name</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 z-10 flex items-center pointer-events-none">
                      <User className="size-5 text-base-content/50" />
                    </div>
                    <input
                      type="text"
                      className="input input-bordered w-full pl-10"
                      placeholder="Your full name"
                      value={form.fullName}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    />
                  </div>
                </div>
                {/* Email */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Email</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 z-10 flex items-center pointer-events-none">
                      <Mail className="size-5 text-base-content/50" />
                    </div>
                    <input
                      type="email"
                      className="input input-bordered w-full pl-10"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                </div>
                {/* Password */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Password</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 z-10 flex items-center pointer-events-none">
                      <Lock className="size-5 text-base-content/50" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="input input-bordered w-full pl-10"
                      placeholder="••••••••"
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                    />
                    <button
                      type="button"
                      className="absolute z-20 inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="size-5 text-base-content/40" />
                      ) : (
                        <Eye className="size-5 text-base-content/40" />
                      )}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              // OTP step
              <div className="form-control">
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary w-full z-100"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" />{" "}
                  {step === 1 ? "Sending OTP..." : "Verifying..."}
                </>
              ) : step === 1 ? (
                "Create Account"
              ) : (
                "Verify & Create"
              )}
            </button>
          </form>
        </div> 
        <div className="text-center mt-2">
            <p className="text-base-content/60">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary">
                Sign in
              </Link>
            </p>
        </div>
      </div>

      {/* right side */}
      <AuthImagePattern
        title="Join our community"
        subtitle="Connect, share and stay in touch with friends."
      />
    </div>
  );
}
