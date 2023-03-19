import AuthContext from "../context/authContext";
import { useContext, useCallback, useState } from "react";
import { loginUser, registerUser, getUsers, deleteUser } from "../database/auth/auth";
import { useEffect } from "react";
export default function useAuth() {
    const { token, setToken, user, setUser, admin, setAdmin } = useContext(AuthContext);
    const [state, setState] = useState({ loading: false, error: true });
    const [users, setUsers] = useState([]);
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

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setToken]);

    const register = useCallback(({ username, email, password }) => {
        setState({ loading: true, error: false })
        registerUser(username, email, password).then((data) => {
            if (data.status === true) {
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
        , []);

    const logout = useCallback(() => {
        window.sessionStorage.removeItem('user');
        window.sessionStorage.removeItem('token');
        window.sessionStorage.removeItem('admin');
        setToken(null);
        setUser(null);
        setAdmin(false);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setToken]);

    const getUsersCallback = useCallback(async () => {
        const data = await getUsers(token);
        setUsers(data.users);
      }, [token]);

      const deleteUserById = useCallback(async (id) => {
        await deleteUser(id, token);
        const updatedUsers = users.filter(user => user._id !== id);
        setUsers(updatedUsers);
      }, [token, users]);
      

    
      useEffect(() => {
        getUsersCallback();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

    return {
        isLogged: Boolean(token),
        login,
        logout,
        isLoginLoading: state.loading,
        hasLoginError: state.error,
        register,
        user,
        admin,
        token,
        users,
        deleteUserById
    }

}