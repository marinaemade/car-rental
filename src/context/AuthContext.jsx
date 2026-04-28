import { createContext, useContext, useState } from "react"

const AuthContext = createContext();

export const Auth = ({children})=>{
  const [logged, setLogged] = useState(false)
  const [user, setUser] = useState(null)

  const login = ()=> {};

  const logout = ()=> {};

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