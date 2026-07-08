import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Mail, Lock, EyeOff, Eye } from 'lucide-react';
import { loginUser, clearError } from '../authSlice';

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    rememberMe: false
  });

  const testimonials = [
    { 
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio suscipit ea sed temporibus illum. Odit exercitationem sed beatae harum! Alias, doloremque repellat. Reiciendis, nam sed. Numquam, quo! Ipsa, tempore et.", 
      name: "Beth Holland", 
      avatar: "https://i.pravatar.cc/150?img=47" 
    },
    { 
      text: "The platform has completely revolutionized how we handle our tasks. It's incredibly intuitive and the new features are a game changer for our productivity.", 
      name: "John Doe", 
      avatar: "https://i.pravatar.cc/150?img=11" 
    },
    { 
      text: "I've tried many alternatives, but this one stands out due to its flawless design and robust functionality. Highly recommended to any growing team.", 
      name: "Sarah Smith", 
      avatar: "https://i.pravatar.cc/150?img=32" 
    },
    { 
      text: "Exceptional support and a constantly improving feature set. We've seen a 40% increase in efficiency since we started using this system.", 
      name: "Michael Brown", 
      avatar: "https://i.pravatar.cc/150?img=60" 
    },
    { 
      text: "Simple, elegant, and powerful. The analytics dashboard alone is worth it. It gives us clear insights into our daily operations.", 
      name: "Emily White", 
      avatar: "https://i.pravatar.cc/150?img=5" 
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

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
        {/* Left Form Section */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 sm:p-8 lg:p-8">
          <div className="w-full max-w-md my-auto">
            <h1 className="text-3xl font-semibold text-center text-gray-900 mb-2">Sign Up to Account</h1>
            <p className="text-center text-blue-600 font-medium mb-6 text-sm">Start your 14-day free trial.</p>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-600 font-medium text-center">
                {error}
              </div>
            )}

            <form className="space-y-3" onSubmit={handleSubmit}>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Username</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="username"
                    required
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Username"
                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl focus:ring-black focus:border-black sm:text-sm bg-gray-50/50"
                  />
                </div>
              </div>

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
                    placeholder="Email"
                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl focus:ring-black focus:border-black sm:text-sm bg-gray-50/50"
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
                    placeholder="Enter Password"
                    className="block w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-xl focus:ring-black focus:border-black sm:text-sm bg-gray-50/50"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <Eye className="h-5 w-5 text-gray-400" /> : <EyeOff className="h-5 w-5 text-gray-400" />}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="rememberMe"
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded cursor-pointer accent-black"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember Me
                  </label>
                </div>
                <div className="text-sm">
                  <span className="text-blue-600 cursor-pointer hover:underline">Terms and Policy</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-2.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white transition-colors mt-4 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black'}`}
              >
                {loading ? 'Creating...' : 'Create Account'}
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
              Already have an account?{' '}
              <Link to="/signin" className="font-medium text-blue-600 hover:text-blue-500">
                Sign In
              </Link>
            </p>
          </div>
        </div>

        {/* Right Feature Section */}
        <div className="flex w-full lg:w-1/2 p-4 mt-8 lg:mt-0">
          <div className="w-full h-full rounded-[24px] bg-gradient-to-br from-[#1E112A] via-[#811953] to-[#251A46] relative overflow-hidden flex flex-col justify-center items-center py-12 lg:py-0">
            
            {/* Abstract Shapes */}
            <div className="absolute top-0 left-0 w-full h-full opacity-50 pointer-events-none">
              <div className="absolute top-[-10%] right-[-10%] w-[80%] h-[80%] bg-gradient-to-br from-[#FF2E93] to-transparent rounded-full blur-[100px]"></div>
              <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-gradient-to-tr from-[#4129B7] to-transparent rounded-full blur-[100px]"></div>
            </div>

            <div className="z-10 w-full max-w-md px-8 text-center">
              <h2 className="text-3xl font-bold text-white mb-12 text-left">New Features</h2>
              
              <div className="relative h-[220px]">
                {testimonials.map((testi, index) => (
                  <div 
                    key={index} 
                    className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
                      index === currentSlide ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
                    }`}
                  >
                    <div className="bg-white rounded-2xl p-6 shadow-xl text-left h-full flex flex-col justify-between relative">
                      <div className="absolute top-4 right-4 text-gray-400 cursor-pointer hover:text-gray-600">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed mb-6">
                        {testi.text}
                      </p>
                      <div className="flex items-center">
                        <img src={testi.avatar} alt={testi.name} className="w-10 h-10 rounded-full mr-3 border border-gray-100" />
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900">{testi.name}</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Pagination Dots */}
              <div className="flex justify-center mt-12 space-x-2">
                {testimonials.map((_, i) => (
                  <button 
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`h-1 rounded-full transition-all duration-500 focus:outline-none ${i === currentSlide ? 'w-8 bg-white' : 'w-4 bg-white/30 hover:bg-white/50'}`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
