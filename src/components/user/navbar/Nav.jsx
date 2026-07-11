import React, { useContext, useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSun, FiMoon, FiUser, FiLogOut, FiLogIn, FiUserPlus } from 'react-icons/fi';
import { ThemeContext } from '../../../context/ThemeContext';
import { useAuth } from '../../../context/AuthContext';

const Nav = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isDarkMode = theme === 'dark';
  
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Get first letter of user name
  const getFirstLetter = () => {
    return user?.name ? user.name.charAt(0).toUpperCase() : 'U';
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle sign out
  const handleSignOut = () => {
    logout();
    setShowDropdown(false);
    navigate('/');
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
      isDarkMode ? 'bg-dark border-lightDark' : 'bg-white border-gray'
    } border-b`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold">
              Rahal<span className="text-green">Car</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className={`hover:text-green transition-colors ${isDarkMode ? 'text-white' : 'text-black'}`}>
              Home
            </Link>
            <Link to="/about" className={`hover:text-green transition-colors ${isDarkMode ? 'text-white' : 'text-black'}`}>
              About
            </Link>
            <Link to="/contact" className={`hover:text-green transition-colors ${isDarkMode ? 'text-white' : 'text-black'}`}>
              Contact
            </Link>
            <Link to="/cars" className={`hover:text-green transition-colors ${isDarkMode ? 'text-white' : 'text-black'}`}>
              Cars
            </Link>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode ? 'hover:bg-lightDark' : 'hover:bg-grayLight'
              }`}
            >
              {isDarkMode ? <FiSun className="w-5 h-5 text-white" /> : <FiMoon className="w-5 h-5 text-black" />}
            </button>

            {/* User Menu Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 focus:outline-none"
              >
                <div className="w-10 h-10 rounded-full bg-green text-white flex items-center justify-center font-bold shadow-lg shadow-green/20 hover:opacity-90 transition-opacity">
                  {user ? getFirstLetter() : <FiUser className="w-5 h-5" />}
                </div>
              </button>

              {/* Dropdown Menu */}
              {showDropdown && (
                <div className={`absolute right-0 mt-2 w-48 rounded-xl shadow-lg py-2 z-50 ${
                  isDarkMode ? 'bg-surface border border-lightDark' : 'bg-white border border-gray'
                }`}>
                  {user ? (
                    // User is logged in - Show Profile and Sign Out
                    <>
                      <Link
                        to="/user-profile"
                        onClick={() => setShowDropdown(false)}
                        className={`flex items-center gap-3 px-4 py-2 text-sm transition-colors ${
                          isDarkMode ? 'text-white hover:bg-lightDark' : 'text-black hover:bg-grayLight'
                        }`}
                      >
                        <FiUser className="w-4 h-4" />
                        Profile
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors text-red-500 hover:bg-red-50 ${
                          isDarkMode ? 'hover:bg-red-900 hover:bg-opacity-20' : ''
                        }`}
                      >
                        <FiLogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </>
                  ) : (
                    // User is NOT logged in - Show Sign In and Sign Up
                    <>
                      <Link
                        to="/login"
                        onClick={() => setShowDropdown(false)}
                        className={`flex items-center gap-3 px-4 py-2 text-sm transition-colors ${
                          isDarkMode ? 'text-white hover:bg-lightDark' : 'text-black hover:bg-grayLight'
                        }`}
                      >
                        <FiLogIn className="w-4 h-4" />
                        Sign In
                      </Link>
                      <Link
                        to="/register"
                        onClick={() => setShowDropdown(false)}
                        className={`flex items-center gap-3 px-4 py-2 text-sm transition-colors ${
                          isDarkMode ? 'text-white hover:bg-lightDark' : 'text-black hover:bg-grayLight'
                        }`}
                      >
                        <FiUserPlus className="w-4 h-4" />
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2">
              <div className={`w-6 h-0.5 mb-1.5 ${isDarkMode ? 'bg-white' : 'bg-black'}`}></div>
              <div className={`w-6 h-0.5 mb-1.5 ${isDarkMode ? 'bg-white' : 'bg-black'}`}></div>
              <div className={`w-6 h-0.5 ${isDarkMode ? 'bg-white' : 'bg-black'}`}></div>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;