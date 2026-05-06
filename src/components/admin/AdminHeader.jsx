import { useNavigate } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const AdminHeader = ({ onToggleSidebar, sidebarOpen }) => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between px-4 md:px-8 py-4 bg-black/70 backdrop-blur-xl border-b border-white/5 shadow-lg">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="md:hidden p-2 rounded-xl text-gray hover:text-white hover:bg-white/10 transition-colors"
        >
          {sidebarOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
        </button>
        <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">Admin Panel</h1>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <div
          onClick={() => navigate("/admin")}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-green to-darkGreen flex items-center justify-center text-black font-bold text-sm border-2 border-surface group-hover:border-green transition-colors shadow-lg">
            AD
          </div>
          <div className="hidden lg:block">
            <p className="text-sm font-semibold text-white leading-none">Admin User</p>
            <p className="text-xs text-green leading-none mt-0.5">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
