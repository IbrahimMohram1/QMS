import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";
import Login from "./AuthModule/components/Login/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import path from "node:path";
import AuthLayout from "./Shared/AuthLayout/AuthLayout";
import Register from "./AuthModule/components/Register/Register";
import ForgotPassword from "./AuthModule/components/ForgotPassword/ForgotPassword";
import ChangePassword from "./AuthModule/components/ChangePassword/ChangePassword";
import ResetPassword from "./AuthModule/components/ResetPassword/ResetPassword";
import AuthContextProvider from "./Context/AuthContext";

function App() {
  let routes = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        {
          index: true,
          element: <Login />,
        },
        {
          path:"login",
          element:<Login/>
        },
        {
          path: "register",
          element: <Register />,
        },
        { path: "forgot-password", element: <ForgotPassword /> },
        { path: "change-password", element: <ChangePassword /> },
        { path: "reset-password", element: <ResetPassword /> },
      ],
    },
  ]);

  return (
    <>
      <AuthContextProvider>
        <ToastContainer />
        <RouterProvider router={routes} />
      </AuthContextProvider>
    </>
  );
}

export default App;
