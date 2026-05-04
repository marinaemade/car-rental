import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../common/Logo/Logo";
import {
  Squares2X2Icon,
  CalendarDaysIcon,
  TruckIcon,
  UsersIcon,
  IdentificationIcon,
  BanknotesIcon,
  ChevronDownIcon,
  ArrowRightOnRectangleIcon,
  CreditCardIcon,
  DocumentChartBarIcon,
} from "@heroicons/react/24/outline";

const NAV = [
  { to: "/admin", label: "Dashboard", icon: Squares2X2Icon, exact: true },
  { to: "/admin/bookings", label: "Bookings", icon: CalendarDaysIcon },
  { to: "/admin/units", label: "Fleet / Units", icon: TruckIcon },
  { to: "/admin/clients", label: "Clients", icon: UsersIcon },
  { to: "/admin/drivers", label: "Drivers", icon: IdentificationIcon },
  {
    label: "Financials",
    icon: BanknotesIcon,
    children: [
      { to: "/admin/financials/payments", label: "Payments", icon: CreditCardIcon },
      { to: "/admin/financials/expenses", label: "Expenses", icon: DocumentChartBarIcon },
    ],
  },
];

const linkClass = (isActive) =>
  `flex items-center gap-3 py-3 px-4 rounded-xl transition-all duration-200 group border-l-2 ${
    isActive
      ? "bg-gradient-to-r from-green/20 to-transparent text-green border-green"
      : "text-grayLight hover:bg-white/5 hover:text-white border-transparent"
  }`;

const NavItem = ({ item, onClose }) => {
  const Icon = item.icon;
  return (
    <li>
      <NavLink to={item.to} end={item.exact} onClick={onClose} className={({ isActive }) => linkClass(isActive)}>
        {({ isActive }) => (
          <>
            <Icon className={`h-5 w-5 flex-shrink-0 ${isActive ? "text-green" : "text-gray group-hover:text-white"}`} />
            <span className="font-medium text-sm">{item.label}</span>
          </>
        )}
      </NavLink>
    </li>
  );
};

const SidebarContent = ({ onClose }) => {
  const navigate = useNavigate();
  const [financialsOpen, setFinancialsOpen] = useState(true);

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 py-5 border-b border-white/5">
        <Logo to="/admin" />
      </div>

      <nav className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full py-4 px-3">
        <ul className="space-y-0.5">
          {NAV.map((item) => {
            if (item.children) {
              return (
                <li key={item.label}>
                  <button
                    onClick={() => setFinancialsOpen((prev) => !prev)}
                    className="w-full flex items-center gap-3 py-3 px-4 rounded-xl text-grayLight hover:bg-white/5 hover:text-white transition-all group"
                  >
                    <item.icon className="h-5 w-5 text-gray group-hover:text-white flex-shrink-0" />
                    <span className="font-medium text-sm flex-1 text-left">{item.label}</span>
                    <ChevronDownIcon className={`h-4 w-4 text-gray transition-transform duration-200 ${financialsOpen ? "rotate-180" : ""}`} />
                  </button>
                  {financialsOpen && (
                    <ul className="ml-4 mt-0.5 space-y-0.5 border-l border-white/5 pl-3">
                      {item.children.map((child) => (
                        <NavItem key={child.to} item={child} onClose={onClose} />
                      ))}
                    </ul>
                  )}
                </li>
              );
            }
            return <NavItem key={item.to} item={item} onClose={onClose} />;
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-white/5 space-y-3">
        <div className="flex items-center gap-3 bg-green/5 border border-green/10 rounded-xl p-3">
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-green to-darkGreen flex items-center justify-center text-black font-bold text-sm flex-shrink-0">
            AD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">Admin User</p>
            <p className="text-xs text-green">System Administrator</p>
          </div>
        </div>
        <button
          onClick={() => navigate("/login")}
          className="w-full flex items-center gap-2 py-2 px-3 rounded-xl text-gray hover:text-red-400 hover:bg-red-500/5 text-sm font-medium transition-colors"
        >
          <ArrowRightOnRectangleIcon className="h-5 w-5" />
          Sign Out
        </button>
      </div>
    </div>
  );
};

const AdminSidebar = ({ isOpen, onClose }) => (
  <>
    {/* Desktop */}
    <aside className="hidden md:flex flex-col w-64 bg-surface/80 backdrop-blur-md border-r border-white/5 flex-shrink-0 h-screen sticky top-0 z-50">
      <SidebarContent onClose={() => {}} />
    </aside>

    {/* Mobile drawer */}
    {isOpen && (
      <div className="md:hidden fixed inset-0 z-[90] flex">
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
        <aside className="relative w-72 bg-surface h-full border-r border-white/5 flex flex-col shadow-2xl animate-[slideInLeft_0.3s_ease-out]">
          <SidebarContent onClose={onClose} />
        </aside>
      </div>
    )}
  </>
);

export default AdminSidebar;
