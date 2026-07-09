import React, { useState } from 'react';
import { UserIcon, LockClosedIcon, ArrowRightIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { FaFacebookF, FaApple } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Nav from '../../../components/user/navbar/Nav';
import Footer from '../../../components/common/Footer/Footer';
import api from "../../../api/api";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFullNameError('');
    setPhoneError('');
    setEmailError('');
    setPasswordError('');
    setTermsError('');

    let hasError = false;

    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!fullName.trim()) {
      setFullNameError('Full name is required');
      hasError = true;
    } else if (!nameRegex.test(fullName)) {
      setFullNameError('Full name must contain only letters and spaces');
      hasError = true;
    }

    const phoneRegex = /^01[0125][0-9]{8}$/;
    if (!phoneRegex.test(phoneNumber)) {
      setPhoneError('Phone number must be exactly 11 digits and start with 010, 011, 012, or 015');
      hasError = true;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailRegex.test(email.trim())) {
      setEmailError('Email must end with @gmail.com');
      hasError = true;
    }

    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      hasError = true;
    }

    if (!agreeTerms) {
      setTermsError('You must agree to the Terms & Conditions');
      hasError = true;
    }

    if (!hasError) {

  try {

    const response = await api.post("/users/register", {
      name: fullName,
      phone: phoneNumber,
      email: email,
      password: password
    });


    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    navigate("/profile");


  } catch(error) {

    console.log(error.response?.data || error.message);

  }

}
  };

  const handleFullNameChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
    setFullName(value);
    setFullNameError('');
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 11);
    setPhoneNumber(value);
    setPhoneError('');
  };

  return (
    <>
      <Nav />

      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 mt-10">
        <div className="max-w-md w-full space-y-8 bg-white">
          
          <div className="text-center">
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900">
              Create Your Account at <span className="text-green">RahalCar</span>
            </h2>
          </div>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <UserIcon className="h-5 w-5" />
                </div>
                <input
                  id="full-name"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  required
                  className="appearance-none block w-full pl-12 pr-3 py-4 border border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-green-500 sm:text-sm bg-gray-50"
                  placeholder="Full Name"
                  value={fullName} 
                  onChange={handleFullNameChange}
                />
              </div>
              {fullNameError && <p className="text-red-500 text-xs mt-1">{fullNameError}</p>}
            </div>

            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <PhoneIcon className="h-5 w-5" />
                </div>
                <input
                  id="phone-number"
                  name="phoneNumber"
                  type="tel"
                  autoComplete="tel"
                  required
                  maxLength="11"
                  className="appearance-none block w-full pl-12 pr-3 py-4 border border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-green-500 sm:text-sm bg-gray-50"
                  placeholder="01012345678"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                />
              </div>
              {phoneError && <p className="text-red-500 text-xs mt-1">{phoneError}</p>}
            </div>

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
                  placeholder="example@gmail.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError('');
                  }}
                />
              </div>
              {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
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
                  autoComplete="new-password"
                  required
                  className="appearance-none block w-full pl-12 pr-3 py-4 border border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-green-500 sm:text-sm bg-gray-50"
                  placeholder="•••••••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError('');
                  }}
                />
              </div>
              {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
            </div>

            <div className="flex items-start">
              <div className="flex items-center">
                <input
                  id="agree-terms"
                  name="agree-terms"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-green focus:ring-green-500 cursor-pointer mt-1"
                  checked={agreeTerms}
                  onChange={(e) => {
                    setAgreeTerms(e.target.checked);
                    setTermsError('');
                  }}
                />
                <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-500 cursor-pointer">
                  I agree to the <a href="#" className="font-medium text-black hover:underline">Terms & Conditions</a>
                </label>
              </div>
            </div>
            {termsError && <p className="text-red-500 text-xs mt-1">{termsError}</p>}

            <div>
              <button type="submit" 
                className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-bold rounded-xl text-black bg-[#22c55e] hover:opacity-90 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2"
              >
                <span className="flex items-center gap-2">
                  Create Account
                  <ArrowRightIcon className="w-4 h-4" />
                </span>
              </button>
            </div>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or sign up with your social account</span>
            </div>
          </div>

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

          <div className="text-center mt-8">
            <p className="text-sm text-gray-500">
              Already have an account?{' '}
              <Link 
                to="/login"
                className="font-semibold text-black hover:underline"
              >
                Sign in Here!
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default SignUp;