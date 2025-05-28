// AuthImagePattern.jsx
import React from "react";
import Lottie from "lottie-react";
import chatAnimation from "../assets/lottie/chat-bubbles.json";

const AuthImagePattern = () => {
  return (
    <div className="hidden lg:flex relative w-full h-screen items-center justify-center overflow-hidden">
      {/* animated blobs */}
      <div
        className="absolute w-[600px] h-[600px] bg-primary opacity-30 rounded-full filter blur-3xl animate-blob"
        style={{ top: "-10%", left: "-10%" }}
      />
      <div
        className="absolute w-[500px] h-[500px] bg-secondary opacity-25 rounded-full filter blur-2xl animate-blob animation-delay-2000"
        style={{ bottom: "-5%", right: "-15%" }}
      />
      <div
        className="absolute w-[400px] h-[400px] bg-accent opacity-20 rounded-full filter blur-2xl animate-blob animation-delay-4000"
        style={{ top: "50%", right: "20%" }}
      />

      {/* your Lottie */}
      <div className="relative z-10 w-[500px] h-[500px]">
        <Lottie animationData={chatAnimation} loop />
      </div>
    </div>
  );
};

export default AuthImagePattern;
