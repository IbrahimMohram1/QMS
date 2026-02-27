import React from "react";
import { Outlet } from "react-router-dom";
import img from "../../../src/assets/AuthImg.png";
export default function AuthLayout() {
  return (
    <>
      <div className="min-h-screen overflow-hidden flex flex-col md:flex-row w-5/6 mx-auto">
        {" "}
        {/* Form Section */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <Outlet />
        </div>
        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <img
            src={img}
            alt="Auth Background"
            className="w-full h-3/4 object-cover"
          />
        </div>
      </div>
    </>
  );
}
