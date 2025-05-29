// AuthImagePattern.jsx
import React from "react";
import Lottie from "lottie-react";
import chatAnimation from "../assets/lottie/chat-bubbles.json";

const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex flex-col relative w-full h-screen items-center justify-center overflow-hidden pt-12">
      

      {/* your Lottie */}
      <div className="relative z-10 w-[600px] h-[500px]">
        <Lottie animationData={chatAnimation} loop />
      </div>
      <div className="h-1/3 items-start justify-start" >
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-base-content/60">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
