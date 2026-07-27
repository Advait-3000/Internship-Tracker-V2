import React, { useState } from "react";
import Input from "@/shared/components/ui/Input";
import Button from "@/shared/components/ui/Button";

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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
      <Input
        label="Email Address"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="username@google.com"
        className="!px-4 !py-2.5 text-sm rounded-lg !bg-white placeholder:!bg-white"
        required
      />
      <Input
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="••••••"
        className="!px-4 !py-2.5 text-sm rounded-lg !bg-white placeholder:!bg-white"
        required
      />

      <div className="flex items-center justify-between text-xs font-medium pt-1 px-0.5">
        <label className="flex items-center gap-2 cursor-pointer text-gray-600">
          <input
            type="checkbox"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleChange}
            className="w-4 h-4 rounded border-gray-300 accent-black focus:ring-black cursor-pointer"
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
        className="w-full justify-center bg-gray-950 hover:bg-gray-800 text-white rounded-lg py-2.5 h-10 font-semibold text-sm mt-1 text-[17px]"
        disabled={isLoading}
      >
        {isLoading ? "Signing in..." : "Sign In"}
      </Button>

      <div className="relative flex items-center justify-center my-2">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative bg-white px-3 text-xs font-semibold text-gray-400 uppercase">
          OR
        </div>
      </div>

      <div className="flex flex-col gap-3 w-full">
        <Button variant="outline" className="w-full justify-center bg-white border hover:bg-gray-50 text-black py-2.5 text-xs font-semibold">
          Sign In with Google
        </Button>
        <Button variant="outline" className="w-full justify-center bg-white border hover:bg-gray-50 text-black py-2.5 rounded-lg text-xs font-semibold">
          Continue with Apple
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
