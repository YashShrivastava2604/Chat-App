// AuthImagePattern.jsx
import React from "react";
import Lottie from "lottie-react";
import chatAnimation from "../assets/lottie/chat-bubbles.json";

const AuthImagePattern = () => {
  return (
    <div className="hidden lg:flex relative w-full h-screen items-center justify-center overflow-hidden">
      

      {/* your Lottie */}
      <div className="relative z-10 w-[600px] h-[500px]">
        <Lottie animationData={chatAnimation} loop />
      </div>
    </div>
  );
};

export default AuthImagePattern;
