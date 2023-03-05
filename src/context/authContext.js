//context 
 import { createContext, useState, useEffect } from "react";

 const AuthContext = createContext({});


export  function AuthProvider({children}) {
    
    const [token, setToken] = useState( () => window.localStorage.getItem('token'));
    const [user,setUser] = useState(()=>  window.localStorage.getItem('user'));
    const [admin,setAdmin] = useState(()=>  window.localStorage.getItem('admin'));
 useEffect(() => {
        if (!token) {
            setUser(null);
            setAdmin(false);
        }
   },[token])
    return (
        <AuthContext.Provider value={{token, setToken, user, setUser, admin, setAdmin}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext

