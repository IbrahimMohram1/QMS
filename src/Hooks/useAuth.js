import axios from "axios";
import { Toast } from "radix-ui";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import axiosClient from "@/Api/AxiosClient";

export default function useAuth() {
  const { saveLoginData } = useContext(AuthContext);
  const navigate = useNavigate();
  let [loading, setLoading] = useState(false);

  //==================Register==================
  const register = async (data) => {
    setLoading(true);
    try {
      let response = await axiosClient.post(`/api/auth/register`, data);
      console.log(response);
      toast.success(response.data.message);
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  //==================Login==================
  const login = async (data) => {
    setLoading(true);
    try {
      let response = await axiosClient.post(`/api/auth/login`, data);
      console.log(response);
      const accessToken = response.data.data.accessToken;
      localStorage.setItem("accessToken", accessToken);
      saveLoginData();
      navigate("/dashboard");
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  //==================Forgot Password==================
  const forgotPassword = async (data) => {
    setLoading(true);
    try {
      let response = await axiosClient.post(`/api/auth/forgot-password`, data);
      console.log(response);
      toast.success(response.data.message);
      navigate("/reset-password");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  // ==================Change Password==================
  const changePassword = async (data) => {
    setLoading(true);
    try {
      let response = await axiosClient.post(`/api/auth/change-password`, data);
      console.log(response);
      toast.success(response.data.message);
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  // ==================Reset Password==================
  const resetPassword = async (data) => {
    setLoading(true);
    try {
      let response = await axiosClient.post(`/api/auth/reset-password`, data);

      console.log(response);
      toast.success(response.data.message);
      navigate("/login");
    } catch (error) {
      console.log(error);

      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    forgotPassword,
    loading,
    register,
    changePassword,
    resetPassword,
  };
}
