import React, { useState } from "react";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Key, Loader2, Check, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { toast } from "react-toastify";
import useAuth from "@/hooks/useAuth";

export default function ChangePassword() {
  const { changePassword, loading } = useAuth();

  const [formData, setFormData] = useState({
    password: "",       
    password_new: "",   
    confirm_password: "", 
  });

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Basic Empty Validation
    if (!formData.password || !formData.password_new) {
      return toast.error("Please fill all fields");
    }

    // 2. Matching Validation
    if (formData.password_new !== formData.confirm_password) {
      return toast.error("New passwords do not match!");
    }

    // 3. Prevent same password
    if (formData.password === formData.password_new) {
      return toast.error("New password must be different from the old one");
    }

    const success = await changePassword({
      password: formData.password,
      password_new: formData.password_new,
    });

    if (success) {
      // Clear form on success
      setFormData({ password: "", password_new: "", confirm_password: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl space-y-6 p-4">
      <h2 className="text-[#C5D86D] font-bold mb-4 text-xl md:text-3xl">
        Security Settings
      </h2>

      {/* Current Password */}
      <Field>
        <FieldLabel className="text-white mb-2">Current Password</FieldLabel>
        <div className="flex items-center border border-gray-600 rounded-lg px-3 py-1 bg-black/20 focus-within:border-[#C5D86D] transition-colors">
          <Key className="text-gray-400 mr-3" size={18} />
          <Input
            name="password"
            value={formData.password}
            onChange={handleChange}
            type={showOld ? "text" : "password"}
            placeholder="Type current password"
            className="flex-1 border-none bg-transparent text-white focus-visible:ring-0 h-10"
          />
          <button type="button" onClick={() => setShowOld(!showOld)} className="p-2">
            {showOld 
              ? <EyeOff className="text-gray-400 hover:text-white" size={18} /> 
              : <Eye className="text-gray-400 hover:text-white" size={18} />
            }
          </button>
        </div>
      </Field>

      {/* New Password */}
      <Field>
        <FieldLabel className="text-white mb-2">New Password</FieldLabel>
        <div className="flex items-center border border-gray-600 rounded-lg px-3 py-1 bg-black/20 focus-within:border-[#C5D86D] transition-colors">
          <ShieldCheck className="text-gray-400 mr-3" size={18} />
          <Input
            name="password_new"
            value={formData.password_new}
            onChange={handleChange}
            type={showNew ? "text" : "password"}
            placeholder="Type new password"
            className="flex-1 border-none bg-transparent text-white focus-visible:ring-0 h-10"
          />
          <button type="button" onClick={() => setShowNew(!showNew)} className="p-2">
            {showNew 
              ? <EyeOff className="text-gray-400 hover:text-white" size={18} /> 
              : <Eye className="text-gray-400 hover:text-white" size={18} />
            }
          </button>
        </div>
      </Field>

      {/* Confirm New Password */}
      <Field>
        <FieldLabel className="text-white mb-2">Confirm New Password</FieldLabel>
        <div className="flex items-center border border-gray-600 rounded-lg px-3 py-1 bg-black/20 focus-within:border-[#C5D86D] transition-colors">
          <Check className="text-gray-400 mr-3" size={18} />
          <Input
            name="confirm_password"
            value={formData.confirm_password}
            onChange={handleChange}
            type="password"
            placeholder="Repeat new password"
            className="flex-1 border-none bg-transparent text-white focus-visible:ring-0 h-10"
          />
        </div>
      </Field>

      {/* Submit Button */}
      <Button
        disabled={loading}
        type="submit"
        className="w-full md:w-auto bg-white hover:bg-gray-200 text-black font-bold py-6 px-8 rounded-[10px] flex items-center justify-center gap-3 transition-all"
      >
        <span>{loading ? "Updating..." : "Update Password"}</span>
        <div className="bg-black text-white rounded-full p-1 flex items-center justify-center">
          {loading
            ? <Loader2 size={14} strokeWidth={3} className="animate-spin" />
            : <Check size={14} strokeWidth={4} />
          }
        </div>
      </Button>
    </form>
  );
}