import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

// Create Context
const AuthContext = createContext();

export const Auth = ({ children }) => {
  const [logged, setLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = (token) => {
    setLogged(true);
    localStorage.setItem("tc", token);
    const userData = jwtDecode(token);
    setUser(userData);
  };

  const logout = () => {
    setLogged(false);
    localStorage.removeItem("tc");
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("tc");
    if (token) {
      // there is a token
      login(token); // call login to restore the state of setLogged to "true" when the user refreshes
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{ logged, setLogged, user, setUser, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AdminGuard = ({ children }) => {
  const { logged, user, loading } = useAuth();
  if (loading) {
    return null; // or return a loading spinner
  }
  if (!logged || user?.role !== "admin") {
    return <Navigate to="/not-found" replace />;
  }
  return children;
};

export default AuthContext;
