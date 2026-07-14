import React, { useState, useContext } from 'react';
import { UserIcon, LockClosedIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { FaFacebookF, FaApple } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../../../context/AuthContext";
import Nav from '../../../components/user/navbar/Nav';
import Footer from '../../../components/common/Footer/Footer';
import { ThemeContext } from './../../../context/ThemeContext';
import api from "../../../api/api"; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === "dark";

  // Handle email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (emailError) setEmailError("");
  };

  // Handle password input change
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (passwordError) setPasswordError("");
  };

  // Handle form submission
  const submitLogin = async (e) => {
  e.preventDefault();

  setEmailError("");
  setPasswordError("");

  let hasError = false;

  const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  if (!emailRegex.test(email.trim())) {
    setEmailError("Please enter a valid Gmail address (e.g., user@gmail.com).");
    hasError = true;
  }

  if (password.length < 8) {
    setPasswordError("Password must be at least 8 characters.");
    hasError = true;
  }

  if (hasError) return;

  try {
    const response = await api.post("/users/login", {
      email,
      password,
    });

    console.log("Login Success:", response.data);

    localStorage.setItem("token", response.data.token);
  
    login(response.data.token);

    // Redirect based on user role
    if (response.data.user.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  } catch (error) {
    console.error("Login Error:", error);

    if (error.response) {
      if (error.response.status === 401) {
        setEmailError("Invalid email or password.");
      } else if (error.response.status === 500) {
        setEmailError("Server error. Please try again later.");
      } else {
        setEmailError(error.response.data?.message || "Login failed.");
      }
    } else if (error.request) {
      setEmailError("Cannot connect to server. Please check your internet connection.");
    } else {
      setEmailError("An unexpected error occurred.");
    }
  }
};

  // Dynamic Theme Styling Classes
  const mainBg = isDarkMode ? "bg-black" : "bg-white";
  const cardBg = isDarkMode ? "bg-[#121212]" : "bg-white";
  const textTitle = isDarkMode ? "text-white" : "text-gray-900";
  const textNormal = isDarkMode ? "text-white" : "text-gray-500";
  const textLink = isDarkMode ? "text-white" : "text-black";
  const inputBg = isDarkMode ? "bg-dark" : "bg-gray-50";
  const borderDefault = isDarkMode ? "border-white" : "border-gray-200";
  const dividerLine = isDarkMode ? "border-white" : "border-gray-200";
  const socialBtnBg = isDarkMode ? "bg-[#1a1a1a] hover:bg-[#222222]" : "bg-gray-50 hover:bg-white";

  return (
    <div className={`flex flex-col min-h-screen ${mainBg} transition-colors duration-300`}>
      <Nav />

      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 mt-10">
        <div className={`max-w-md w-full space-y-8 p-8 rounded-xl`}>
          
          <div className="text-center">
            <h2 className={`mt-2 text-3xl font-extrabold tracking-tight ${textTitle}`}>
              Welcome Back to <span className="text-green">RahalCar</span>
            </h2>
          </div>

          <form className="mt-8 space-y-5" onSubmit={submitLogin}>
            {/* Email Input Container */}
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <UserIcon className="h-5 w-5 text-black dark:text-white" />
                </div>
                <input
                  id="email-address"
                  name="email"
                  autoComplete="email"
                  required
                  className={`appearance-none block w-full pl-12 pr-3 py-4 border rounded-xl placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm transition-colors ${inputBg} ${isDarkMode ? "text-white" : "text-black"} ${
                    emailError 
                      ? "border-red-500 focus:border-red-500" 
                      : `${borderDefault} focus:border-green`
                  }`}
                  placeholder="example@gmail.com"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              {emailError && <p className="text-red-500 text-xs mt-1 font-medium">{emailError}</p>}
            </div>

            {/* Password Input Container */}
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <LockClosedIcon className="h-5 w-5 text-black dark:text-white" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className={`appearance-none block w-full pl-12 pr-3 py-4 border rounded-xl placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm transition-colors ${inputBg} ${isDarkMode ? "text-white" : "text-black"} ${
                    passwordError 
                      ? "border-red-500 focus:border-red-500" 
                      : `${borderDefault} focus:border-green`
                  }`}
                  placeholder="•••••••••••••"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
              {passwordError && <p className="text-red-500 text-xs mt-1 font-medium">{passwordError}</p>}
            </div>

            {/* Options Panel */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-green focus:ring-green cursor-pointer"
                  style={{ accentColor: "#22c55e" }}
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label
                  htmlFor="remember-me"
                  className={`ml-2 block text-sm cursor-pointer select-none ${textNormal}`}
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className={`font-medium hover:underline ${textNormal}`}>
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-bold rounded-xl text-black bg-green hover:opacity-90 transition-all focus:outline-none active:scale-95"
              >
                <span className="flex items-center gap-2">
                  Sign in
                  <ArrowRightIcon className="w-4 h-4" />
                </span>
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className={`w-full border-t ${dividerLine}`}></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className={`px-2 ${cardBg} ${textNormal}`}>
                Or connect with your social account
              </span>
            </div>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-4 gap-3">
            <button className={`col-span-2 flex items-center justify-center gap-2 py-3 px-4 border rounded-xl shadow-sm text-sm font-medium transition-colors ${borderDefault} ${socialBtnBg} ${isDarkMode ? "text-white" : "text-gray-700"}`}>
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
              Sign in with Google
            </button>
            <button className={`col-span-1 flex items-center justify-center py-3 px-4 border rounded-xl shadow-sm text-sm font-medium bg-white text-blue-600 hover:bg-gray-50 transition-colors ${borderDefault} ${isDarkMode ? "!bg-[#1a1a1a] hover:!bg-[#222222]" : ""}`}>
              <FaFacebookF className="w-5 h-5" />
            </button>
            <button className={`col-span-1 flex items-center justify-center py-3 px-4 border rounded-xl shadow-sm text-sm font-medium transition-colors ${borderDefault} ${socialBtnBg} ${isDarkMode ? "text-white" : "text-black"}`}>
              <FaApple className="w-5 h-5" />
            </button>
          </div>

          {/* Sign Up Redirect */}
          <div className="text-center mt-8">
            <p className={`text-sm ${textNormal}`}>
              Don't have an account?{' '}
              <Link to="/register" className={`font-semibold hover:underline ${textLink}`}>
                Register Here!
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;