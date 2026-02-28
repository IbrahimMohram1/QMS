import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Key, Eye, EyeOff, Loader2, Check } from "lucide-react";
import useAuth from "@/hooks/useAuth"; // لو انت حاطه في hooks/useAuth.js

export default function ResetPassword() {

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { resetPassword, loading } = useAuth(); // هنا بنستخدم hook

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    // data: { email, otp, password, confirmPassword }
    // نرسل فقط الحقول المطلوبة للـ API
    const payload = {
      email: data.email,
      otp: data.otp,
      password: data.password,
    };

    await resetPassword(payload);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-xl space-y-5"
    >

      <h2 className="text-[#C5D86D] font-bold text-2xl md:text-3xl">
        Reset password
      </h2>

      {/* Email */}
      <Field>
        <FieldLabel className="text-white mb-1">Your email address</FieldLabel>
        <div className={`flex items-center bg-[#0f111a] border-2 rounded-[10px] px-4 h-12 ${
          errors.email ? "border-red-500" : "border-white focus-within:border-[#C5D86D]"
        }`}>
          <Mail className="text-white mr-3" />
          <Input
            type="email"
            placeholder="Type your email"
            {...register("email", { required: "Email is required" })}
            className="bg-transparent border-none text-white focus-visible:ring-0"
          />
        </div>
        {errors.email && <FieldError className="text-red-500">{errors.email.message}</FieldError>}
      </Field>

      {/* OTP */}
      <Field>
        <FieldLabel className="text-white mb-1">OTP</FieldLabel>
        <div className={`flex items-center bg-[#0f111a] border-2 rounded-[10px] px-4 h-12 ${
          errors.otp ? "border-red-500" : "border-white focus-within:border-[#C5D86D]"
        }`}>
          <Mail className="text-white mr-3" />
          <Input
            type="text"
            placeholder="Enter OTP"
            {...register("otp", { required: "OTP is required" })}
            className="bg-transparent border-none text-white focus-visible:ring-0"
          />
        </div>
        {errors.otp && <FieldError className="text-red-500">{errors.otp.message}</FieldError>}
      </Field>

      {/* Password */}
      <Field>
        <FieldLabel className="text-white mb-1">Password</FieldLabel>
        <div className={`flex items-center bg-[#0f111a] border-2 rounded-[10px] px-4 h-12 ${
          errors.password ? "border-red-500" : "border-white focus-within:border-[#C5D86D]"
        }`}>
          <Key className="text-white mr-3" />
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Type your password"
            {...register("password", { required: "Password is required", minLength: { value: 6, message: "Minimum 6 characters" } })}
            className="flex-1 bg-transparent border-none text-white focus-visible:ring-0"
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <EyeOff className="text-white" size={20}/> : <Eye className="text-white" size={20}/>}
          </button>
        </div>
        {errors.password && <FieldError className="text-red-500">{errors.password.message}</FieldError>}
      </Field>

      {/* Confirm Password */}
      <Field>
        <FieldLabel className="text-white mb-1">Confirm Password</FieldLabel>
        <div className={`flex items-center bg-[#0f111a] border-2 rounded-[10px] px-4 h-12 ${
          errors.confirmPassword ? "border-red-500" : "border-white focus-within:border-[#C5D86D]"
        }`}>
          <Key className="text-white mr-3" />
          <Input
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm password"
            {...register("confirmPassword", {
              required: "Confirm password is required",
              validate: (value) => value === password || "Passwords do not match",
            })}
            className="flex-1 bg-transparent border-none text-white focus-visible:ring-0"
          />
          <button type="button" onClick={() => setShowConfirm(!showConfirm)}>
            {showConfirm ? <EyeOff className="text-white" size={20}/> : <Eye className="text-white" size={20}/>}
          </button>
        </div>
        {errors.confirmPassword && <FieldError className="text-red-500">{errors.confirmPassword.message}</FieldError>}
      </Field>

      {/* Submit Button */}
      <Button
        disabled={loading}
        type="submit"
        className="bg-white hover:bg-gray-200 text-black font-bold py-5 px-6 rounded-[10px] flex items-center gap-2 disabled:opacity-75"
      >
        <span>{loading ? "Updating..." : "Reset Password"}</span>
        <div className="bg-black text-white rounded-full p-1 flex items-center justify-center">
          {loading ? <Loader2 size={15} strokeWidth={4} className="animate-spin"/> : <Check size={15} strokeWidth={4}/>}
        </div>
      </Button>
    </form>
  );
}