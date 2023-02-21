import AuthContext from "../context/authContext";
import { useContext, useCallback, useState } from "react";
import { loginUser, registerUser } from "../database/auth/auth";



export default function useAuth() {
    const {token, setToken, user,setUser,admin,setAdmin} = useContext(AuthContext);

    const [state, setState] = useState({loading:false, error:true});

 

    const login = useCallback(({username, password}) => {
        setState({loading:true, error:false})
        loginUser(username, password).then((data) => {
            window.sessionStorage.setItem('token', data.token);
            window.sessionStorage.setItem('user', data.user);
            setState({loading:false, error:false})
            setToken(data.token);
            setUser(data.user);
            //si el usuario es administrador, se setea asmin a true
            if(data.user.rol.name === "admin"){ 
                setAdmin(true);
            }

  

        })
        .catch((error) => {
            window.sessionStorage.removeItem('token');
            window.sessionStorage.removeItem('user');
            window.sessionStorage.removeItem('admin');
            setState({loading:false, error:true})
            console.error(error);
        }
        );
    }, [setToken]);

   const registrer = useCallback(({username, email, password})=>{
        setState({loading:true, error:false})
        registerUser(username, email, password).then((data) => {
            setState({loading:false, error:false})
           
        })
        .catch((error) => {
            setState({loading:false, error:true})
            console.error(error);
        }
        );
      
    }
    ,[])

    
   const logout = useCallback (()=>{
    window.sessionStorage.removeItem('token');
    window.sessionStorage.removeItem('user');
        setToken(null);
        setUser(null);
    
   },[setToken])




    return  {
        isLogged: Boolean(token),
        login,
        logout,
        isLoginLoading: state.loading,
        hasLoginError: state.error,
        registrer,
        user,
        admin
    }

}