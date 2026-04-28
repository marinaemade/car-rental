import { Route, Routes } from "react-router-dom";
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";

// Auth Pages
import Login from "./pages/auth/login/Login";
import SignUp from "./pages/auth/signup/SignUp";
import NotFound from "./pages/notFound/NotFound";
import { Auth } from "./context/AuthContext"

const App = () => {

  return (
    <Auth>
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
    </Auth>
  );
};

export default App;