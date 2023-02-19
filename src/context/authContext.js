import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { loginUser, logoutUser } from "../database/auth/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userAuth, setUser] = useState(window.localStorage.getItem("user"));
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const  [isAdmin, setIsAdmin] = useState(window.localStorage.getItem("isAdmin"));

    useEffect(() => {


        if (token) {
            // Si hay un token en el local storage, actualiza el token en el estado del contexto.
            setToken(token);
            setUser(userAuth);
            setIsAdmin(isAdmin);
           
        }
    }, [token]);

    const login = useCallback(async (email, password) => {
        const response = await loginUser(email, password);
        if (response.status === true) {
            setUser(response.user);
            setToken(response.token);
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
