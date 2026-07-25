import React from "react";
import { useNavigate, Link } from "react-router-dom";
import RegisterForm from "@/features/auth/components/RegisterForm";
import useAuth from "@/features/auth/hooks/useAuth";
import { getDashboardRouteForRole } from "@/features/auth/utils/auth.utils";

const Register = () => {
  const navigate = useNavigate();
  const { register, loading } = useAuth();

  const handleRegisterSubmit = async (userData) => {
    try {
      const data = await register(userData);
      const redirectPath = getDashboardRouteForRole(data?.user?.role || userData.role);
      navigate(redirectPath);
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create Account</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Join the Internship Tracker platform
          </p>
        </div>
        <RegisterForm onSubmit={handleRegisterSubmit} isLoading={loading} />
        <div className="mt-6 text-center text-xs text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
