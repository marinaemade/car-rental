import { Route, Routes } from 'react-router-dom';
import ScrollToTop from '../components/common/ScrollToTop/ScrollToTop';
import AdminHeader from '../components/admin/AdminHeader';
import AdminSidebar from '../components/admin/AdminSidebar';
import Footer from '../components/common/Footer/Footer';
import Dashboard from '../pages/admin/Dashboard';
import Bookings from '../pages/admin/Bookings';
import Units from '../pages/admin/Units/index';
import Clients from '../pages/admin/Clients';
import Drivers from '../pages/admin/Drivers';
import Payments from '../pages/admin/Financials/Payments';
import Expenses from '../pages/admin/Financials/Expenses';
import Tracking from '../pages/admin/Tracking';
import Messages from '../pages/admin/Messages';

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-col md:flex-row flex-grow">
        <ScrollToTop />
        
        <AdminHeader />
        <AdminSidebar />

        {/* Main Content */}
        <main className="flex-grow bg-black p-4 md:p-8">
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="units" element={<Units />} />
            <Route path="clients" element={<Clients />} />
            <Route path="drivers" element={<Drivers />} />
            <Route path="financials/payments" element={<Payments />} />
            <Route path="financials/expenses" element={<Expenses />} />
            <Route path="tracking" element={<Tracking />} />
            <Route path="messages" element={<Messages />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AdminLayout;
