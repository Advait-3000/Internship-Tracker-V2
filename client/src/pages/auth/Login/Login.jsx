import React from "react";
import { useNavigate, Link } from "react-router-dom";
import LoginForm from "@/features/auth/components/LoginForm";
import useAuth from "@/features/auth/hooks/useAuth";
import { getDashboardRouteForRole } from "@/features/auth/utils/auth.utils";

const Login = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuth();

  const handleLoginSubmit = async (credentials) => {
    try {
      const data = await login(credentials);
      const redirectPath = getDashboardRouteForRole(data?.user?.role || "student");
      navigate(redirectPath);
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Sign In</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Enter your credentials to access Internship Tracker
          </p>
        </div>
        <LoginForm onSubmit={handleLoginSubmit} isLoading={loading} />
        <div className="mt-6 text-center text-xs text-gray-500">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 font-semibold hover:underline">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
