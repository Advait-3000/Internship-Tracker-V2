import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Mail, Lock, EyeOff, Eye } from 'lucide-react';
import { loginUser, clearError } from '../authSlice';

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
// dummy 
  const dashboardSlides = [
    [
      { title: "Total Users", val: "12,450", change: "+15.2%", isUp: true },
      { title: "Active Sessions", val: "3,280", change: "+5.1%", isUp: true },
      { title: "Bounce Rate", val: "42.5%", change: "-2.3%", isUp: false, subtext: "42%" },
      { title: "New Signups", val: "840", change: "+12.4%", isUp: true, subtext: "85%" }
    ],
    [
      { title: "Revenue", val: "$45,200", change: "+8.4%", isUp: true },
      { title: "Avg. Order", val: "$124.50", change: "+1.2%", isUp: true },
      { title: "Refunds", val: "1.2%", change: "-0.5%", isUp: true, subtext: "1%" },
      { title: "Conversion", val: "4.8%", change: "+0.8%", isUp: true, subtext: "5%" }
    ],
    [
      { title: "Server Load", val: "45%", change: "-12.5%", isUp: true },
      { title: "Response Time", val: "124ms", change: "-15ms", isUp: true },
      { title: "Error Rate", val: "0.02%", change: "-0.01%", isUp: true, subtext: "0%" },
      { title: "Uptime", val: "99.99%", change: "+0.01%", isUp: true, subtext: "99%" }
    ],
    [
      { title: "Tasks Created", val: "1,245", change: "+24.5%", isUp: true },
      { title: "Tasks Done", val: "892", change: "+18.2%", isUp: true },
      { title: "Overdue", val: "12", change: "-5", isUp: true, subtext: "2%" },
      { title: "Completion", val: "78%", change: "+5.4%", isUp: true, subtext: "78%" }
    ]
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % dashboardSlides.length);
    }, 4000);
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
    const resultAction = await dispatch(loginUser({ email: formData.email, password: formData.password }));
    if (loginUser.fulfilled.match(resultAction)) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="flex min-h-screen lg:h-screen lg:overflow-hidden bg-[#F3F4F6] p-4 sm:p-6 lg:p-8 items-center justify-center">
      <div className="flex flex-col lg:flex-row w-full max-w-6xl bg-white rounded-[32px] shadow-sm overflow-hidden">
        
        {/* Left Feature Section */}
        <div className="flex w-full lg:w-1/2 p-4">
          <div className="w-full h-full rounded-[24px] bg-[#1E2047] bg-gradient-to-br from-[#1E2047] via-[#2F2150] to-[#E98292] relative overflow-hidden flex flex-col justify-center items-center py-12 lg:py-0">
            
            {/* Logo at the Top */}
            <div className="absolute top-8 left-0 w-full flex justify-center z-20">
              <img src="/logo.png" alt="Atharva University" className="h-28 object-contain" />
            </div>

            {/* Abstract Shapes */}
            <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
              <div className="absolute bottom-[-10%] left-[-10%] w-[80%] h-[80%] bg-gradient-to-tr from-[#F19391] to-transparent rounded-full blur-[100px]"></div>
              <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-gradient-to-bl from-[#4129B7] to-transparent rounded-full blur-[100px]"></div>
            </div>

            {/* Dashboard Slider */}
            <div className="z-10 w-full max-w-lg px-8 sm:pr-32 lg:pr-16 xl:pr-32 text-center relative h-[380px] mt-16 self-start">
              <div className="flex items-center justify-between mb-8">
                 <h2 className="text-3xl font-bold text-white text-left">Our Features</h2>
                 <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                   <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L13 13M1 13L13 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                   </svg>
                 </div>
              </div>
              
              <div className="relative w-full h-[250px]">
                {dashboardSlides.map((slide, slideIdx) => (
                  <div 
                    key={slideIdx} 
                    className={`absolute inset-0 grid grid-cols-2 gap-4 transition-all duration-700 ease-in-out transform ${
                      slideIdx === currentSlide ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 translate-x-8 pointer-events-none'
                    }`}
                  >
                    {/* First Card */}
                    <div className="bg-white rounded-2xl p-4 shadow-lg text-left h-[110px] z-20">
                      <div className="flex justify-between items-start mb-2">
                        <p className="text-gray-500 text-xs font-medium">{slide[0].title}</p>
                        <span className="text-gray-400">...</span>
                      </div>
                      <div className="flex justify-between items-end">
                        <div>
                          <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{slide[0].val}</h3>
                          <p className={`text-[10px] font-semibold flex items-center ${slide[0].isUp ? 'text-green-500' : 'text-red-500'}`}>
                            <svg className={`w-3 h-3 mr-1 ${!slide[0].isUp && 'transform rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                            {slide[0].change}
                          </p>
                        </div>
                        {/* Dummy Chart */}
                        <div className="hidden sm:flex items-end space-x-1 h-10">
                          <div className="w-1.5 bg-blue-100 rounded-t-sm h-4"></div>
                          <div className="w-1.5 bg-blue-200 rounded-t-sm h-6"></div>
                          <div className="w-1.5 bg-blue-300 rounded-t-sm h-5"></div>
                          <div className="w-1.5 bg-blue-400 rounded-t-sm h-8"></div>
                          <div className="w-1.5 bg-blue-500 rounded-t-sm h-10"></div>
                          <div className="w-1.5 bg-blue-600 rounded-t-sm h-7"></div>
                        </div>
                      </div>
                    </div>

                    {/* Second Card */}
                    <div className="bg-white rounded-2xl p-4 shadow-lg text-left h-[110px] z-20">
                      <div className="flex justify-between items-start mb-2">
                        <p className="text-gray-500 text-xs font-medium">{slide[1].title}</p>
                        <span className="text-gray-400">...</span>
                      </div>
                      <div className="flex justify-between items-end">
                        <div>
                          <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{slide[1].val}</h3>
                          <p className={`text-[10px] font-semibold flex items-center ${slide[1].isUp ? 'text-green-500' : 'text-red-500'}`}>
                            <svg className={`w-3 h-3 mr-1 ${!slide[1].isUp && 'transform rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                            {slide[1].change}
                          </p>
                        </div>
                        {/* Dummy Chart Line */}
                        <div className="hidden sm:flex w-16 h-8 items-center">
                          <svg viewBox="0 0 100 30" className="w-full h-full stroke-purple-500 fill-none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M0 20 Q 10 5, 20 15 T 40 25 T 60 10 T 80 20 T 100 5"></path>
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Third Card */}
                    <div className="bg-white rounded-2xl p-4 shadow-lg text-left col-span-1 h-[110px] z-20">
                      <div className="flex justify-between items-start mb-2">
                        <p className="text-gray-500 text-xs font-medium">{slide[2].title}</p>
                        <span className="text-gray-400">...</span>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <div>
                          <h3 className="text-lg sm:text-xl font-bold text-gray-900">{slide[2].val}</h3>
                          <p className={`text-[10px] font-semibold flex items-center ${slide[2].isUp ? 'text-green-500' : 'text-red-500'}`}>
                            <svg className={`w-3 h-3 mr-1 ${!slide[2].isUp && 'transform rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                            {slide[2].change}
                          </p>
                        </div>
                        {/* Circular Progress */}
                        <div className="hidden sm:flex w-10 h-10 rounded-full border-4 border-gray-100 items-center justify-center relative">
                          <svg className="absolute w-10 h-10 -rotate-90">
                            <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-blue-500" strokeDasharray="100" strokeDashoffset="36"></circle>
                          </svg>
                          <span className="text-[10px] font-bold text-gray-700">{slide[2].subtext}</span>
                        </div>
                      </div>
                    </div>

                    {/* Fourth Card */}
                    <div className="bg-white rounded-2xl p-4 shadow-lg text-left col-span-1 h-[110px] z-20">
                      <div className="flex justify-between items-start mb-2">
                        <p className="text-gray-500 text-xs font-medium">{slide[3].title}</p>
                        <span className="text-gray-400">...</span>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <div>
                          <h3 className="text-lg sm:text-xl font-bold text-gray-900">{slide[3].val}</h3>
                          <p className={`text-[10px] font-semibold flex items-center ${slide[3].isUp ? 'text-green-500' : 'text-red-500'}`}>
                            <svg className={`w-3 h-3 mr-1 ${!slide[3].isUp && 'transform rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                            {slide[3].change}
                          </p>
                        </div>
                        {/* Circular Progress */}
                        <div className="hidden sm:flex w-10 h-10 rounded-full border-4 border-gray-100 items-center justify-center relative">
                          <svg className="absolute w-10 h-10 -rotate-90">
                            <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-green-500" strokeDasharray="100" strokeDashoffset="72"></circle>
                          </svg>
                          <span className="text-[10px] font-bold text-gray-700">{slide[3].subtext}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Pagination Dots */}
              <div className="absolute bottom-[-10px] left-0 w-full flex justify-center space-x-2 px-4 z-20">
                {dashboardSlides.map((_, i) => (
                  <button 
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`h-1 rounded-full transition-all duration-500 focus:outline-none ${i === currentSlide ? 'w-8 bg-white' : 'w-4 bg-white/30 hover:bg-white/50'}`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Person Image Bottom Right */}
            <div className="absolute bottom-0 right-0 w-[55%] sm:w-[45%] md:w-[40%] lg:w-[50%] xl:w-[45%] z-30 pointer-events-none">
              <img src="/image.png" alt="Person" className="w-full h-auto object-contain object-bottom transform translate-x-[5%] translate-y-[2%]" />
            </div>

          </div>
        </div>

        {/* Right Form Section */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 sm:p-8 lg:p-8 relative z-40">
          <div className="w-full max-w-md my-auto">
            <h1 className="text-3xl font-semibold text-center text-gray-900 mb-2">Sign In to Account</h1>
            <p className="text-center text-blue-600 font-medium mb-6 text-sm">Start your 14-day free trial.</p>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-600 font-medium text-center">
                {error}
              </div>
            )}

            <form className="space-y-3" onSubmit={handleSubmit}>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@gmail.com"
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600" /> : <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">Remember Me</span>
                </label>
                <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-2.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white transition-colors mt-4 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black'}`}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <div className="mt-5">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or</span>
                </div>
              </div>

              <div className="mt-5 space-y-2">
                <button
                  type="button"
                  className="w-full flex items-center justify-center px-4 py-2 border border-gray-200 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-4 w-4 mr-2" />
                  Sign in with Google
                </button>
                <button
                  type="button"
                  className="w-full flex items-center justify-center px-4 py-2 border border-gray-200 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" alt="Facebook" className="h-4 w-4 mr-2" />
                  Continue with Facebook
                </button>
                <button
                  type="button"
                  className="w-full flex items-center justify-center px-4 py-2 border border-gray-200 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.19 2.31-.88 3.5-1.15 2.14-.39 3.99.37 5.05 2.05-4.14 2.39-3.4 8.01 1.05 9.87-.93 2.11-2.42 4.19-4.68 1.4zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                  </svg>
                  Continue with Apple
                </button>
              </div>
            </div>
            
            <p className="mt-6 text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
