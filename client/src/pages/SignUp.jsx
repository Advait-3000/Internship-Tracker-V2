import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Mail, Lock, EyeOff, Eye, User } from 'lucide-react';
import { clearError } from '../features/auth/authSlice';

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Student', // Default role
    agreeTerms: false
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
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen lg:h-screen lg:overflow-hidden bg-[#F8FAFC] p-4 sm:p-6 lg:p-8 items-center justify-center">
      <div className="flex flex-col lg:flex-row w-full max-w-6xl bg-white rounded-[32px] shadow-lg overflow-hidden border border-gray-100 min-h-[680px]">
        
        {/* ── Left Sign-Up Form Section ── */}
        <div className="flex w-full lg:w-1/2 items-center justify-center p-6 sm:p-10 lg:p-12 overflow-y-auto">
          <div className="w-full max-w-md">
            
            <div className="mb-6 text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-1.5">Create Account</h1>
              <Link to="/login" className="text-sm font-semibold text-blue-600 hover:underline">
                Already have an account? Sign in
              </Link>
            </div>

            {error && (
              <div className="mb-4 p-3.5 bg-red-50 border border-red-200 text-red-600 text-xs font-semibold rounded-xl text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <User className="h-4 w-4" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Advait Warang"
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

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
                    required
                    placeholder="username@aum.edu.in"
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
                    required
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

              {/* Role Selection */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Select Role
                </label>
                <div className="relative">
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer appearance-none"
                  >
                    <option value="Student">Student</option>
                    <option value="Faculty">Faculty</option>
                    <option value="Mentor">Mentor</option>
                    <option value="Company">Company</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-center pt-1">
                <input
                  id="agree-terms"
                  name="agreeTerms"
                  type="checkbox"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  required
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                />
                <label htmlFor="agree-terms" className="ml-2 block text-xs font-medium text-gray-700 cursor-pointer">
                  I agree to the Terms of Service & Privacy Policy
                </label>
              </div>

              {/* Black Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 bg-black hover:bg-gray-800 text-white font-bold text-sm rounded-xl shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer mt-2"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
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

            {/* Stacked Social Buttons */}
            <div className="space-y-2.5">
              <button
                type="button"
                className="w-full flex items-center justify-center px-4 py-2.5 border border-gray-200 rounded-xl shadow-xs bg-white text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-4 w-4 mr-2.5" />
                Sign Up with Google
              </button>
            </div>

          </div>
        </div>

        {/* ── Right Feature Banner Section ── */}
        <div className="flex w-full lg:w-1/2 p-4">
          <div className="w-full h-full rounded-[24px] bg-[#1E2047] bg-gradient-to-br from-[#1E2047] via-[#2F2150] to-[#E98292] relative overflow-hidden flex flex-col justify-between p-8 sm:p-10">
            
            {/* Logo at Top Center */}
            <div className="w-full flex justify-center z-20">
              <img src="/logo.png" alt="Atharva University Mumbai" className="h-24 sm:h-28 object-contain" />
            </div>

            {/* Quote Section with Enhanced Typography */}
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

            {/* Bottom Right Image */}
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

export default SignUp;
