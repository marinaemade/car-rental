import React, { use, useContext, useEffect, useState } from 'react';
// Heroicons for UI icons
import { UserIcon, LockClosedIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
// React Icons for Brand icons (Facebook, Apple)
import { FaFacebookF, FaApple } from 'react-icons/fa';
// Using it to gro to sign up page if the user doesn't have an account
import { Link, useNavigate } from 'react-router-dom';

import { jwtDecode } from "jwt-decode";
//Auth Context
import AuthContext, { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { login } = useAuth()
  const navigate = useNavigate()

  //when the user clicks on submit button
  const submitLogin = (e) => { 
    e.preventDefault();

    setEmailError("");
    setPasswordError("");

    // email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (!emailRegex.test(email.trim())) {
      setEmailError("Please enter a valid Gmail address");
      return;
    }

    // password validation
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return;
    }

    // fake decode (placeholder)
    // const data = jwtDecode(token);
    // console.log(data);

    console.log("Login success:", { email, password, rememberMe });
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

          <form
            className="mt-8 space-y-5"
            onSubmit={submitLogin}
            noValidate
          >
                      
            {/*email*/}
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <UserIcon className="h-5 w-5" />
                </div>
                <input
                  id="email-address"
                  name="email"
                  type="text"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full pl-12 pr-3 py-4 border border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-green-500 sm:text-sm bg-gray-50"
                  placeholder="Email / Username"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError("");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

                      if (!emailRegex.test(email)) {
                        
                        setEmailError("Please enter a valid Gmail address.");
                      }
                    }
                  }}
                                
                      />
                    </div>
                    {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
                  </div>

            
            {/*password*/}
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
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError("");
                  }}
                />
              </div>
              {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-green-600"
                />
                <label className="ml-2 text-sm text-gray-500">
                  Remember me
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex justify-center py-4 text-sm font-bold rounded-xl text-black bg-[#22c55e]"
            >
              Sign in
              <ArrowRightIcon className="w-4 h-4 ml-2" />
            </button>
          </form>

        </div>
      </main>
    </>
  );
};

export default Login;