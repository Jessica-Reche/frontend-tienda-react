/* eslint-disable no-unused-expressions */
import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import logo from '../../assets/logo-2.png';
import { Badge, Button } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useStateValue } from '../../context/StateProvider';
import { actionTypes } from '../../reducer';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { MenuItem } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import { useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import StorefrontIcon from '@mui/icons-material/Storefront';
import HomeIcon from '@mui/icons-material/Home';
import useAuth from '../../hooks/useAuth';
import { StyledAppBar } from './navbarStyles';

export default function Navbar() {

    // eslint-disable-next-line 
    let [{ basket }, dispatch] = useStateValue();
    const { isLogged, logout, user, admin } = useAuth();
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
    const isMobile = useMediaQuery('(max-width:600px)');
    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };
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
        <Box className='root' data-cy='navbar'>
            <StyledAppBar position="fixed">
                <Toolbar>
                    {isMobile && (
                        <IconButton
                            edge="start"
                            color="secondary"
                            aria-label="menu"
                            onClick={toggleDrawer}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}

                    <Link to="/">
                        <IconButton>
                            <img className='image' src={logo} alt="logo" />
                        </IconButton>
                    </Link>
                    {!isMobile && (
                        <Link to="/products">
                            <MenuItem>
                                <Link to="/products"><StorefrontIcon /></Link>
                                <Typography variant="h6" color="textPrimary" component="p">
                                    Postres
                                </Typography>
                            </MenuItem>
                        </Link>
                    )}
                    <div className='grow' />
                    <Typography variant="h6" color="textPrimary" component="p">
                        Hello {user ? user : 'Guest'}
                    </Typography>
                    <div className='button' >
                        {admin && !isMobile && <Link to="/admin/products">
                            <IconButton aria-label='show cart items' color='inherit'>
                                <Badge color="secondary">
                                    <DashboardIcon fontSize='medium' color='primary' />
                                </Badge>
                            </IconButton>
                        </Link>}
                        <Link to="/checkout-page">
                            <IconButton aria-label='show cart items' color='inherit'>
                                <Badge badgeContent={basket.length} color="secondary">
                                    <ShoppingCart fontSize='large' color='primary' />
                                </Badge>
                            </IconButton>
                        </Link>
                        {!isMobile && <Link to="/signin" onClick={handleAuth}>

                            <Button size="small" variant="contained" href="#contained-buttons">
                                <strong>{isLogged ? "Cierra Sesión" : "Inicia Sesión"}</strong>
                            </Button>

                        </Link>}
                        {!isLogged && <Link to="/signup">
                            <Button size="small" variant="contained" href="#contained-buttons">
                                <strong>Registrarse</strong>
                            </Button>
                        </Link>}
                    </div>

                    <Drawer anchor='left' open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
                        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                            <MenuItem>
                                <Link to="/"><HomeIcon /></Link>
                            </MenuItem>

                            {admin && <MenuItem>
                                <Link to="/admin/products"><DashboardIcon /></Link>
                            </MenuItem>}
                            <MenuItem>
                                <Link to="/products"><StorefrontIcon /></Link>
                            </MenuItem>
                            <MenuItem>
                                <Link onClick={handleAuth} to="/signin">{isLogged ? <LoginIcon /> : <LogoutIcon />} </Link>
                            </MenuItem>
                        </Box>
                    </Drawer>
                </Toolbar>


            </StyledAppBar>
        </Box>
    );
};
