import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Navbar,
  Collapse,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import Logo from "../../common/Logo/Logo";

import {
  HomeIcon,
  InformationCircleIcon,
  PhoneIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon,
  TruckIcon,
  GlobeAltIcon, // For Social/Web
  ChatBubbleLeftRightIcon, // For Social/Message
  VideoCameraIcon, // For YouTube/Video
} from "@heroicons/react/24/outline";

import { useAuth } from "../../../context/AuthContext";

const Nav = () => {
  const [openNav, setOpenNav] = useState(false);

const {logged}=useAuth();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) setOpenNav(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Shared hover and transition classes
  const linkClass =
    "flex items-center gap-2 text-grayLight font-medium transition-all duration-300 hover:text-green hover:translate-x-1 lg:hover:translate-x-0 lg:hover:scale-105";

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
    </ul>
  );

  return (
    <Navbar className="fixed top-0 left-0 right-0 z-50 w-full max-w-full bg-black shadow-lg border-b border-lightDark rounded-none px-4 py-3 lg:px-8">
      <div className="flex items-center justify-between w-full">
        {/* LOGO */}
        <Logo />

        {/* DESKTOP LINKS */}
        <div className="hidden lg:block">{navList}</div>

        {/* RIGHT SIDE: Profile Login */}
        <div className="flex items-center gap-1 sm:gap-3">
          <Link to="/login">
            <IconButton
              variant="text"
              className="text-white hover:text-green hover:bg-lightDark"
            >
              <UserIcon className="h-6 w-6" />
            </IconButton>
          </Link>

          {/* Toggle Button for Mobile */}
          <IconButton
            variant="text"
            className="lg:hidden text-white"
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
        <div className="container mx-auto mt-4 border-t border-lightDark pt-4 pb-2 lg:hidden">
          {navList}
        </div>
      </Collapse>
    </Navbar>
  );
};

export default Nav;
