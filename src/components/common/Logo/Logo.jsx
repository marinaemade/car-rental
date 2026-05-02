import { Link } from "react-router-dom";
import { TruckIcon } from "@heroicons/react/24/outline";

const Logo = ({ to = "/", className = "" }) => {
  return (
    <Link
      to={to}
      className={`flex items-center gap-2 text-white font-bold text-lg group ${className}`}
    >
      <TruckIcon className="h-6 w-6 text-green transition-transform group-hover:rotate-12" />
      <span className="transition-colors group-hover:text-grayLight">
        Rahal<span className="text-green">Car</span>
      </span>
    </Link>
  );
};

export default Logo;
