import React, { useState } from 'react';
// Heroicons for UI icons
import { UserIcon, LockClosedIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
// React Icons for Brand icons (Facebook, Apple)
import { FaFacebookF, FaApple } from 'react-icons/fa';

// Define the exact green color from the design
const BRAND_COLOR = '#64ff4f'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password, rememberMe });
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800 bg-white">
      {/* --- Navigation Bar --- */}
      <header className="border-b border-gray-100 sticky top-0 bg-white z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center gap-2">
              {/* Simple Steering Wheel Icon Placeholder */}
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ color: BRAND_COLOR }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                  <path d="M2 12h20"></path>
                </svg>
              </div>
              <span className="text-2xl font-bold tracking-tight">RahalCar</span>
            </div>

          
            <nav className="hidden md:flex space-x-6 text-sm font-medium">
              {['Home', 'Vehicles', 'Dealers', 'Shop', 'Pages', 'News', 'Contact'].map((item) => (
                <button key={item} className="hover:text-green-500 transition-colors flex items-center gap-1">
                  {item}
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
              ))}
            </nav>

            
            <div className="flex items-center gap-3">
              <button className="font-medium text-sm hover:text-green-500">Sign in</button>
              <button className="px-5 py-2.5 text-sm font-semibold rounded-xl text-black bg-[#22c55e] hover:opacity-90 transition-opacity">
                Add Listing
              </button>
              <button className="p-2.5 rounded-xl hover:bg-gray-100 transition-colors" style={{ color: BRAND_COLOR }}>
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* --- Main Content --- */}
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white">
          
          <div className="text-center">
       
       

            <div className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4" style={{ backgroundColor: '#16a34a30', color: 'black' }}>
              Sign in
            </div>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900">
              Welcome back
            </h2>
          </div>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            
     
     
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <UserIcon className="h-5 w-5" />
                </div>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full pl-12 pr-3 py-4 border border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-green-500 sm:text-sm bg-gray-50"
                  placeholder="Email / Username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

           
           
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <LockClosedIcon className="h-5 w-5" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full pl-12 pr-3 py-4 border border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-green-500 sm:text-sm bg-gray-50"
                  placeholder="•••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500 cursor-pointer"
                  style={{ accentColor: BRAND_COLOR }}
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-500 cursor-pointer">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium hover:underline text-gray-500">
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button type="submit" 
                className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-bold rounded-xl text-black bg-green-400 hover:opacity-90 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2"
              >
                <span className="flex items-center gap-2">
                  Sign in
                  <ArrowRightIcon className="w-4 h-4" />
                </span>
              </button>
            </div>
          </form>

          {/* Social Login Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or connect with your social account</span>
            </div>
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-4 gap-3">
            <button className="col-span-2 flex items-center justify-center gap-2 py-3 px-4 border border-gray-200 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-gray-50 hover:bg-white transition-colors">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
              Sign up with Google
            </button>
            <button className="col-span-1 flex items-center justify-center py-3 px-4 border border-gray-200 rounded-xl shadow-sm text-sm font-medium text-blue-600 bg-white hover:bg-gray-50 transition-colors">
              <FaFacebookF className="w-5 h-5" />
            </button>
            <button className="col-span-1 flex items-center justify-center py-3 px-4 border border-gray-200 rounded-xl shadow-sm text-sm font-medium text-black bg-white hover:bg-gray-50 transition-colors">
              <FaApple className="w-5 h-5" />
            </button>
          </div>

          {/* Footer Register Link */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500">
              Don't have an account?{' '}
              <a href="#" className="font-semibold text-black hover:underline">
                Register Here!
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;