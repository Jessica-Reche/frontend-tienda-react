import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import logo from '../assets/cuttevents.png';
import { styled } from "@mui/material/styles";
import { Badge, Button } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useStateValue } from '../context/StateProvider';

import { actionTypes } from '../utils';
import { useNavigate } from 'react-router-dom';


const StyledAppBar = styled(AppBar)({
    background: "whitesmoke",
    boxShadow: "none",

    '.root': {
        flexGrow: 1,
        marginBottom: "7rem",
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
        height: "2.5rem",
    },


});

export default function Navbar() {
    const [{ basket, user }, dispatch] = useStateValue();
    const navigate = useNavigate();
    const handleAuth = () => {
        if (user) {
            dispatch({
                type: actionTypes.EMPTY_BASKET,
                basket: [],
            });
            dispatch({ type: actionTypes.SET_USER, user: null });
            navigate('/', { replace: true })

        }
    }

    return (
        <Box className='root'>
            <StyledAppBar position="fixed">
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
                        <Link to="/signin" onClick={handleAuth}>
                            <Button variant="outlined" href="#contained-buttons">
                                <strong>{user ? "Sing Out" : "Sing In"}</strong>
                            </Button>
                        </Link>

                        <Link to="checkout-page">
                            <IconButton aria-label='show cart items' color='inherit'>
                                <Badge badgeContent={basket.length} color="secondary">
                                    <ShoppingCart fontSize='large' color='primary' />
                                </Badge>
                            </IconButton>
                        </Link>
                    </div>
                </Toolbar>
            </StyledAppBar>

        </Box >
    );
};
