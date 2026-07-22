import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Zap, User, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

export const RegisterPage = () => {
  const { registerUser } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState(location.state?.prefillEmail || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');

    // Register user in storage and grant access
    const result = registerUser(fullName, email, password);
    if (result.success) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      
      {/* SkyMart Centered Logo */}
      <div 
        onClick={() => navigate('/')}
        className="cursor-pointer flex items-center gap-3 mb-8 group"
      >
        <div className="w-12 h-12 rounded-2xl bg-[#BCFF4E] flex items-center justify-center text-[#0A0A0A] shadow-[0_0_20px_rgba(188,255,78,0.3)] group-hover:scale-105 transition-transform">
          <Zap className="w-7 h-7 fill-[#0A0A0A] stroke-[#0A0A0A]" />
        </div>
        <span className="font-headline text-3xl font-bold text-white">SkyMart</span>
      </div>

      {/* Centered Register Card */}
      <div className="w-full max-w-md bg-[#131313] border border-[#262626] rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6">
        
        <div className="space-y-1 text-left">
          <h2 className="font-headline font-bold text-3xl text-white">Create account</h2>
          <p className="text-sm font-body text-gray-400">Join SkyMart to access cyber storefront</p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-geist">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Full Name Input */}
          <div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                <User className="w-5 h-5" />
              </div>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full name"
                className="w-full bg-[#1A1A1A] border border-[#262626] focus:border-[#BCFF4E] rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none transition-colors font-body"
              />
            </div>
          </div>

          {/* Email Address Input */}
          <div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                <Mail className="w-5 h-5" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full bg-[#1A1A1A] border border-[#262626] focus:border-[#BCFF4E] rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none transition-colors font-body"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                <Lock className="w-5 h-5" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password (min 6 chars)"
                className="w-full bg-[#1A1A1A] border border-[#262626] focus:border-[#BCFF4E] rounded-xl pl-11 pr-11 py-3 text-sm text-white placeholder-gray-500 focus:outline-none transition-colors font-body"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-500 hover:text-gray-300"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Confirm Password Input */}
          <div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                <Lock className="w-5 h-5" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                className="w-full bg-[#1A1A1A] border border-[#262626] focus:border-[#BCFF4E] rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none transition-colors font-body"
              />
            </div>
          </div>

          {/* Primary Button */}
          <button
            type="submit"
            className="w-full py-3.5 px-6 bg-[#BCFF4E] text-[#0A0A0A] font-headline font-bold text-base rounded-xl hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(188,255,78,0.25)] mt-2"
          >
            Create Account & Verify
            <ArrowRight className="w-5 h-5 stroke-[2.5]" />
          </button>

        </form>

        {/* Link to Login */}
        <div className="text-center pt-2 text-xs font-geist text-gray-400">
          Already have a verified account?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-[#BCFF4E] font-bold hover:underline"
          >
            Sign in
          </button>
        </div>

      </div>
    </div>
  );
};
