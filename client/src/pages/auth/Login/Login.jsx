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
    <div className="min-h-screen flex items-center justify-center bg-white p-4 sm:p-6">
      <div className="w-full max-w-sm sm:max-w-md bg-gray border border-black rounded-2xl p-44px  sm:p-8 flex flex-col gap-6">
        <div className="text-center">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
            Sign in to Account
          </h1>
        </div>
        <LoginForm onSubmit={handleLoginSubmit} isLoading={loading} />
        <div className="text-center text-xs text-gray-500">
          Don't have an account?{" "}
          <Link to="/register" className="font-semibold text-blue-600 hover:underline">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
