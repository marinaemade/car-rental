import { Route, Routes } from "react-router-dom";
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";

// Auth Pages
import Login from "./pages/auth/login/Login";
import SignUp from "./pages/auth/signup/SignUp";
import NotFound from "./pages/notFound/NotFound";

const App = () => {
  return (
    <Routes>
      {/* User Routes */}
      <Route path="/*" element={<UserLayout />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<SignUp />} />

      <Route path="/admin/*" element={<AdminLayout />} />


      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
