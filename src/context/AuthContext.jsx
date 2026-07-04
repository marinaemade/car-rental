import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";

// Create Context
const AuthContext = createContext();

export const Auth = ({ children }) => {
  const [logged, setLogged] = useState(false);
  const [user, setUser] = useState(null);

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
    if (token) { // there is a token
      login(token); // call login to restore the state of setLogged to "true" when the user refreshes
    }
  }, []);

  return (
    <AuthContext.Provider value={{ logged, setLogged, user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hook:
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;