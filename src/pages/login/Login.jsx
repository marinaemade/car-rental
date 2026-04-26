import React, { useState } from 'react';
// Heroicons for UI icons
import { UserIcon, LockClosedIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
// React Icons for Brand icons (Facebook, Apple)
import { FaFacebookF, FaApple } from 'react-icons/fa';
// Using it to gro to sign up page if the user doesn't have an account
import { Link } from 'react-router-dom';

import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  //when the user clicks on submit button
  const submitLogin = (e) => { 
    if (false){
    }
    else{
      //send data to BackEnd

      //data
      const data = jwtDecode({/*"token"*/});
      console.log(data);
    }
  };



  return (
    <>

      {/* --- Main Content --- */}
      <main className="flex-grow flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white">
          
          <div className="text-center">
            <div className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4" style={{ backgroundColor: '#16a34a30', color: 'black' }}>
              Sign in
            </div>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900">
              Welcome Back
            </h2>
          </div>

          <form className="mt-8 space-y-5" onSubmit={submitLogin}>
            
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
                  style={{ accentColor: '#16a34a' }} // ← غيرتي اللون هنا
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
                className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-bold rounded-xl text-black bg-[#22c55e] hover:opacity-90 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2"
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
              <Link 
                to="/register"
                className="font-semibold text-black hover:underline"
              >
                Register Here!
              </Link>
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Login;