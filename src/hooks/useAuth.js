import AuthContext from "../context/authContext";
import { useContext, useCallback, useState } from "react";
import { loginUser, registerUser, getUsers, deleteUser, updateUser } from "../database/auth";
import { useEffect } from "react";

export default function useAuth() {
    const { token, setToken, user, setUser, admin, setAdmin } = useContext(AuthContext);
    const [state, setState] = useState({ loading: false, error: true });
    const [users, setUsers] = useState([]);
    const login = useCallback(async(email, password) => {
        const  response = await loginUser(email, password);
        console.log(response);
        if (response.status === true) {
            window.sessionStorage.setItem('token', response.token);
            window.sessionStorage.setItem('user', response.user.username);
            setToken(response.token);
            setUser(response.user.username);
            if (response.user.rol.name === "admin") {
                window.sessionStorage.setItem('admin', true);
                setAdmin(true);
            }
            setState({ loading: false, error: false });
        } else {
            console.log(response);
            setState({ loading: false, error: true });
        }
        return response;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setToken]);
    const register = useCallback(async (objectData) => {
        setState({ loading: true, error: false });
        const response = await registerUser(objectData);
        if (response.status === true) {
            setState({ loading: false, error: false });
        } else {
            setState({ loading: false, error: true });
        }
        return response;
        // eslint-disable-next-line react-hooks/exhaustive-deps    
    }, []);

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
        setState({ loading: true, error: false });
        const data = await getUsers(token);
        setState({ loading: false, error: false });
        setUsers(data.users);
    }, [token]);

    const deleteUserById = useCallback(async (id) => {
        const response = await deleteUser(id, token);
        const updatedUsers = users.filter(user => user._id !== id);
        setUsers(updatedUsers);
        return response;

    }, [token, users]);

    const updateUserById = useCallback(async (id, userData) => {
        const response = await updateUser(id, userData, token);
        const updatedUsers = users.map(user => user._id === id ? userData : user);
        setUsers(updatedUsers);
        console.log(response);
        return response;
    }, [token, users]);

    useEffect(() => {
        if (admin) getUsersCallback();
    }, [register, admin, getUsersCallback]);

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
        deleteUserById,
        updateUserById
    }

}