import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { loginUser, logoutUser } from "../database/auth/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userAuth, setUser] = useState(localStorage.getItem("user"));
    const [token, setToken] = useState(localStorage.getItem("token"));
    const  [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin"));

    useEffect(() => {


        if (userAuth) {
            // Si hay un token en el local storage, actualiza el token en el estado del contexto.
            setToken(token);
            setUser(userAuth);
            setIsAdmin(isAdmin);
           
        }
    }, [userAuth]);

    const login = useCallback(async (email, password) => {
        const response = await loginUser(email, password);
        if (response.status === true) {
            setToken(response.token);
            setUser(response.user);
            
            setIsAdmin(localStorage.getItem("isAdmin"));
            return response;
        } else {
            logoutUser();
            setUser(null);
            setToken(null);
         
            return null;
        }
    }, []);


    const logout = useCallback(() => {
        setUser(null);
        setToken(null);
        logoutUser();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                userAuth,
                token,
                isAdmin,
                login,
                logout,
                
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
