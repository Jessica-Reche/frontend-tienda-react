import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems } from './listItems';
import { Routes, Route, useLocation } from 'react-router-dom';
import ProductsAdmin from './ProductsAdmin/ProductsAdmin';
import CreateProductForm from './forms/CreateProductForm';
import UpdateProductForm from './forms/UpdateProductForm';
import { Alert, Snackbar, useMediaQuery } from '@mui/material';
import UsersAdmin from './UsersAdmin/UsersAdmin';
import CreateUserForm from './forms/CreateUserForm';
import UpdateUserForm from './forms/UpdateUserForm';
import { useState } from 'react';




function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit">
               Natural Cherry
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

const mdTheme = createTheme();
function DashboardContent() {

    const isMobile = useMediaQuery('(max-width:768px)');
    const [open, setOpen] = React.useState(!isMobile);
    const { state, status } = useLocation();
    const [showNotification, setShowNotification] = useState(false);
    const [message, setMessage] = useState('');
    const toggleDrawer = () => {
        setOpen(!open);
    };
 
    const finalStatus = status ? status : true;
    React.useEffect(() => {
        if (isMobile) {
            setOpen(false);
        } else {
            setOpen(true);
        }

        if (state && state.message) {
            setShowNotification(true);
            setMessage(state.message);
        }


    }, [isMobile, state]);

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="absolute" open={open}>
                    <Toolbar
                        sx={{
                            pr: '24px', // keep right padding when drawer closed
                            //trasparente
                            backgroundColor: '#3f51b5',
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            Dashboard
                        </Typography>
                        <IconButton color="inherit">
                            <Badge badgeContent={4} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1],
                        }}
                    >
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <List component="nav">
                        {mainListItems}
                        <Divider sx={{ my: 1 }} />
                        {secondaryListItems}
                    </List>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                    <Routes>
                                        <Route path='products' element={<ProductsAdmin />} />
                                        <Route path='products/new' element={<CreateProductForm />} />
                                        <Route path='products/edit/:id' element={<UpdateProductForm />} />
                                        <Route path='users' element={<UsersAdmin />} />
                                        <Route path='users/new' element={<CreateUserForm />} />
                                        <Route path='users/edit/:id' element={<UpdateUserForm />} />
                                    </Routes>
                                </Paper>
                            </Grid>
                        </Grid>
                        {message && (
                            <Snackbar
                                key={message}
                                open={showNotification}
                                autoHideDuration={6000}
                                onClose={() => setShowNotification(false)}
                                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                            >
                                <Alert
                                    onClose={() => setShowNotification(false)}
                                    severity={finalStatus === true ? "success" : "error"}
                                    sx={{
                                        width: "100%",
                                        fontSize: "1.2rem",
                                        padding: "1.5rem",
                                        border: "2px solid black",
                                    }}
                                >
                                    {message}
                                </Alert>
                            </Snackbar>
                        )}



                        <Copyright sx={{ pt: 4 }} />
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default function Dashboard() {
    return <DashboardContent />;
}