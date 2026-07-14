// Nav
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import { FaCarSide } from "react-icons/fa6";
import { Navbar, Collapse, IconButton } from "@material-tailwind/react";
import Logo from "../../common/Logo/Logo";

import {
  HomeIcon,
  InformationCircleIcon,
  PhoneIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";

import { useAuth } from "../../../context/AuthContext";
import IconProfile from './../IconProfile';

const Nav = () => {
  const [openNav, setOpenNav] = useState(false);

  const {logged}=useAuth();

  const { theme, toggleTheme } = useContext(ThemeContext);


  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) setOpenNav(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // تعديل بسيط في الألوان عشان تليق مع الـ Dark Mode
 const linkClass =
"flex items-center gap-2 text-black dark:text-grayLight font-medium transition-all duration-300 hover:text-green dark:hover:text-softGreen hover:-translate-y-0.5";
  
  const navList = (
    <ul className="flex flex-col gap-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-8">
      <li>
        <Link to="/" className={linkClass}>
          <HomeIcon className="h-5 w-5" />
          Home
        </Link>
      </li>
      <li>
        <Link to="/about" className={linkClass}>
          <InformationCircleIcon className="h-5 w-5" />
          About
        </Link>
      </li>
      <li>
        <Link to="/contact" className={linkClass}>
          <PhoneIcon className="h-5 w-5" />
          Contact
        </Link>
      </li>
      <li>
        <Link to="/cars" className={linkClass}>
          <FaCarSide className="h-5 w-5" />
          Cars
        </Link>
      </li>
    </ul>
  );

  return (
    <Navbar
      shadow={false}
      blurred={false}
      className="
        fixed top-0 left-0 right-0 z-50
        w-full max-w-full
        rounded-none
        bg-white dark:bg-black
        border-b border-grayLight/40 dark:border-lightDark
        shadow-md
        px-4 py-3 lg:px-8
        transition-all duration-300
      "
    >
      <div className="flex items-center justify-between w-full">
        {/* LOGO */}
        <Logo />

        {/* DESKTOP LINKS */}
        <div className="hidden lg:block">{navList}</div>

        {/* RIGHT SIDE: Theme Toggle + Profile */}
        <div className="flex items-center gap-1 sm:gap-3">
          {/* 4. زرار الـ Dark Mode Mode Toggle */}
          <IconButton
            variant="text"
            onClick={toggleTheme}
            className="text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {theme === "light" ? (
              <MoonIcon className="h-6 w-6 text-blue-gray-900" />
            ) : (
              <SunIcon className="h-6 w-6 text-white" />
            )}
          </IconButton>

          {logged ? (
            <IconProfile />
          ) : (
            <Link to="/login">
              <IconButton
                variant="text"
                className="text-black dark:text-white hover:text-green dark:hover:text-softGreen hover:bg-green/10 dark:hover:bg-lightDark transition-all duration-300"
              >
                <UserIcon className="h-6 w-6" />
              </IconButton>
            </Link>
          )}

          {/* Toggle Button for Mobile */}
          <IconButton
            variant="text"
            className="lg:hidden text-black dark:text-white hover:bg-green/10 dark:hover:bg-lightDark"
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <XMarkIcon className="h-6 w-6" strokeWidth={2} />
            ) : (
              <Bars3Icon className="h-6 w-6" strokeWidth={2} />
            )}
          </IconButton>
        </div>
      </div>

      <Collapse open={openNav}>
        <div className="container mx-auto mt-4 border-t border-gray-200 dark:border-gray-800 pt-4 pb-2 lg:hidden">
          {navList}
        </div>
      </Collapse>
    </Navbar>
  );
};

export default Nav;
