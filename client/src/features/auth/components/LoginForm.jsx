import React, { useState } from "react";
import Input from "@/shared/components/ui/Input";
import Button from "@/shared/components/ui/Button";
import googleIcon from "@/assets/icons/Google.png";
import appleIcon from "@/assets/icons/Apple.svg";

const LoginForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({ email: "", password: "", rememberMe: false });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full h-[290px]">
      <Input 
        className="!bg-white dark:!bg-white !text-gray-900 dark:!text-gray-900 !border-gray-300 placeholder:!text-gray-500 py-1.5 text-sm"
        label="Email Address"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="username@google.com"
        required
      />
      <Input
        className="!bg-white dark:!bg-white !text-gray-900 dark:!text-gray-900 !border-gray-300 placeholder:!text-gray-500 py-1.5 text-sm"
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="••••••"
        required
      />

      <div className="flex items-center justify-between text-xs font-medium pt-0.5 px-0.5">
        <label className="flex items-center gap-1.5 cursor-pointer text-gray-600">
          <input
            type="checkbox"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleChange}
            className="w-3.5 h-3.5 rounded border-gray-300 accent-black focus:ring-black cursor-pointer"
          />
          <span>Remember Me</span>
        </label>
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="text-blue-600 hover:underline font-semibold"
        >
          Forgot password?
        </a>
      </div>

      <Button
        type="submit"
        className="w-full justify-center bg-gray-950 hover:bg-gray-800 text-white rounded-lg py-2 h-9 font-semibold text-sm mt-1"
        disabled={isLoading}
      >
        {isLoading ? "Signing in..." : "Sign In"}
      </Button>

      <div className="relative flex items-center justify-center my-1">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative bg-white px-2.5 text-[11px] font-semibold text-gray-400 uppercase">
          OR
        </div>
      </div>

      <div className="flex flex-col gap-2 sm:gap-2.5 w-full">
        <Button
          type="button"
          variant="outline"
          className="w-full flex items-center justify-center gap-2.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 h-9 px-4 text-xs font-semibold rounded-lg shadow-2xs transition-all duration-150"
        >
          <img src={googleIcon} alt="Google logo" className="w-4 h-4 object-contain shrink-0" />
          <span>Sign In with Google</span>
        </Button>
        <Button
          type="button"
          variant="outline"
          className="w-full flex items-center justify-center gap-2.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 h-9 px-4 text-xs font-semibold rounded-lg shadow-2xs transition-all duration-150"
        >
          <img src={appleIcon} alt="Apple logo" className="w-4 h-4 object-contain shrink-0" />
          <span>Continue with Apple</span>
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
