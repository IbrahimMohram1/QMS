import React from "react";
import { Outlet } from "react-router-dom";
import { Check, X } from "lucide-react";
import img from "../../assets/AuthImg.png";

export default function AuthLayout() {
  return (
    <div className="min-h-screen lg:h-screen lg:overflow-hidden w-screen bg-[#0f111a] flex flex-col lg:flex-row overflow-x-hidden">
      {/* Left Side: Form Section */}
      <div className="flex-1 flex flex-col justify-center px-5 sm:px-10 md:px-16 lg:px-10 xl:px-14 py-8 lg:py-10">
        {/* Logo */}
        <div className="flex items-center space-x-1 mb-6 md:mb-8 lg:mb-10">
          <div className="flex -space-x-1.5 items-center">
            <div className="bg-[#0f111a] rounded-full h-9 w-9 md:h-10 md:w-10 flex items-center justify-center border-2 border-white z-10">
              <X size={20} className="text-white" strokeWidth={3} />
            </div>
            <div className="bg-[#0f111a] rounded-full h-9 w-9 md:h-10 md:w-10 flex items-center justify-center border-2 border-white z-20">
              <Check size={20} className="text-white" strokeWidth={3} />
            </div>
          </div>
          <span className="font-mono text-xl md:text-2xl tracking-widest ml-1 text-white">
            |Quizwiz
          </span>
        </div>

        <div className="w-full">
          <Outlet />
        </div>
      </div>

      {/* Right Side: Image Section — hidden below lg */}
      <div className="hidden lg:flex flex-1 items-stretch p-8 xl:p-10">
        <div className="w-full bg-[#FFEDDF] rounded-[20px] flex items-center justify-center overflow-hidden">
          <img
            src={img}
            alt="Authentication Illustration"
            className="w-full h-full object-cover transition-transform duration-500"
          />
        </div>
      </div>
    </div>
  );
}
