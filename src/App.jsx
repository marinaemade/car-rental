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
import { AdminGuard } from "./context/AuthContext";
import { BookingProvider } from "./context/BookingContext";


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

          {/* Admin Routes — protected, admin only */}
          <Route
            path="/admin/*"
            element={
              <AdminGuard>
                <AdminLayout />
              </AdminGuard>
            }
          />

          {/* Not Found */}
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BookingProvider>
    </Auth>
  );
};

export default App;
