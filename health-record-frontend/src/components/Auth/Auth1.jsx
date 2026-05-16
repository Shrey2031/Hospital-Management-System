import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import logo from '../../images/welltrack logo.png';

const AuthPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    email: '',
    password: '',
    phone: '',
    role: 'patient'
  });
  const [registeredEmail, setRegisteredEmail] = useState('');
  const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api/v1/users`;
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (registeredEmail && formData.email === registeredEmail) {
      handleLogin();
    }
  }, [registeredEmail, formData.email]);

  const registerMutation = useMutation({
    mutationFn: (data) => axios.post(`${API_BASE_URL}/register`, data),
    onSuccess: (data) => {
      toast.success('Registration successful! Logging you in...');
      setRegisteredEmail(data.data.user.email);
      setIsRegister(false);
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || 'Registration failed');
    }
  });

  const loginMutation = useMutation({
    mutationFn: (data) => login(data),
    onSuccess: () => {
      navigate('/patient-dashboard');
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || 'Login failed');
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegister) {
      registerMutation.mutate(formData);
    } else {
      loginMutation.mutate({ email: formData.email, password: formData.password });
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = () => {
    loginMutation.mutate({ email: formData.email, password: formData.password });
  };

  const roles = [
    { id: 'patient', label: 'Patient', icon: '👤' },
    { id: 'doctor', label: 'Doctor', icon: '👨‍⚕️' },
    { id: 'facility', label: 'Facility', icon: '🏥' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 overflow-x-hidden">
      {/* Premium Layered Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-blue-500/8 to-purple-500/8 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-32 -left-32 w-[28rem] h-[28rem] bg-gradient-to-br from-purple-500/6 to-blue-500/6 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/4 left-10 w-48 h-48 bg-blue-400/4 rounded-full blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/4 right-20 w-40 h-40 bg-purple-400/4 rounded-full blur-xl animate-pulse" style={{animationDelay: '3s'}}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* Left Side - Branding */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:max-w-lg space-y-8"
          >
            <div className="bg-white/3/90 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-3xl ring-1 ring-white/5 p-8 lg:p-12 sticky top-20 lg:top-32">
              {/* Logo & Badge */}
              <div className="text-center space-y-6 mb-12">
            
                <div>
                  <div className="inline-flex items-center px-6 py-3 rounded-3xl bg-white/5/90 backdrop-blur-2xl border border-white/10 shadow-2xl ring-1 ring-white/5 mb-6 mx-auto">
                    <span className="text-sm font-medium tracking-wide text-blue-300/90 uppercase">
                      Smart. Secure. Simplified.
                    </span>
                  </div>
                  <h1 className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-white via-blue-50 to-blue-200 bg-clip-text text-transparent drop-shadow-lg mb-4">
                    MediCare+
                  </h1>
                  <p className="text-slate-400 text-lg font-medium">Health Records</p>
                </div>
              </div>

              <h2 className="text-4xl lg:text-5xl xl:text-6xl font-light leading-[0.95] tracking-tight mb-8">
                <span className="block font-extrabold bg-gradient-to-r from-white via-blue-50 to-blue-200 bg-clip-text text-transparent drop-shadow-lg">
                  Your Health Records,
                </span>
                <span className="block bg-gradient-to-r from-blue-400 via-violet-400 to-blue-500 bg-clip-text text-transparent drop-shadow-2xl tracking-tight">
                  Always Secure.
                </span>
              </h2>

              {/* Feature Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
                {[
                  { title: '🔒 Enterprise Security', desc: 'Bank-grade encryption' },
                  { title: '🚀 Instant Access', desc: '24/7 availability' },
                  { title: '📊 Smart Insights', desc: 'AI-powered analytics' },
                  { title: '🏥 Multi-Role', desc: 'Patients, Doctors, Facilities' },
                  { title: '⚡ Lightning Fast', desc: 'Optimized performance' },
                  { title: '🌐 Global Access', desc: 'Works everywhere' }
                ].map((feature, idx) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + idx * 0.1 }}
                    className="group p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-blue-500/25 ring-1 ring-white/5 hover:ring-blue-500/30"
                  >
                    <div className="text-2xl mb-3">{feature.title}</div>
                    <div className="text-sm text-gray-300/90 font-medium">{feature.desc}</div>
                  </motion.div>
                ))}
              </div>

              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-r from-blue-500/20 via-violet-500/20 to-blue-600/20 rounded-3xl backdrop-blur-xl border border-blue-500/30 shadow-2xl shadow-blue-500/20 mx-auto mb-6 p-6 flex items-center justify-center">
                  <svg className="w-16 h-16 text-blue-400 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11a9.39 9.39 0 0 0 9-11V7l-10-5z"/>
                  </svg>
                </div>
                <p className="text-gray-300/90 font-medium text-sm">Trusted by 50K+ healthcare professionals</p>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Auth Form */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-md mx-auto lg:mx-0 w-full"
          >
            <div className="bg-white/3/90 backdrop-blur-2xl border border-white/15 rounded-3xl shadow-2xl p-8 lg:p-12 ring-1 ring-white/10 relative overflow-hidden">
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>

              {/* Toggle Tabs */}
              <div className="flex bg-white/5/90 backdrop-blur-2xl rounded-3xl p-1 mb-8 border border-white/15 ring-1 ring-white/10">
                <motion.button
                  type="button"
                  onClick={() => setIsRegister(false)}
                  className={`flex-1 py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-500 ${
                    !isRegister
                      ? 'bg-white/10 backdrop-blur-xl border border-white/20 text-white shadow-xl shadow-blue-500/25 ring-1 ring-blue-500/30'
                      : 'text-gray-300/90 hover:text-white hover:bg-white/5'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Sign In
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => setIsRegister(true)}
                  className={`flex-1 py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-500 ${
                    isRegister
                      ? 'bg-white/10 backdrop-blur-xl border border-white/20 text-white shadow-xl shadow-blue-500/25 ring-1 ring-blue-500/30'
                      : 'text-gray-300/90 hover:text-white hover:bg-white/5'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Create Account
                </motion.button>
              </div>

              {/* Forms */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={isRegister ? 'register' : 'login'}
                  initial={{ opacity: 0, x: isRegister ? 20 : -20, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: isRegister ? -20 : 20, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <form onSubmit={handleSubmit}>
                    {!isRegister ? (
                      // LOGIN FORM
                      <>
                        <div>
                          <label className="block text-sm font-semibold text-gray-300/90 mb-3 tracking-wide uppercase">
                            Email Address
                          </label>
                          <input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full px-6 py-5 bg-white/5/90 backdrop-blur-2xl border border-white/15 rounded-3xl text-white/95 placeholder-gray-400/80 text-lg font-medium focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400/50 transition-all duration-500 shadow-xl ring-1 ring-white/10 hover:shadow-blue-500/20 hover:border-white/20"
                            placeholder="your@email.com"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-300/90 mb-3 tracking-wide uppercase">
                            Password
                          </label>
                          <div className="relative">
                            <input
                              name="password"
                              type={showPassword ? 'text' : 'password'}
                              value={formData.password}
                              onChange={handleInputChange}
                              required
                              className="w-full px-6 py-5 pr-12 bg-white/5/90 backdrop-blur-2xl border border-white/15 rounded-3xl text-white/95 placeholder-gray-400/80 text-lg font-medium focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400/50 transition-all duration-500 shadow-xl ring-1 ring-white/10 hover:shadow-blue-500/20 hover:border-white/20"
                              placeholder="••••••••"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white p-1 rounded-xl transition-colors"
                            >
                              {showPassword ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                              ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                </svg>
                              )}
                            </button>
                          </div>
                        </div>

                        <motion.button
                          type="submit"
                          disabled={loginMutation.isPending}
                          className="group relative w-full mt-4  bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl py-5 px-8 font-semibold text-lg shadow-2xl ring-1 ring-white/10 hover:shadow-blue-500/25 hover:border-blue-400/50 hover:ring-blue-500/30 transition-all duration-500 transform hover:-translate-y-1 hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {loginMutation.isPending ? (
                            <>
                              <svg className="w-5 h-5 animate-spin mx-auto" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              <span className="ml-2">Signing In...</span>
                            </>
                          ) : (
                            <>
                              <span className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                              <span className="relative text-white/95 backdrop-blur-sm">Sign In Securely</span>
                            </>
                          )}
                        </motion.button>
                      </>
                    ) : (
                      // REGISTER FORM
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-semibold text-gray-300/90 mb-3 tracking-wide uppercase">
                              Full Name
                            </label>
                            <input
                              name="fullname"
                              value={formData.fullname}
                              onChange={handleInputChange}
                              required
                              className="w-full px-6 py-5 bg-white/5/90 backdrop-blur-2xl border border-white/15 rounded-3xl text-white/95 placeholder-gray-400/80 text-lg font-medium focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400/50 transition-all duration-500 shadow-xl ring-1 ring-white/10 hover:shadow-blue-500/20 hover:border-white/20"
                              placeholder="John Doe"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-300/90 mb-3 tracking-wide uppercase">
                              Phone
                            </label>
                            <input
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              className="w-full px-6 py-5 bg-white/5/90                               backdrop-blur-2xl border border-white/15 rounded-3xl text-white/95 placeholder-gray-400/80 text-lg font-medium focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400/50 transition-all duration-500 shadow-xl ring-1 ring-white/10 hover:shadow-blue-500/20 hover:border-white/20"
                              placeholder="+1 (555) 000-0000"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-300/90 mb-3 tracking-wide uppercase">
                            Username
                          </label>
                          <input
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            required
                            className="w-full px-6 py-5 bg-white/5/90 backdrop-blur-2xl border border-white/15 rounded-3xl text-white/95 placeholder-gray-400/80 text-lg font-medium focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400/50 transition-all duration-500 shadow-xl ring-1 ring-white/10 hover:shadow-blue-500/20 hover:border-white/20"
                            placeholder="@yourusername"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-300/90 mb-3 tracking-wide uppercase">
                            Email
                          </label>
                          <input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full px-6 py-5 bg-white/5/90 backdrop-blur-2xl border border-white/15 rounded-3xl text-white/95 placeholder-gray-400/80 text-lg font-medium focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400/50 transition-all duration-500 shadow-xl ring-1 ring-white/10 hover:shadow-blue-500/20 hover:border-white/20"
                            placeholder="your@email.com"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-300/90 mb-3 tracking-wide uppercase">
                            Role
                          </label>
                          <div className="grid grid-cols-3 gap-4 mb-6">
                            {roles.map((role) => (
                              <motion.button
                                key={role.id}
                                type="button"
                                className={`group p-4 rounded-2xl border-2 transition-all duration-500 flex flex-col items-center gap-2 shadow-xl ring-1 ring-white/10 h-24 ${
                                  formData.role === role.id
                                    ? 'bg-white/10 backdrop-blur-xl border-blue-400/50 text-white shadow-2xl shadow-blue-500/25 ring-blue-500/30'
                                    : 'bg-white/5 backdrop-blur-xl border-white/15 text-gray-300/90 hover:bg-white/10 hover:border-white/20 hover:text-white'
                                } hover:shadow-blue-500/20 hover:scale-[1.02]`}
                                onClick={() => setFormData({ ...formData, role: role.id })}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <span className="text-2xl group-hover:scale-110 transition-transform duration-300">{role.icon}</span>
                                <span className="text-xs font-semibold tracking-wide leading-tight">{role.label}</span>
                              </motion.button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-300/90 mb-3 tracking-wide uppercase">
                            Password
                          </label>
                          <div className="relative">
                            <input
                              name="password"
                              type={showPassword ? 'text' : 'password'}
                              value={formData.password}
                              onChange={handleInputChange}
                              required
                              className="w-full px-6 py-5 pr-12 bg-white/5/90 backdrop-blur-2xl border border-white/15 rounded-3xl text-white/95 placeholder-gray-400/80 text-lg font-medium focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400/50 transition-all duration-500 shadow-xl ring-1 ring-white/10 hover:shadow-blue-500/20 hover:border-white/20"
                              placeholder="Create secure password"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white p-1 rounded-xl transition-colors"
                            >
                              {showPassword ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                              ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                </svg>
                              )}
                            </button>
                          </div>
                        </div>

                        <motion.button
                          type="submit"
                          disabled={registerMutation.isPending}
                          className="group relative w-full mt-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl py-5 px-8 font-semibold text-lg shadow-2xl ring-1 ring-white/10 hover:shadow-blue-500/25 hover:border-blue-400/50 hover:ring-blue-500/30 transition-all duration-500 transform hover:-translate-y-1 hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {registerMutation.isPending ? (
                            <>
                              <svg className="w-5 h-5 animate-spin mx-auto" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              <span className="ml-2">Creating Account...</span>
                            </>
                          ) : (
                            <>
                              <span className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                              <span className="relative text-white/95 backdrop-blur-sm">Create Account</span>
                            </>
                          )}
                        </motion.button>
                      </>
                    )}
                  </form>
                </motion.div>
              </AnimatePresence>

              {/* Footer Text */}
              <div className="mt-12 pt-8 border-t border-white/10 text-center">
                <p className="text-sm text-gray-400/80">
                  By signing up, you agree to our{' '}
                  <span className="text-blue-400 hover:text-blue-300 cursor-pointer font-medium">Terms of Service</span> and{' '}
                  <span className="text-blue-400 hover:text-blue-300 cursor-pointer font-medium">Privacy Policy</span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;