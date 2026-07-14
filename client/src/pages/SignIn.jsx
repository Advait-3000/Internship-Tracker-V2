import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Mail, Lock, EyeOff, Eye, ShieldCheck, UserCheck, GraduationCap } from 'lucide-react';
import { loginUser, login, clearError } from '../features/auth/authSlice';

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (error) {
      dispatch(clearError());
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // If email/password are provided, authenticate via loginUser thunk or instant login
    if (formData.email || formData.password) {
      const resultAction = await dispatch(loginUser({ email: formData.email, password: formData.password }));
      if (loginUser.fulfilled.match(resultAction)) {
        if (resultAction.payload.role === 'Mentor') {
          navigate('/mentor');
        } else {
          navigate('/');
        }
        return;
      }
    }
    // Fallback instant sign in for demo
    dispatch(login({ role: 'Admin' }));
    navigate('/');
  };

  const handleDummyLogin = (role) => {
    dispatch(login({ role }));
    if (role === 'Mentor') {
      navigate('/mentor');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="flex min-h-screen lg:h-screen lg:overflow-hidden bg-[#F8FAFC] p-4 sm:p-6 lg:p-8 items-center justify-center">
      <div className="flex flex-col lg:flex-row w-full max-w-6xl bg-white rounded-[32px] shadow-lg overflow-hidden border border-gray-100 min-h-[680px]">
        
        {/* ── Left Sign-In Form Section (Matching Reference Screenshot) ── */}
        <div className="flex w-full lg:w-1/2 items-center justify-center p-6 sm:p-10 lg:p-12 overflow-y-auto">
          <div className="w-full max-w-md">
            
            <div className="mb-6 text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-1.5">Sign in to Account</h1>
              <Link to="/signup" className="text-sm font-semibold text-blue-600 hover:underline">
                Don&apos;t have an account? Sign up
              </Link>
            </div>

            {error && (
              <div className="mb-4 p-3.5 bg-red-50 border border-red-200 text-red-600 text-xs font-semibold rounded-xl text-center">
                {error}
              </div>
            )}

            {/* Quick Demo Login (Role Bypass) */}
            <div className="mb-6 p-3.5 bg-gray-50 border border-gray-200/80 rounded-2xl">
              <p className="text-[11px] font-extrabold text-gray-600 uppercase tracking-wider mb-2 text-center">
                Quick Login (Bypass Role Selection)
              </p>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleDummyLogin('Admin')}
                  className="flex items-center justify-center gap-1.5 rounded-xl bg-white px-3 py-2 text-xs font-bold text-indigo-700 shadow-xs border border-gray-200 hover:bg-indigo-600 hover:text-white transition-all cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Admin
                </button>
                <button
                  type="button"
                  onClick={() => handleDummyLogin('Mentor')}
                  className="flex items-center justify-center gap-1.5 rounded-xl bg-white px-3 py-2 text-xs font-bold text-emerald-700 shadow-xs border border-gray-200 hover:bg-emerald-600 hover:text-white transition-all cursor-pointer"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  Mentor
                </button>
                <button
                  type="button"
                  onClick={() => handleDummyLogin('Student')}
                  className="flex items-center justify-center gap-1.5 rounded-xl bg-white px-3 py-2 text-xs font-bold text-purple-700 shadow-xs border border-gray-200 hover:bg-purple-600 hover:text-white transition-all cursor-pointer"
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  Student
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Address */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <Mail className="h-4 w-4" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="username@google.com"
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <Lock className="h-4 w-4" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="rememberMe"
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-xs font-medium text-gray-700 cursor-pointer">
                    Remember Me
                  </label>
                </div>
                <a href="#forgot" className="text-xs font-bold text-blue-600 hover:text-blue-500">
                  Forgot password?
                </a>
              </div>

              {/* Black Submit Button matching screenshot */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 bg-black hover:bg-gray-800 text-white font-bold text-sm rounded-xl shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer mt-2"
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>

            {/* Divider OR */}
            <div className="my-5">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-3 text-gray-400 font-bold tracking-wider">OR</span>
                </div>
              </div>
            </div>

            {/* Stacked Social Logins matching screenshot */}
            <div className="space-y-2.5">
              <button
                type="button"
                onClick={() => handleDummyLogin('Admin')}
                className="w-full flex items-center justify-center px-4 py-2.5 border border-gray-200 rounded-xl shadow-xs bg-white text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-4 w-4 mr-2.5" />
                Sign In with Google
              </button>
              <button
                type="button"
                onClick={() => handleDummyLogin('Admin')}
                className="w-full flex items-center justify-center px-4 py-2.5 border border-gray-200 rounded-xl shadow-xs bg-white text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" alt="Facebook" className="h-4 w-4 mr-2.5" />
                Continue with Facebook
              </button>
              <button
                type="button"
                onClick={() => handleDummyLogin('Admin')}
                className="w-full flex items-center justify-center px-4 py-2.5 border border-gray-200 rounded-xl shadow-xs bg-white text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <svg className="h-4 w-4 mr-2.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.19 2.31-.88 3.5-1.15 2.14-.39 3.99.37 5.05 2.05-4.14 2.39-3.4 8.01 1.05 9.87-.93 2.11-2.42 4.19-4.68 1.4zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                Continue with Apple
              </button>
            </div>

          </div>
        </div>

        {/* ── Right Feature Banner Section (Matching Reference Screenshot) ── */}
        <div className="flex w-full lg:w-1/2 p-4">
          <div className="w-full h-full rounded-[24px] bg-[#1E2047] bg-gradient-to-br from-[#1E2047] via-[#2F2150] to-[#E98292] relative overflow-hidden flex flex-col justify-between p-8 sm:p-10">
            
            {/* Logo at Top Center */}
            <div className="w-full flex justify-center z-20">
              <img src="/logo.png" alt="Atharva University Mumbai" className="h-24 sm:h-28 object-contain" />
            </div>

            {/* Quote Section */}
            <div className="z-20 w-full max-w-lg mx-auto my-auto relative px-2 sm:px-6 transform -translate-y-12 sm:-translate-y-20">
              <div className="flex flex-col">
                <h1 className="text-5xl sm:text-6xl md:text-[5.5rem] font-serif font-extrabold text-white leading-[1.05] tracking-tight drop-shadow-md">
                  Be the Change.
                </h1>
                <h1 className="text-5xl sm:text-6xl md:text-[5.5rem] font-serif font-extrabold text-[#FBBF24] leading-[1.05] tracking-tight drop-shadow-md mt-2">
                  Lead the Future.
                </h1>
              </div>
            </div>

            {/* Bottom Right Image matching screenshot */}
            <div className="absolute bottom-0 right-0 w-[55%] sm:w-[48%] md:w-[45%] z-30 pointer-events-none">
              <img
                src="/image.png"
                alt="Shri Sunil Rane"
                className="w-full h-auto object-contain object-bottom transform translate-x-[6%] translate-y-[2%]"
              />
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default SignIn;
