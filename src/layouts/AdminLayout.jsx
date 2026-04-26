import { Outlet, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { IconButton } from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import ScrollToTop from '../components/common/ScrollToTop/ScrollToTop';

const AdminLayout = () => {
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) setOpenNav(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navList = (
    <ul className="flex flex-col gap-2">
      <li>
        <Link
          to="/admin"
          className="block py-2 px-4 rounded text-grayLight hover:bg-lightDark hover:text-green transition-all"
          onClick={() => setOpenNav(false)}
        >
          Dashboard
        </Link>
      </li>
      <li>
        <Link
          to="/admin/bookings"
          className="block py-2 px-4 rounded text-grayLight hover:bg-lightDark hover:text-green transition-all"
          onClick={() => setOpenNav(false)}
        >
          Bookings
        </Link>
      </li>
      <li>
        <Link
          to="/admin/units"
          className="block py-2 px-4 rounded text-grayLight hover:bg-lightDark hover:text-green transition-all"
          onClick={() => setOpenNav(false)}
        >
          Units
        </Link>
      </li>
      <li>
        <Link
          to="/admin/clients"
          className="block py-2 px-4 rounded text-grayLight hover:bg-lightDark hover:text-green transition-all"
          onClick={() => setOpenNav(false)}
        >
          Clients
        </Link>
      </li>
      <li>
        <Link
          to="/admin/drivers"
          className="block py-2 px-4 rounded text-grayLight hover:bg-lightDark hover:text-green transition-all"
          onClick={() => setOpenNav(false)}
        >
          Drivers
        </Link>
      </li>
      <li>
        <Link
          to="/admin/financials/payments"
          className="block py-2 px-4 rounded text-grayLight hover:bg-lightDark hover:text-green transition-all"
          onClick={() => setOpenNav(false)}
        >
          Financials
        </Link>
      </li>
      <li>
        <Link
          to="/admin/tracking"
          className="block py-2 px-4 rounded text-grayLight hover:bg-lightDark hover:text-green transition-all"
          onClick={() => setOpenNav(false)}
        >
          Tracking
        </Link>
      </li>
      <li>
        <Link
          to="/admin/messages"
          className="block py-2 px-4 rounded text-grayLight hover:bg-lightDark hover:text-green transition-all"
          onClick={() => setOpenNav(false)}
        >
          Messages
        </Link>
      </li>
    </ul>
  );

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <ScrollToTop />
      
      {/* Mobile Header */}
      <div className="md:hidden bg-surface text-grayLight p-4 flex justify-between items-center border-b border-lightDark">
        <h1 className="text-xl font-bold text-green">Admin Panel</h1>
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

      {/* Sidebar */}
      <aside className="hidden md:block w-64 bg-surface text-grayLight flex-shrink-0 md:h-screen border-r border-lightDark">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-green">Admin Panel</h1>
        </div>
        <nav className="mt-6">
          <ul className="space-y-2 px-4">
            <li>
              <Link to="/admin" className="block py-2 px-4 rounded text-grayLight hover:bg-lightDark hover:text-green transition-all">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/admin/bookings" className="block py-2 px-4 rounded text-grayLight hover:bg-lightDark hover:text-green transition-all">
                Bookings
              </Link>
            </li>
            <li>
              <Link to="/admin/units" className="block py-2 px-4 rounded text-grayLight hover:bg-lightDark hover:text-green transition-all">
                Units
              </Link>
            </li>
            <li>
              <Link to="/admin/clients" className="block py-2 px-4 rounded text-grayLight hover:bg-lightDark hover:text-green transition-all">
                Clients
              </Link>
            </li>
            <li>
              <Link to="/admin/drivers" className="block py-2 px-4 rounded text-grayLight hover:bg-lightDark hover:text-green transition-all">
                Drivers
              </Link>
            </li>
            <li>
              <Link to="/admin/financials/payments" className="block py-2 px-4 rounded text-grayLight hover:bg-lightDark hover:text-green transition-all">
                Financials
              </Link>
            </li>
            <li>
              <Link to="/admin/tracking" className="block py-2 px-4 rounded text-grayLight hover:bg-lightDark hover:text-green transition-all">
                Tracking
              </Link>
            </li>
            <li>
              <Link to="/admin/messages" className="block py-2 px-4 rounded text-grayLight hover:bg-lightDark hover:text-green transition-all">
                Messages
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Mobile Navigation */}
      <div className={`md:hidden ${openNav ? 'block' : 'hidden'} bg-surface text-grayLight p-4 border-b border-lightDark`}>
        {navList}
      </div>

      {/* Main Content */}
      <main className="flex-grow bg-dark p-4 md:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
