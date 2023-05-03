import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { FormProvider, useForm } from 'react-hook-form'
import CustomInput from '../CustomInput';
import { useState } from 'react';
import { Snackbar, Alert } from "@mui/material";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <RouterLink color="inherit" href="https://mui.com/">
        Your Website
      </RouterLink>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};
const theme = createTheme();
export default function SignIn() {
  const methods = useForm();
  const navigate = useNavigate();
  const { isLoginLoading, isLogged, login } = useAuth();
  const [message, setMessage] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  useEffect(() => {
    if (isLogged) navigate('/', { state: { message: message } });
  }, [isLogged, navigate, message])
  const onSubmit = async (data) => {
    const { email, password } = data;
    let result = await login(email, password);
    if (result === true) {
    setMessage(result.message);
    setShowNotification(true);
    } else {
      setMessage(result.message);
    }
  }
  const boxStyled = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '13rem'
  }
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={boxStyled}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}><LockOutlinedIcon />  </Avatar>
          <Typography component="h1" variant="h5">  Sign in </Typography>
          {isLoginLoading && <strong> Checking credentials...</strong>}
          {!isLoginLoading &&
            <FormProvider {...methods}>
              <Box component="form" onSubmit={methods.handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                <CustomInput label="Email" name="email" type="email" />
                <CustomInput label="Password" name="password" type="password" />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                {showNotification && <Typography sx={{ textTransform: "none" }} color="green" variant="body2">
                  {message}
                </Typography>}
                {!showNotification && <Typography sx={{ textTransform: "none" }} color="error" variant="body2">
                  {message}
                </Typography>}
                <Snackbar
                  open={showNotification}
                  autoHideDuration={3000}
                  onClose={() => setShowNotification(false)}
                >
                  <Alert
                    onClose={() => setShowNotification(false)}
                    severity="success"
                    sx={{ width: "100%" }}
                  >
                    User created successfully
                  </Alert>
                </Snackbar>
                <br />
                <Button data-cy="signin-submit" type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <RouterLink href="#" variant="body2"> Forgot password?</RouterLink>
                  </Grid>
                  <Grid item>
                    <RouterLink href="#" variant="body2" to="/signup"> {"Don't have an account? Sign Up"}</RouterLink>
                  </Grid>
                </Grid>
              </Box>
            </FormProvider>
          }
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
} 
