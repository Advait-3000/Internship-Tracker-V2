import React from "react";
import { useNavigate, Link } from "react-router-dom";
import LoginForm from "@/features/auth/components/LoginForm";
import useAuth from "@/features/auth/hooks/useAuth";
import { getDashboardRouteForRole } from "@/features/auth/utils/auth.utils";
import atharvaLogo from "@/assets/images/Atharva_uni.png";
import sunilRane from "@/assets/images/sunilRane 1.png";

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-6">
      <div className="flex w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl bg-white   h-[700px]">

        {/* ── LEFT PANEL ── */}
        <div className="flex flex-col items-center justify-center bg-white w-full md:w-1/2 px-6 py-6 sm:px-8 sm:py-8 gap-4">
          {/* Logo */}
          <img
            src={atharvaLogo}
            alt="Atharva University Logo"
            className="w-48 h-48 sm:w-[220px] sm:h-[220px] object-contain transition-transform duration-300 hover:scale-105"
          />

          {/* Form card */}
          <div className="w-full max-w-[340px] bg-white border border-gray-200 rounded-xl shadow-sm px-5 py-5 sm:px-6 sm:py-6 flex flex-col gap-4">
            <h1 className="text-center text-lg sm:text-xl font-bold text-gray-800 tracking-tight">
              Sign in to Account
            </h1>
            <LoginForm onSubmit={handleLoginSubmit} isLoading={loading} />
            <div className="text-center text-xs text-gray-500 pt-10">
              Don't have an account?{" "}
              <Link to="/register" className="font-semibold text-blue-600 hover:underline">
                Register here
              </Link>
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div
          className="hidden md:flex flex-col justify-between w-1/2 relative overflow-hidden"
          style={{
            background: "linear-gradient(160deg, #1a1a5e 0%, #2d2d8f 35%, #5b3fa0 65%, #c06fa4 100%)",
          }}
        >
          {/* Top branding */}
          <div className="px-8 pt-8 z-10 relative">
            <h2
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontWeight: 700,
                fontSize: "2.6rem",
                lineHeight: 1.05,
                letterSpacing: "0.04em",
                color: "#c0392b",
                WebkitTextStroke: "1px #8b0000",
              }}
            >
              ATHARVA<br />UNIVERSITY
            </h2>
            <p
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontWeight: 600,
                fontSize: "0.85rem",
                letterSpacing: "0.35em",
                color: "#e0c080",
                marginTop: "4px",
              }}
            >
              MUMBAI
            </p>
          </div>

          {/* Founder's Vision */}
          <div className="px-8 z-10 relative my-auto py-3">
            <h3
              className="text-white text-lg font-bold mb-2"
              style={{ fontFamily: "'Oswald', sans-serif", letterSpacing: "0.04em" }}
            >

            </h3>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3.5 text-white text-[11px] sm:text-xs leading-relaxed border border-white/20 shadow-inner">
              <span className="text-3xl text-white/30 font-serif leading-none block -mb-1">"</span>
              <p>
                Education is not just about acquiring knowledge — it's about building character,
                fostering innovation, and creating leaders who will drive the future.
                At Atharva University, we are committed to providing world-class education
                that empowers students to achieve their highest potential and make a meaningful
                impact in society.
              </p>
            </div>
          </div>

          {/* Bottom: Sunil Rane photo */}
          <div className="relative flex items-end justify-end h-64 sm:h-72 z-10 mt-auto">
            <div
              className="absolute bottom-0 left-0 right-0 h-20 opacity-40"
              style={{ background: "linear-gradient(to top, #1a1a5e, transparent)" }}
            />
            <img
              src={sunilRane}
              alt="Sunil Rane - Founder & Chancellor"
              className="h-64 sm:h-110 w-auto object-contain object-bottom relative z-10"
              style={{ filter: "drop-shadow(0 0 24px rgba(192,111,164,0.6))" }}
            />
          </div>

          {/* Decorative large quotation mark */}
          <div
            className="absolute top-3 right-6 text-8xl font-serif opacity-10 text-white select-none pointer-events-none"
            style={{ lineHeight: 1 }}
          >
            "
          </div>

          {/* Decorative dots */}

        </div>

      </div>
    </div>
  );
};

export default Login;
