import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation, Link } from 'react-router-dom';
import { useApp, currencies } from '../context/AppContext';
import { ShoppingBag, User, Zap, Menu, X, LogOut, ChevronDown, Heart, Package, Palette, Scale, Bot, DollarSign, Lock } from 'lucide-react';

export const Navbar = () => {
  const { 
    cartItemCount, 
    wishlist, 
    toggleCart, 
    user, 
    logout,
    accentTheme,
    setAccentTheme,
    currency,
    setCurrency,
    compareList,
    toggleCyberBot
  } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/shop', label: 'Shop' },
    { path: '/about', label: 'About' },
  ];

  const themes = [
    { key: 'lime', label: 'Cyber Lime', color: '#BCFF4E' },
    { key: 'crimson', label: 'Neon Crimson', color: '#FF3366' },
    { key: 'emerald', label: 'Electric Emerald', color: '#00FF9D' },
    { key: 'amber', label: 'Solar Amber', color: '#FFB800' }
  ];

  // If user is NOT logged in or currently on /login or /register page, show minimal Auth Navbar
  if (!user || isAuthPage) {
    return (
      <header className="sticky top-0 z-40 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#262626] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link 
            to="/"
            className="flex items-center gap-3 focus:outline-none group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#BCFF4E] flex items-center justify-center text-[#0A0A0A] shadow-[0_0_15px_rgba(188,255,78,0.3)] group-hover:scale-105 transition-transform duration-200">
              <Zap className="w-6 h-6 fill-[#0A0A0A] stroke-[#0A0A0A]" />
            </div>
            <span className="font-headline text-2xl font-bold tracking-tight text-white group-hover:text-[#BCFF4E] transition-colors">
              SkyMart
            </span>
          </Link>

          {/* Right minimal auth links */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-geist text-gray-400 hidden sm:inline-flex items-center gap-1.5 bg-[#1A1A1A] border border-[#262626] px-3 py-1.5 rounded-full">
              <Lock className="w-3.5 h-3.5 text-[#BCFF4E]" />
              Secure Gateway
            </span>

            {location.pathname === '/register' ? (
              <button
                onClick={() => navigate('/login')}
                className="px-4 py-2 bg-[#BCFF4E] text-[#0A0A0A] font-bold text-xs font-geist rounded-full hover:brightness-110 shadow-[0_0_12px_rgba(188,255,78,0.2)]"
              >
                Sign In
              </button>
            ) : (
              <button
                onClick={() => navigate('/register')}
                className="px-4 py-2 bg-[#BCFF4E] text-[#0A0A0A] font-bold text-xs font-geist rounded-full hover:brightness-110 shadow-[0_0_12px_rgba(188,255,78,0.2)]"
              >
                Create Account
              </button>
            )}
          </div>

        </div>
      </header>
    );
  }

  // Full Protected Navbar for Logged-In Users
  return (
    <header className="sticky top-0 z-40 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#262626] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 relative flex items-center justify-between">
        
        {/* 1. Left Section: Logo */}
        <div className="flex items-center">
          <Link 
            to="/"
            className="flex items-center gap-3 shrink-0 focus:outline-none group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#BCFF4E] flex items-center justify-center text-[#0A0A0A] shadow-[0_0_15px_rgba(188,255,78,0.3)] group-hover:scale-105 transition-transform duration-200">
              <Zap className="w-6 h-6 fill-[#0A0A0A] stroke-[#0A0A0A]" />
            </div>
            <span className="font-headline text-2xl font-bold tracking-tight text-white group-hover:text-[#BCFF4E] transition-colors">
              SkyMart
            </span>
          </Link>
        </div>

        {/* 2. Center Section: Navigation Links (ABSOLUTE MATHEMATICAL DEAD CENTER) */}
        <nav className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `font-body text-base font-semibold transition-colors relative py-1 focus:outline-none ${
                  isActive 
                    ? 'text-[#BCFF4E]' 
                    : 'text-gray-300 hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#BCFF4E] rounded-full shadow-[0_0_8px_#BCFF4E]" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* 3. Right Section: Streamlined Action Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          
          {/* Currency Switcher */}
          <div className="relative hidden lg:block">
            <button
              onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
              className="h-9 px-3 rounded-full bg-[#1A1A1A] border border-[#262626] hover:border-[#BCFF4E] text-xs font-geist text-white flex items-center gap-1 transition-all focus:outline-none"
              title="Live Currency Switcher"
            >
              <DollarSign className="w-3.5 h-3.5 text-[#BCFF4E]" />
              <span className="font-bold">{currency}</span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </button>

            {currencyDropdownOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-[#1A1A1A] border border-[#262626] rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in duration-150">
                <div className="px-3 py-1 border-b border-[#262626] text-[10px] font-geist text-gray-400 font-bold uppercase">
                  Select Currency
                </div>
                {Object.keys(currencies).map((code) => (
                  <button
                    key={code}
                    onClick={() => {
                      setCurrency(code);
                      setCurrencyDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-1.5 text-xs font-geist flex items-center justify-between transition-colors ${
                      currency === code ? 'text-[#BCFF4E] font-bold bg-[#262626]' : 'text-gray-300 hover:bg-[#262626]'
                    }`}
                  >
                    <span>{currencies[code].label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* AI CyberBot Trigger */}
          <button
            onClick={toggleCyberBot}
            className="w-9 h-9 rounded-full bg-[#1A1A1A] border border-[#262626] hover:border-[#BCFF4E] text-[#BCFF4E] flex items-center justify-center transition-all focus:outline-none group shrink-0"
            title="AI Shopping Assistant"
          >
            <Bot className="w-4 h-4 transition-transform group-hover:scale-110" />
          </button>

          {/* Accent Theme Switcher */}
          <div className="relative shrink-0">
            <button
              onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
              className="w-9 h-9 rounded-full bg-[#1A1A1A] border border-[#262626] hover:border-[#BCFF4E] text-gray-300 hover:text-[#BCFF4E] flex items-center justify-center transition-all focus:outline-none"
              title="Change Cyber Accent Color"
            >
              <Palette className="w-4 h-4 text-[#BCFF4E]" />
            </button>

            {themeDropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-[#1A1A1A] border border-[#262626] rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in duration-150">
                <div className="px-3 py-1.5 border-b border-[#262626] text-[11px] font-geist text-gray-400 font-bold uppercase">
                  Accent Palette
                </div>
                {themes.map(t => (
                  <button
                    key={t.key}
                    onClick={() => {
                      setAccentTheme(t.key);
                      setThemeDropdownOpen(false);
                    }}
                    className="w-full text-left px-3.5 py-2 text-xs font-geist flex items-center justify-between text-gray-200 hover:bg-[#262626] transition-colors"
                  >
                    <span>{t.label}</span>
                    <span className="w-3.5 h-3.5 rounded-full border border-white/20" style={{ backgroundColor: t.color }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Wishlist Link */}
          <button
            onClick={() => navigate('/wishlist')}
            className="relative w-9 h-9 rounded-full bg-[#1A1A1A] border border-[#262626] hover:border-[#BCFF4E] text-white hover:text-[#BCFF4E] flex items-center justify-center transition-all focus:outline-none group shrink-0"
            aria-label="Wishlist"
            title="Saved Wishlist"
          >
            <Heart className={`w-4 h-4 transition-transform group-hover:scale-110 ${wishlist.length > 0 ? 'fill-[#BCFF4E] stroke-[#BCFF4E]' : ''}`} />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#BCFF4E] text-[#0A0A0A] font-geist font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-[0_0_8px_rgba(188,255,78,0.5)]">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Icon Button */}
          <button
            onClick={toggleCart}
            className="relative w-9 h-9 rounded-full bg-[#1A1A1A] border border-[#262626] hover:border-[#BCFF4E] text-white hover:text-[#BCFF4E] flex items-center justify-center transition-all focus:outline-none group shrink-0"
            aria-label="Open Cart"
          >
            <ShoppingBag className="w-4 h-4 transition-transform group-hover:scale-110" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#BCFF4E] text-[#0A0A0A] font-geist font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-[0_0_8px_rgba(188,255,78,0.5)]">
                {cartItemCount}
              </span>
            )}
          </button>

          {/* User Profile / Auth Avatar */}
          <div className="relative shrink-0">
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="w-9 h-9 rounded-full bg-[#1A1A1A] border border-[#262626] hover:border-[#BCFF4E] text-white flex items-center justify-center transition-all focus:outline-none"
              title={`Signed in as ${user.name}`}
            >
              <div className="w-7 h-7 rounded-full bg-[#BCFF4E]/20 text-[#BCFF4E] font-geist font-bold text-xs flex items-center justify-center border border-[#BCFF4E]/40">
                {user.name.charAt(0).toUpperCase()}
              </div>
            </button>

            {userDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-[#1A1A1A] border border-[#262626] rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in duration-150">
                <div className="px-4 py-2 border-b border-[#262626]">
                  <p className="text-xs text-gray-400">Signed in as</p>
                  <p className="text-sm font-semibold text-white truncate">{user.name}</p>
                  <p className="text-[11px] text-gray-400 truncate">{user.email}</p>
                </div>
                <button
                  onClick={() => {
                    setUserDropdownOpen(false);
                    navigate('/orders');
                  }}
                  className="w-full text-left px-4 py-2 text-xs font-geist text-gray-300 hover:bg-[#262626] flex items-center gap-2"
                >
                  <Package className="w-4 h-4 text-[#BCFF4E]" />
                  Order History & Tracking
                </button>
                <button
                  onClick={() => {
                    setUserDropdownOpen(false);
                    navigate('/wishlist');
                  }}
                  className="w-full text-left px-4 py-2 text-xs font-geist text-gray-300 hover:bg-[#262626] flex items-center gap-2"
                >
                  <Heart className="w-4 h-4 text-[#BCFF4E]" />
                  Wishlist ({wishlist.length})
                </button>
                {compareList.length > 0 && (
                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      navigate('/compare');
                    }}
                    className="w-full text-left px-4 py-2 text-xs font-geist text-gray-300 hover:bg-[#262626] flex items-center gap-2"
                  >
                    <Scale className="w-4 h-4 text-[#BCFF4E]" />
                    Comparison ({compareList.length})
                  </button>
                )}
                <button
                  onClick={() => {
                    setUserDropdownOpen(false);
                    logout();
                    navigate('/login');
                  }}
                  className="w-full text-left px-4 py-2 text-xs font-geist text-red-400 hover:bg-[#262626] flex items-center gap-2 transition-colors border-t border-[#262626] mt-1 pt-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-9 h-9 rounded-xl bg-[#1A1A1A] border border-[#262626] text-gray-300 hover:text-white flex items-center justify-center shrink-0"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#131313] border-b border-[#262626] px-4 pt-2 pb-6 space-y-3">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block w-full text-left py-2.5 px-3 rounded-lg text-base font-medium transition-colors ${
                  isActive
                    ? 'bg-[#1A1A1A] text-[#BCFF4E] border border-[#BCFF4E]/30'
                    : 'text-gray-300 hover:bg-[#1A1A1A] hover:text-white'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <button
            onClick={() => {
              navigate('/wishlist');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2.5 px-3 rounded-lg text-gray-300 hover:bg-[#1A1A1A]"
          >
            Wishlist ({wishlist.length})
          </button>
          <button
            onClick={() => {
              navigate('/orders');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2.5 px-3 rounded-lg text-gray-300 hover:bg-[#1A1A1A]"
          >
            Order History & Tracking
          </button>
        </div>
      )}
    </header>
  );
};
