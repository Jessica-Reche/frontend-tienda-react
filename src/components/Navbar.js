import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import logo from '../assets/logo-tarta.png';
import { styled } from "@mui/material/styles";
import { Badge, Button } from '@mui/material';
import { Logout, ShoppingCart } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useStateValue } from '../context/StateProvider';

import { actionTypes } from '../utils';
import { useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import useAuth from '../hooks/useAuth';
const StyledAppBar = styled(AppBar)({
    background: "whitesmoke",
    boxShadow: "none",

    '.root': {
        flexGrow: 1,

    },
    '.grow': {
        flexGrow: 1,
    },
    '.button': {
        ' .MuiButton-root': {
            marginLeft: '0.3em',
        }
    },

    '.image': {
        marginRight: "1rem",
        height: "11rem",
    },
   
    '.hide-element': {
       opacity: 0,
    },


});

export default function Navbar() {


//Si no hay usuario se vacía
    const [{ basket }, dispatch] = useStateValue();
   // const { token, userAuth, isAdmin } = useAuth();
    const { isLogged,logout, user } = useAuth();

    const handleAuth = () => {
        if (isLogged) {
            dispatch({
                type: actionTypes.EMPTY_BASKET,
                basket: [],
            }); 
            logout();
           
           // dispatch({ type: actionTypes.SET_USER, user: null });
        }  
    };
    return (

        <Box className='root'>
            <StyledAppBar position="sticky">
                <Toolbar>
                    <Link to="/">
                        <IconButton>
                            <img className='image' src={logo} alt="logo" />
                        </IconButton>
                    </Link>

                    <div className='grow' />
                    <Typography variant="h6" color="textPrimary" component="p">
                     Hello {user ? user : 'Guest'} 
                    </Typography>
                    <div className='button' >

                        <Link to="/admin/products">
                            <IconButton aria-label='show cart items' color='inherit'>
                                <Badge color="secondary">
                                    <DashboardIcon fontSize='medium' color='primary' />
                                </Badge>
                            </IconButton>
                        </Link>





                        <Link to="/checkout-page">
                            <IconButton aria-label='show cart items' color='inherit'>
                                <Badge badgeContent={basket.length} color="secondary">
                                    <ShoppingCart fontSize='large' color='primary' />
                                </Badge>
                            </IconButton>
                        </Link>

                       

                         
                                {/* <strong>{user ? "Sing Out" : "Sing In"}</strong> */}
                             
                                  
                                <Link to="/signin" onClick={handleAuth}>
                            
                                   <Button variant="outlined" color="secondary" href="#contained-buttons">
                                      <strong>{isLogged ? "Sing Out" : "Sing In"}</strong>
                                   </Button> 
                                </Link>

                           
                       
                    </div>
                </Toolbar>
            </StyledAppBar>
        </Box>
    );
};
