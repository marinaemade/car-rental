import { Typography, IconButton } from "@material-tailwind/react";
import { Link } from "react-router-dom";
// Material Tailwind / HeroIcons for UI
import { 
  TruckIcon, 
  MapPinIcon, 
  PhoneIcon, 
  EnvelopeIcon 
} from "@heroicons/react/24/outline";
// React Icons for Brands
import { 
  FaFacebookF, 
  FaInstagram, 
  FaYoutube, 
  FaXTwitter 
} from "react-icons/fa6"; 

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const QUICK_LINKS = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Login / Account", path: "/login" },
  ];

  return (
    <footer className="w-full bg-black pt-12 border-t border-lightDark">
      <div className="mx-auto w-full max-w-7xl px-8">
        <div className="grid grid-cols-1 justify-between gap-8 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Brand Section */}
          <div className="w-full">
            <Link to="/" className="flex items-center gap-2 text-white font-bold text-2xl mb-4 group">
              <div className="bg-green p-1.5 rounded-lg transition-transform group-hover:scale-110">
                <TruckIcon className="h-6 w-6 text-black" />
              </div>
              <span>
                Rahal<span className="text-green transition-colors group-hover:text-softGreen">Car</span>
              </span>
            </Link>
            <Typography className="mb-6 font-normal text-gray text-sm leading-relaxed">
              Premium car rental for every journey. From sports cars to family SUVs, we have the perfect vehicle for your adventure.
            </Typography>
            
            {/* Social Links using React Icons */}
            <div className="flex gap-2">
              {[
                { icon: FaFacebookF, color: "hover:text-[#1877F2]", path: "#" },
                { icon: FaXTwitter, color: "hover:text-white", path: "#" },
                { icon: FaInstagram, color: "hover:text-[#E4405F]", path: "#" },
                { icon: FaYoutube, color: "hover:text-[#FF0000]", path: "#" }
              ].map((social, idx) => (
                <IconButton 
                  key={idx} 
                  as={Link}
                  to={social.path}
                  size="sm" 
                  variant="text" 
                  className={`bg-lightDark text-gray transition-all duration-300 hover:bg-white/10 ${social.color}`}
                >
                  <social.icon className="h-5 w-5" />
                </IconButton>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="w-full">
            <Typography className="mb-4 font-bold text-white text-md uppercase tracking-wider">
              Quick Links
            </Typography>
            <ul className="space-y-2">
              {QUICK_LINKS.map((link, key) => (
                <li key={key}>
                  <Link
                    to={link.path}
                    className="text-gray text-sm font-normal transition-all hover:text-green hover:pl-1"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Locations */}
          <div className="w-full">
            <Typography className="mb-4 font-bold text-white text-md uppercase tracking-wider">
              Our Locations
            </Typography>
            <ul className="space-y-2 text-gray text-sm">
              <li className="flex items-center gap-2 hover:text-white transition-colors">
                <MapPinIcon className="h-4 w-4 text-green" /> New York, NY
              </li>
              <li className="flex items-center gap-2 hover:text-white transition-colors">
                <MapPinIcon className="h-4 w-4 text-green" /> Los Angeles, CA
              </li>
              <li className="flex items-center gap-2 hover:text-white transition-colors">
                <MapPinIcon className="h-4 w-4 text-green" /> Miami, FL
              </li>
              <li className="flex items-center gap-2 hover:text-white transition-colors">
                <MapPinIcon className="h-4 w-4 text-green" /> Chicago, IL
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="w-full">
            <Typography className="mb-4 font-bold text-white text-md uppercase tracking-wider">
              Contact Us
            </Typography>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <PhoneIcon className="h-5 w-5 text-green mt-0.5" />
                <div>
                  <Typography className="text-white font-bold text-sm">1-800-DRIVE-IT</Typography>
                  <Typography className="text-gray text-xs">24/7 Support Available</Typography>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <EnvelopeIcon className="h-5 w-5 text-green mt-0.5" />
                <Link to="/contact" className="text-white font-bold text-sm hover:text-green transition-colors cursor-pointer">
                  support@rahalcar.com
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex w-full flex-col items-center justify-center border-t border-lightDark py-6 md:flex-row md:justify-between">
          <Typography className="mb-4 text-center text-xs font-normal text-gray md:mb-0">
            &copy; {currentYear} <span className="text-green">RahalCar</span>. All rights reserved.
          </Typography>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-xs text-gray hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-xs text-gray hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;