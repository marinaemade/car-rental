import React from "react";
import { Route, Routes } from "react-router-dom";
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";

// Auth Pages
import Login from "./pages/auth/login/Login";
import SignUp from "./pages/auth/signup/SignUp";
import NotFound from "./pages/notFound/NotFound";
import { Auth  } from "./context/AuthContext";
import { BookingProvider } from "./context/BookingContext";
import User from "./pages/user/userPage/User";

const App = () => {

  return (
     <Auth>
       <BookingProvider>
      <Routes>
        {/* Auth Routes (no layout) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />


        {/* User Routes */}
        <Route path="/*" element={<UserLayout />} />
        
        {/* Admin Routes */}
        <Route path="/admin/*" element={<AdminLayout />} />

        {/* Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BookingProvider>
      </Auth>


  );
};

export default App;
