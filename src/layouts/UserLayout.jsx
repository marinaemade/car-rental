import { Route, Routes } from "react-router-dom";
import Nav from "../components/user/navbar/Nav";
import Footer from "../components/common/Footer/Footer";
import ScrollToTop from "../components/common/ScrollToTop/ScrollToTop";
import Home from "../pages/user/home/Home";
import About from "../pages/user/about/About";
import Contact from "../pages/user/contact/Contact";
import Cars from "../pages/user/cars/Cars";
import CarDetails from "../pages/user/carDetails/CarDetails";
import Cart from "../pages/user/Cart/Cart";
import Reservation from "../pages/user/reservation/Reservation";
import Checkout from "../pages/user/checkout/Checkout";
import User from "../pages/user/userPage/User";
import ThemeProvider from "../context/ThemeContext";
const UserLayout = () => {
  return (
    <ThemeProvider> {/* ✅ لفّي كل ال Layout */}
      <div className="min-h-screen flex flex-col">
        <ScrollToTop />
        <Nav />

        <main className="flex-grow">
          <Routes>
            <Route index element={<Home />} />
            <Route path="user" element={<User />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="cars" element={<Cars />} />
            <Route path="cars/:id" element={<CarDetails />} />
            <Route path="cart" element={<Cart />} />
            <Route path="reservation" element={<Reservation />} />
            <Route path="checkout" element={<Checkout />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default UserLayout;
