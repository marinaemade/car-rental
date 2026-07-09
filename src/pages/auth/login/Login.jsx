import React, { useState } from 'react';
import { UserIcon, LockClosedIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { FaFacebookF, FaApple } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../../../context/AuthContext";
import Nav from '../../../components/user/navbar/Nav';
import Footer from '../../../components/common/Footer/Footer';
import api from "../../../api/api";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  };

  const submitLogin = async  (e) => { 
    e.preventDefault();

    setEmailError("");
    setPasswordError("");

    let hasError = false;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailRegex.test(email.trim())) {
      setEmailError('Email must end with @gmail.com');
      hasError = true;
    }

    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      hasError = true;
    }

    if (!hasError) {
    try { 
        const response = await api.post("/users/login", {
          email,
          password,
        });


        localStorage.setItem("token", response.data.token);

        localStorage.setItem(
          "user",
          JSON.stringify(response.data.user)
        );


        navigate("/profile");


      } catch (error) {
        console.log(error.response?.data || error.message);
      }
    }
    };

  return (
    <>
      <Nav />

      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 mt-10">
        <div className="max-w-md w-full space-y-8 bg-white">
          
          <div className="text-center">
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900">
              Welcome Back to <span className="text-green">RahalCar</span>
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
                  placeholder="example@gmail.com"
                  value={email}
                  onChange={handleEmailChange}
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
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full pl-12 pr-3 py-4 border border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-green-500 sm:text-sm bg-gray-50"
                  placeholder="•••••••••••••"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
              {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500 cursor-pointer"
                  style={{ accentColor: "#16a34a" }}
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-500 cursor-pointer"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium hover:underline text-gray-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-bold rounded-xl text-black bg-[#22c55e] hover:opacity-90 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2"
              >
                <span className="flex items-center gap-2">
                  Sign in
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
              <span className="px-2 bg-white text-gray-500">
                Or connect with your social account
              </span>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3">
            <button className="col-span-2 flex items-center justify-center gap-2 py-3 px-4 border border-gray-200 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-gray-50 hover:bg-white transition-colors">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Sign in with Google
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
      <Footer />
    </>
  );
};

export default Login;