import React, { useState, useContext } from 'react';
import { UserIcon, LockClosedIcon, ArrowRightIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { FaFacebookF, FaApple } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Nav from '../../../components/user/navbar/Nav';
import Footer from '../../../components/common/Footer/Footer';
import { ThemeContext } from './../../../context/ThemeContext';
import api from "../../../api/api"; 
import { useAuth } from "../../../context/AuthContext";

const SignUp = () => {
  const { login } = useAuth();
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [fullNameError, setFullNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [termsError, setTermsError] = useState('');

  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === "dark";

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setFullNameError('');
    setPhoneError('');
    setEmailError('');
    setPasswordError('');
    setTermsError('');

    let hasError = false;

    // Validate full name
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!fullName.trim()) {
      setFullNameError('Full name is required.');
      hasError = true;
    } else if (!nameRegex.test(fullName)) {
      setFullNameError('Full name must contain only letters and spaces.');
      hasError = true;
    }

    // Validate phone number
    const phoneRegex = /^01[0125][0-9]{8}$/;
    if (!phoneRegex.test(phoneNumber)) {
      setPhoneError('Phone number must be exactly 11 digits and start with 010, 011, 012, or 015.');
      hasError = true;
    }

    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailRegex.test(email.trim())) {
      setEmailError('Please enter a valid Gmail address (e.g., user@gmail.com).');
      hasError = true;
    }

    // Validate password length
    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters.');
      hasError = true;
    }

    // Validate terms agreement
    if (!agreeTerms) {
      setTermsError('You must agree to the Terms & Conditions.');
      hasError = true;
    }

    // If no validation errors, send request to backend
    if (!hasError) {
      try {
        const response = await api.post("/users/register", {
          name: fullName,
          email,
          password,
          phone: phoneNumber,
          address: "",
        });

        console.log("Register Success:", response.data);

        // Redirect to login page after successful registration
        navigate("/login");
      } catch (error) {
        console.log("Register Error:", error.response?.data || error.message);
        
        // Handle specific error responses from backend
        if (error.response?.status === 409) {
          if (error.response.data?.fields?.includes('email')) {
            setEmailError('This email is already registered. Please login instead.');
          } else if (error.response.data?.fields?.includes('phone')) {
            setPhoneError('This phone number is already registered.');
          } else {
            setEmailError('This email or phone is already registered.');
          }
        } else if (error.response?.status === 500) {
          setEmailError('Server error. Please try again later.');
        } else {
          alert(error.response?.data?.message || "Registration failed");
        }
      }
    }
  };

  // Handle full name input (allow only letters and spaces)
  const handleFullNameChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
    setFullName(value);
    if (fullNameError) setFullNameError('');
  };

  // Handle phone number input (allow only digits, max 11)
  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 11);
    setPhoneNumber(value);
    if (phoneError) setPhoneError('');
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
  const googleBtnBg = isDarkMode ? "bg-neutral-950 hover:bg-neutral-900 text-white" : "bg-gray-50 hover:bg-white text-gray-700";
  const facebookBtnBg = isDarkMode ? "bg-neutral-950 hover:bg-neutral-900 text-blue-500" : "bg-white hover:bg-gray-50 text-blue-600";
  const appleBtnBg = isDarkMode ? "bg-neutral-950 hover:bg-neutral-900 text-white" : "bg-white hover:bg-gray-50 text-black";

  return (
    <div className={`flex flex-col min-h-screen ${mainBg} transition-colors duration-300`}>
      <Nav />

      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 mt-10">
        <div className={`max-w-md w-full space-y-8 p-8 rounded-xl`}>
          
          <div className="text-center">
            <h2 className={`mt-2 text-3xl font-extrabold tracking-tight ${textTitle}`}>
              Create Your Account at <span className="text-green">RahalCar</span>
            </h2>
          </div>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
            
            {/* Full Name Input */}
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <UserIcon className="h-5 w-5 text-black dark:text-white" />
                </div>
                <input
                  id="full-name"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  required
                  className={`appearance-none block w-full pl-12 pr-3 py-4 border rounded-xl placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm transition-colors ${inputBg} ${isDarkMode ? "text-white" : "text-black"} ${
                    fullNameError 
                      ? "border-red-500 focus:border-red-500" 
                      : `${borderDefault} focus:border-green-500`
                  }`}
                  placeholder="Full Name"
                  value={fullName} 
                  onChange={handleFullNameChange}
                />
              </div>
              {fullNameError && <p className="text-red-500 text-xs mt-1 font-medium">{fullNameError}</p>}
            </div>

            {/* Phone Number Input */}
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <PhoneIcon className="h-5 w-5 text-black dark:text-white" />
                </div>
                <input
                  id="phone-number"
                  name="phoneNumber"
                  type="tel"
                  autoComplete="tel"
                  required
                  maxLength="11"
                  className={`appearance-none block w-full pl-12 pr-3 py-4 border rounded-xl placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm transition-colors ${inputBg} ${isDarkMode ? "text-white" : "text-black"} ${
                    phoneError 
                      ? "border-red-500 focus:border-red-500" 
                      : `${borderDefault} focus:border-green-500`
                  }`}
                  placeholder="01012345678"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                />
              </div>
              {phoneError && <p className="text-red-500 text-xs mt-1 font-medium">{phoneError}</p>}
            </div>

            {/* Email Input */}
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <UserIcon className="h-5 w-5 text-black dark:text-white" />
                </div>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={`appearance-none block w-full pl-12 pr-3 py-4 border rounded-xl placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm transition-colors ${inputBg} ${isDarkMode ? "text-white" : "text-black"} ${
                    emailError 
                      ? "border-red-500 focus:border-red-500" 
                      : `${borderDefault} focus:border-green-500`
                  }`}
                  placeholder="example@gmail.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError('');
                  }}
                />
              </div>
              {emailError && <p className="text-red-500 text-xs mt-1 font-medium">{emailError}</p>}
            </div>

            {/* Password Input */}
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <LockClosedIcon className="h-5 w-5 text-black dark:text-white" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className={`appearance-none block w-full pl-12 pr-3 py-4 border rounded-xl placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm transition-colors ${inputBg} ${isDarkMode ? "text-white" : "text-black"} ${
                    passwordError 
                      ? "border-red-500 focus:border-red-500" 
                      : `${borderDefault} focus:border-green-500`
                  }`}
                  placeholder="•••••••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (passwordError) setPasswordError('');
                  }}
                />
              </div>
              {passwordError && <p className="text-red-500 text-xs mt-1 font-medium">{passwordError}</p>}
            </div>

            {/* Terms and Conditions Checkbox */}
            <div>
              <div className="flex items-start">
                <div className="flex items-center">
                  <input
                    id="agree-terms"
                    name="agree-terms"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-green focus:ring-green-500 cursor-pointer mt-1"
                    style={{ accentColor: "#22c55e" }}
                    checked={agreeTerms}
                    onChange={(e) => {
                      setAgreeTerms(e.target.checked);
                      if (termsError) setTermsError('');
                    }}
                  />
                  <label htmlFor="agree-terms" className={`ml-2 block text-sm cursor-pointer select-none ${textNormal}`}>
                    I agree to the <a href="#" className={`font-medium hover:underline ${textLink}`}>Terms & Conditions</a>
                  </label>
                </div>
              </div>
              {termsError && <p className="text-red-500 text-xs mt-1 font-medium">{termsError}</p>}
            </div>

            {/* Submit Button */}
            <div>
              <button 
                type="submit" 
                className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-bold rounded-xl text-black bg-[#22c55e] hover:opacity-90 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2"
              >
                <span className="flex items-center gap-2">
                  Create Account
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
              <span className={`px-2 ${cardBg} ${textNormal}`}>Or sign up with your social account</span>
            </div>
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-4 gap-3">
            <button className={`col-span-2 flex items-center justify-center gap-2 py-3 px-4 border rounded-xl shadow-sm text-sm font-medium transition-colors ${borderDefault} ${googleBtnBg}`}>
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
              Sign up with Google
            </button>
            <button className={`col-span-1 flex items-center justify-center py-3 px-4 border rounded-xl shadow-sm text-sm font-medium transition-colors ${borderDefault} ${facebookBtnBg}`}>
              <FaFacebookF className="w-5 h-5" />
            </button>
            <button className={`col-span-1 flex items-center justify-center py-3 px-4 border rounded-xl shadow-sm text-sm font-medium transition-colors ${borderDefault} ${appleBtnBg}`}>
              <FaApple className="w-5 h-5" />
            </button>
          </div>

          {/* Sign In Redirect */}
          <div className="text-center mt-8">
            <p className={`text-sm ${textNormal}`}>
              Already have an account?{' '}
              <Link to="/login" className={`font-semibold hover:underline ${textLink}`}>
                Sign in Here!
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignUp;