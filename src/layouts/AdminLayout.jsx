import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { AdminProvider } from "../context/AdminContext";
import ScrollToTop from "../components/common/ScrollToTop/ScrollToTop";
import AdminHeader from "../components/admin/AdminHeader";
import AdminSidebar from "../components/admin/AdminSidebar";

// Dashboard
import Dashboard from "../pages/admin/Dashboard";

// Bookings
import Bookings from "../pages/admin/Bookings/index";
import BookingAdd from "../pages/admin/Bookings/BookingAdd";
import BookingEdit from "../pages/admin/Bookings/BookingEdit";
import BookingView from "../pages/admin/Bookings/BookingView";
import BookingDelete from "../pages/admin/Bookings/BookingDelete";

// Units
import Units from "../pages/admin/Units/index";
import UnitAdd from "../pages/admin/Units/UnitAdd";
import UnitEdit from "../pages/admin/Units/UnitEdit";
import UnitView from "../pages/admin/Units/UnitView";
import UnitDelete from "../pages/admin/Units/UnitDelete";

// Clients
import Clients from "../pages/admin/Clients/index";
import ClientAdd from "../pages/admin/Clients/ClientAdd";
import ClientEdit from "../pages/admin/Clients/ClientEdit";
import ClientView from "../pages/admin/Clients/ClientView";
import ClientDelete from "../pages/admin/Clients/ClientDelete";

// Drivers
import Drivers from "../pages/admin/Drivers/index";
import DriverAdd from "../pages/admin/Drivers/DriverAdd";
import DriverEdit from "../pages/admin/Drivers/DriverEdit";
import DriverView from "../pages/admin/Drivers/DriverView";
import DriverDelete from "../pages/admin/Drivers/DriverDelete";

// Financials
import Payments from "../pages/admin/Financials/Payments";
import Expenses from "../pages/admin/Financials/Expenses/index";
import ExpenseAdd from "../pages/admin/Financials/Expenses/ExpenseAdd";
import ExpenseDelete from "../pages/admin/Financials/Expenses/ExpenseDelete";

// Other
import Tracking from "../pages/admin/Tracking";
import Messages from "../pages/admin/Messages";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AdminProvider>
      <div className="min-h-screen flex bg-black text-grayLight font-sans selection:bg-green/30 selection:text-white">
        <ScrollToTop />

        <AdminSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/20">
          <AdminHeader
            sidebarOpen={sidebarOpen}
            onToggleSidebar={() => setSidebarOpen((p) => !p)}
          />

          <main className="flex-1 px-4 md:px-8 pb-10 relative z-0">
            <Routes>
              {/* Dashboard */}
              <Route index element={<Dashboard />} />

              {/* Bookings */}
              <Route path="bookings" element={<Bookings />} />
              <Route path="bookings/add" element={<BookingAdd />} />
              <Route path="bookings/:id/edit" element={<BookingEdit />} />
              <Route path="bookings/:id" element={<BookingView />} />
              <Route path="bookings/:id/delete" element={<BookingDelete />} />

              {/* Units */}
              <Route path="units" element={<Units />} />
              <Route path="units/add" element={<UnitAdd />} />
              <Route path="units/:id/edit" element={<UnitEdit />} />
              <Route path="units/:id" element={<UnitView />} />
              <Route path="units/:id/delete" element={<UnitDelete />} />

              {/* Clients */}
              <Route path="clients" element={<Clients />} />
              <Route path="clients/add" element={<ClientAdd />} />
              <Route path="clients/:id/edit" element={<ClientEdit />} />
              <Route path="clients/:id" element={<ClientView />} />
              <Route path="clients/:id/delete" element={<ClientDelete />} />

              {/* Drivers */}
              <Route path="drivers" element={<Drivers />} />
              <Route path="drivers/add" element={<DriverAdd />} />
              <Route path="drivers/:id/edit" element={<DriverEdit />} />
              <Route path="drivers/:id" element={<DriverView />} />
              <Route path="drivers/:id/delete" element={<DriverDelete />} />

              {/* Financials */}
              <Route path="financials/payments" element={<Payments />} />
              <Route path="financials/expenses" element={<Expenses />} />
              <Route path="financials/expenses/add" element={<ExpenseAdd />} />
              <Route path="financials/expenses/:id/delete" element={<ExpenseDelete />} />

              {/* Other */}
              <Route path="tracking" element={<Tracking />} />
              <Route path="messages" element={<Messages />} />
            </Routes>
          </main>
        </div>
      </div>
    </AdminProvider>
  );
};

export default AdminLayout;
