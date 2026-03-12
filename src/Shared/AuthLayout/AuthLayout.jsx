import React from "react";
import { Outlet } from "react-router-dom";
import { Check, X } from "lucide-react";
import img from "../../assets/AuthImg.png";

export default function AuthLayout() {
  return (
    <div className="min-h-screen lg:h-screen lg:overflow-hidden w-screen bg-[#0f111a] flex flex-col lg:flex-row overflow-x-hidden">
      {/* Left Side: Form Section */}
      <div className="md:w-1/2 w-full flex items-center justify-center">
        <div className=" flex flex-col justify-center px-5 sm:px-10 md:px-16 lg:px-10 xl:px-14 ">
          {/* Logo */}
          <div className="flex items-center  ">
            <div className="flex  items-center">
              <div className="bg-[#0f111a] rounded-full h-9 w-9  md:w-10 flex items-center justify-center border-2 border-white z-10">
                <X size={20} className="text-white" strokeWidth={3} />
              </div>
              <div className="bg-[#0f111a] rounded-full h-9 w-9  md:w-10 flex items-center justify-center border-2 border-white z-20">
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
      </div>

      {/* Right Side: Image Section — hidden below lg */}
      <div className="">
        <div className="hidden md:flex  items-center p-8 xl:p-10">
          <div className="w-full bg-[#FFEDDF] rounded-[20px] flex items-center justify-center overflow-hidden  mx-auto">
            <img
              src={img}
              alt="Authentication Illustration"
              className="w-full h-full object-contain transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
