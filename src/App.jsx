import { Route, Routes } from "react-router-dom";
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";

// User Pages
import Home from "./pages/user/home/Home";
import About from "./pages/user/about/About";
import Contact from "./pages/user/contact/Contact";
import Cars from "./pages/user/cars/Cars";
import CarDetails from "./pages/user/carDetails/CarDetails";
import Cart from "./pages/user/Cart/Cart";
import Reservation from "./pages/user/reservation/Reservation";
import Checkout from "./pages/user/checkout/Checkout";
import User from "./pages/user/userPage/User";

// Auth Pages
import Login from "./pages/auth/login/Login";
import SignUp from "./pages/auth/signup/SignUp";

// Admin Pages
import Dashboard from "./pages/admin/Dashboard";
import Bookings from "./pages/admin/Bookings";
import Units from "./pages/admin/Units/index";
import Clients from "./pages/admin/Clients";
import Drivers from "./pages/admin/Drivers";
import Payments from "./pages/admin/Financials/Payments";
import Expenses from "./pages/admin/Financials/Expenses";
import Tracking from "./pages/admin/Tracking";
import Messages from "./pages/admin/Messages";

import NotFound from "./pages/notFound/NotFound";

const App = () => {
  return (
    <Routes>
      {/* User Routes with UserLayout */}
      <Route path="/" element={<UserLayout />}>
        <Route index element={<Home />} />
        <Route path="user" element={<User />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="cars" element={<Cars />} />
        <Route path="car/:id" element={<CarDetails />} />
        <Route path="cart" element={<Cart />} />
        <Route path="reservation" element={<Reservation />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>

      {/* Auth Routes (no layout) */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<SignUp />} />

      {/* Admin Routes with AdminLayout */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="units" element={<Units />} />
        <Route path="clients" element={<Clients />} />
        <Route path="drivers" element={<Drivers />} />
        <Route path="financials/payments" element={<Payments />} />
        <Route path="financials/expenses" element={<Expenses />} />
        <Route path="tracking" element={<Tracking />} />
        <Route path="messages" element={<Messages />} />
      </Route>

      {/* Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
