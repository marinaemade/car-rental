// User layout
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
import PaymentDetails from "../pages/user/reservation/PaymentDetails";
import Checkout from "../pages/user/checkout/Checkout";
import ThemeProvider from "../context/ThemeContext";
import BookingsTab from './../pages/user/userPage/BookingsTab';
import ProfileTab from './../pages/user/userPage/ProfileTab';
import LoggedUsers from './../context/LoggedUsers';

const UserLayout = () => {
  return (
    <ThemeProvider> 
      <div className="min-h-screen flex flex-col">
        <ScrollToTop />
        <Nav />

        <main className="flex-grow">
          <Routes>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />

            <Route path="cars" element={<Cars />} />
            <Route path="cars/:id" element={<CarDetails />} />

            <Route path="cart" element={<Cart />} />
            <Route path="reservation" element={<Reservation />} />

            <Route
              path="user-profile"
              element={
                <LoggedUsers>
                  <ProfileTab />
                </LoggedUsers>
              }
            />

            <Route
              path="user-bookings"
              element={
                <LoggedUsers>
                  <BookingsTab />
                </LoggedUsers>
              }
            />

            <Route path="payment" element={<PaymentDetails />} />
            <Route path="checkout" element={<Checkout />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </ThemeProvider>

  );
};

export default UserLayout;
