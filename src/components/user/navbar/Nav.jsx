import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import { FaCarSide } from "react-icons/fa6";
import {
  Navbar,
  Collapse,
  IconButton,
} from "@material-tailwind/react";
import Logo from "../../common/Logo/Logo"; // هذا المسار صحيح لأنه يخرج مستويين فقط

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

const Nav = () => {
  const [openNav, setOpenNav] = useState(false);
  
  // 3. استهلاك الـ Context
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
    "flex items-center gap-2 text-gray-500 dark:text-gray-300 font-medium transition-all duration-300 hover:text-green-500 hover:translate-x-1 lg:hover:translate-x-0 lg:hover:scale-105";

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
          < FaCarSide className="h-5 w-5" />
          Cars
        </Link>
      </li>
    </ul>
  );

  return (
    // أضفنا خلفية تتغير مع الثيم (bg-white dark:bg-black)
    <Navbar className="fixed top-0 left-0 right-0 z-50 w-full max-w-full bg-white dark:bg-black shadow-lg border-b border-gray-200 dark:border-gray-800 rounded-none px-4 py-3 lg:px-8 transition-colors duration-300">
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
              <SunIcon className="h-6 w-6 text-yellow-500" />
            )}
          </IconButton>

          <Link to="/login">
            <IconButton
              variant="text"
              className="text-gray-700 dark:text-white hover:text-green-500 dark:hover:bg-gray-800"
            >
              <UserIcon className="h-6 w-6" />
            </IconButton>
          </Link>

          {/* Toggle Button for Mobile */}
          <IconButton
            variant="text"
            className="lg:hidden text-gray-700 dark:text-white"
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