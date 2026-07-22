import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Zap, Mail, Lock, Eye, EyeOff, ArrowRight, UserX, KeyRound, ShieldCheck } from 'lucide-react';

export const LoginPage = () => {
  const { verifyAndLogin } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorState, setErrorState] = useState(null); // { message, isRedirecting }

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setErrorState({ message: 'Please enter both email and password.', isRedirecting: false });
      return;
    }

    // Call strict verification function
    const result = verifyAndLogin(email, password);

    if (result.success) {
      setErrorState(null);
      navigate(from, { replace: true });
    } else {
      if (result.reason === 'USER_NOT_FOUND') {
        setErrorState({
          message: 'User account not found! Redirecting to Signup page...',
          isRedirecting: true
        });
        setTimeout(() => {
          navigate('/register', { state: { prefillEmail: email } });
        }, 1500);
      } else {
        setErrorState({
          message: result.message || 'Verification failed. Please check credentials.',
          isRedirecting: false
        });
      }
    }
  };

  const handleQuickDemoFill = (demoEmail, demoPass) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    const result = verifyAndLogin(demoEmail, demoPass);
    if (result.success) {
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Column: Brand Hero Banner */}
        <div className="space-y-8 text-left hidden lg:block pr-8 border-r border-[#262626]">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#BCFF4E] flex items-center justify-center text-[#0A0A0A] shadow-[0_0_15px_rgba(188,255,78,0.3)]">
              <Zap className="w-6 h-6 fill-[#0A0A0A] stroke-[#0A0A0A]" />
            </div>
            <span className="font-headline text-2xl font-bold text-white">SkyMart</span>
          </div>

          <div className="space-y-4">
            <span className="text-xs font-geist font-bold text-[#BCFF4E] tracking-widest uppercase block">
              STRICT AUTHENTICATION REQUIRED
            </span>
            <h1 className="font-headline font-extrabold text-5xl text-white tracking-tight leading-tight">
              Shop the future. <br />
              <span className="text-[#BCFF4E]">Today.</span>
            </h1>
            <p className="text-gray-400 font-body text-base max-w-md leading-relaxed">
              Account verification is required. If your username is not present in our database, you will be redirected to the Signup page.
            </p>
          </div>

          {/* Pre-verified demo accounts display */}
          <div className="bg-[#1A1A1A] border border-[#262626] rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-geist font-bold text-[#BCFF4E] uppercase">
              <ShieldCheck className="w-4 h-4" />
              Verified Demo Accounts
            </div>
            <div className="space-y-2 text-xs font-geist">
              <div 
                onClick={() => handleQuickDemoFill('user@skymart.com', 'password123')}
                className="p-2.5 rounded-xl bg-[#0A0A0A] border border-[#262626] hover:border-[#BCFF4E]/50 cursor-pointer flex justify-between items-center text-gray-300 hover:text-white transition-colors"
              >
                <span>user@skymart.com (password: password123)</span>
                <span className="text-[#BCFF4E] font-bold text-[11px]">Click to Sign In</span>
              </div>
              <div 
                onClick={() => handleQuickDemoFill('admin@skymart.com', 'password123')}
                className="p-2.5 rounded-xl bg-[#0A0A0A] border border-[#262626] hover:border-[#BCFF4E]/50 cursor-pointer flex justify-between items-center text-gray-300 hover:text-white transition-colors"
              >
                <span>admin@skymart.com (password: password123)</span>
                <span className="text-[#BCFF4E] font-bold text-[11px]">Click to Sign In</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Sign In Card */}
        <div className="w-full max-w-md mx-auto">
          <div className="bg-[#131313] border border-[#262626] rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6">
            
            <div className="space-y-1">
              <h2 className="font-headline font-bold text-3xl text-white">Sign in</h2>
              <p className="text-sm font-body text-gray-400">Enter your credentials for user verification</p>
            </div>

            {/* Error / Redirect Alert */}
            {errorState && (
              <div className={`p-4 rounded-2xl border text-xs font-geist space-y-2 animate-in fade-in duration-200 ${
                errorState.isRedirecting 
                  ? 'bg-amber-500/10 border-amber-500/40 text-amber-300' 
                  : 'bg-red-500/10 border-red-500/40 text-red-400'
              }`}>
                <div className="flex items-center gap-2 font-bold text-sm">
                  {errorState.isRedirecting ? <UserX className="w-5 h-5 text-amber-400" /> : <KeyRound className="w-5 h-5 text-red-400" />}
                  <span>{errorState.isRedirecting ? 'Account Not Found' : 'Verification Failed'}</span>
                </div>
                <p>{errorState.message}</p>
                {errorState.isRedirecting && (
                  <div className="w-full h-1 bg-amber-500/20 rounded-full overflow-hidden mt-1">
                    <div className="h-full bg-amber-400 animate-pulse w-full" />
                  </div>
                )}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Email / Username Input */}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
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

              {/* Primary Action Button */}
              <button
                type="submit"
                className="w-full py-3.5 px-6 bg-[#BCFF4E] text-[#0A0A0A] font-headline font-bold text-base rounded-xl hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(188,255,78,0.25)] mt-2"
              >
                Verify & Sign In
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </button>

            </form>

            {/* Link to Register */}
            <div className="text-center pt-2 text-xs font-geist text-gray-400">
              Don't have a verified account?{' '}
              <button
                onClick={() => navigate('/register')}
                className="text-[#BCFF4E] font-bold hover:underline"
              >
                Sign up here
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
