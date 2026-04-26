import { Link } from "react-router-dom";
import Logo from "../common/Logo/Logo";

const AdminSidebar = () => {
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
    <aside className="hidden md:block w-64 bg-black text-grayLight flex-shrink-0 md:h-screen border-r border-lightDark">
      <div className="p-6">
        <Logo to="/admin" />
      </div>
      <nav className="mt-6">
        <ul className="space-y-2 px-4">
          {menuItems.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className="block py-2 px-4 rounded text-grayLight hover:bg-lightDark hover:text-green transition-all"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
