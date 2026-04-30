import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react"

const AuthContext = createContext();

export const Auth = ({children})=>{
  const [logged, setLogged] = useState(false)
  const [user, setUser] = useState(null)

  const login = (token)=> {
    setLogged(true);
    localStorage.tc = token;
    const userData = jwtDecode(token);
    setUser(userData);
  };

  const logout = ()=> {
    setLogged(false);
    localStorage.removeItem("tc")
    setUser(null);
  };

  //useEffect.. when the user make refresh
  useEffect(()=>{
    if (localStorage.tc){ //there is a token 
      login(localStorage.tc); //call login to reture the state of the setLogged to "true" when the user refreshes

    }
  },[]);

  return <AuthContext.Provider
    value={{logged, setLogged, user, setUser, login, logout}}
  >
    {children}

  </AuthContext.Provider>
};

//custom hook:
export const useAuth = ()=>{
  return useContext(AuthContext);
};


export default AuthContext;