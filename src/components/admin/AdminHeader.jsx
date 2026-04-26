import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IconButton } from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Logo from "../common/Logo/Logo";

const AdminHeader = () => {
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) setOpenNav(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    { to: "/admin", label: "Dashboard" },
    { to: "/admin/bookings", label: "Bookings" },
    { to: "/admin/units", label: "Units" },
    { to: "/admin/clients", label: "Clients" },
    { to: "/admin/drivers", label: "Drivers" },
    { to: "/admin/financials/payments", label: "Financials" },
    { to: "/admin/tracking", label: "Tracking" },
    { to: "/admin/messages", label: "Messages" },
  ];

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden bg-black text-grayLight p-4 flex justify-between items-center border-b border-lightDark">
        <Logo to="/admin" />
        <IconButton
          variant="text"
          className="text-grayLight hover:text-green"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>

      {/* Mobile Navigation */}
      {openNav && (
        <div className="md:hidden bg-black text-grayLight p-4 border-b border-lightDark">
          <ul className="flex flex-col gap-2">
            {menuItems.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="block py-2 px-4 rounded text-grayLight hover:bg-lightDark hover:text-green transition-all"
                  onClick={() => setOpenNav(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default AdminHeader;
