import AuthContext from "../context/authContext";
import { useContext, useCallback, useState } from "react";
import { loginUser, registerUser } from "../database/auth/auth";
export default function useAuth() {
    const { token, setToken, user, setUser, admin, setAdmin } = useContext(AuthContext);
    const [state, setState] = useState({ loading: false, error: true });
    const login = useCallback((email, password) => {
        setState({ loading: true, error: false })
        loginUser(email, password).then((data) => {
            window.sessionStorage.setItem('token', data.token);
            window.sessionStorage.setItem('user', data.user.username);

            setState({ loading: false, error: false })
            setToken(data.token);
            setUser(data.user.username);
            if (data.user.rol.name === "admin") {
                window.sessionStorage.setItem('admin', true);
                setAdmin(true);
            }
        })
            .catch((error) => {
                window.sessionStorage.removeItem('token');
                window.sessionStorage.removeItem('user');
                window.sessionStorage.removeItem('admin');
                setState({ loading: false, error: true })
                console.error(error);
            }
            );
    }, [setToken]);

    const register = useCallback(({ username, email, password }) => {
        setState({ loading: true, error: false })
        registerUser(username, email, password).then((data) => {
            if (data.status===true) {
                setState({ loading: false, error: false });
                login(email, password)
            } else {
                setState({ loading: false, error: true });
                console.log(data)
                return data;
            }
        })
            .catch((error) => {
                setState({ loading: false, error: true })
                console.error(error);
                return error;
            }
            );
    }
        , [])


    const logout = useCallback(() => {
        window.sessionStorage.removeItem('user');
        window.sessionStorage.removeItem('token');
        window.sessionStorage.removeItem('admin');
        setToken(null);
        setUser(null);
        setAdmin(false);

    }, [setToken])

    return {
        isLogged: Boolean(token),
        login,
        logout,
        isLoginLoading: state.loading,
        hasLoginError: state.error,
        register,
        user,
        admin,
        token
    }

}