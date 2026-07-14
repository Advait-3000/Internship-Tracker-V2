import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Mail, Lock, EyeOff, Eye, User } from 'lucide-react';
import { clearError } from '../features/auth/authSlice';

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    agreeTerms: false
  });

  const dashboardSlides = [
    [
      { title: "Total Tasks", val: "425", change: "+2.45%", isUp: true, type: "bars" },
      { title: "Completed Tasks", val: "87", change: "+21%", isUp: true, type: "wave" },
      { title: "Incomplete Tasks", val: "72,550", change: "-21.33%", isUp: false, subtext: "64%", type: "gauge" },
      { title: "Done Tasks", val: "72,550", change: "-21.33%", isUp: false, type: "stat" }
    ],
    [
      { title: "Active Interns", val: "1,450", change: "+15.2%", isUp: true, type: "bars" },
      { title: "Faculty Reviews", val: "380", change: "+8.1%", isUp: true, type: "wave" },
      { title: "Attendance Rate", val: "94.5%", change: "+3.3%", isUp: true, subtext: "95%", type: "gauge" },
      { title: "Certificates", val: "1,120", change: "+12.4%", isUp: true, type: "stat" }
    ]
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % dashboardSlides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [dashboardSlides.length]);

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

            {/* Dashboard Feature Slider */}
            <div className="z-20 w-full max-w-md mx-auto my-auto pt-4 relative">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white text-left mb-6">New Features</h2>
              
              <div className="relative w-full h-[250px]">
                {dashboardSlides.map((slide, slideIdx) => (
                  <div
                    key={slideIdx}
                    className={`absolute inset-0 grid grid-cols-2 gap-4 transition-all duration-700 ease-in-out transform ${
                      slideIdx === currentSlide ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 translate-x-8 pointer-events-none'
                    }`}
                  >
                    {slide.map((card, idx) => (
                      <div key={idx} className="bg-white rounded-2xl p-4 shadow-xl flex flex-col justify-between h-[110px] z-20">
                        <div className="flex justify-between items-start">
                          <p className="text-gray-500 text-xs font-semibold">{card.title}</p>
                          <span className="text-gray-400">•••</span>
                        </div>
                        <div className="flex justify-between items-end">
                          <div>
                            <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900">{card.val}</h3>
                            <p className={`text-[10px] font-bold mt-0.5 ${card.isUp ? 'text-green-600' : 'text-red-500'}`}>
                              {card.change}
                            </p>
                          </div>

                          {card.type === "bars" && (
                            <div className="flex items-end space-x-1 h-8">
                              <div className="w-1.5 bg-blue-300 rounded-t-xs h-3"></div>
                              <div className="w-1.5 bg-blue-500 rounded-t-xs h-6"></div>
                              <div className="w-1.5 bg-blue-400 rounded-t-xs h-4"></div>
                              <div className="w-1.5 bg-blue-600 rounded-t-xs h-8"></div>
                            </div>
                          )}

                          {card.type === "wave" && (
                            <div className="w-14 h-8 flex items-center">
                              <svg viewBox="0 0 100 30" className="w-full h-full stroke-purple-600 fill-none" strokeWidth="3">
                                <path d="M0 20 Q 15 5, 30 15 T 60 10 T 80 20 T 100 8" />
                              </svg>
                            </div>
                          )}

                          {card.type === "gauge" && (
                            <div className="w-9 h-9 rounded-full border-2 border-blue-500 flex items-center justify-center">
                              <span className="text-[10px] font-bold text-blue-600">{card.subtext}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {/* Slider Dots */}
              <div className="flex justify-start gap-2 mt-2">
                {dashboardSlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      currentSlide === idx ? 'w-8 bg-white' : 'w-2.5 bg-white/40 hover:bg-white/60'
                    }`}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
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
