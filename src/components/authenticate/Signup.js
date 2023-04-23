import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { useEffect } from 'react';
import { Input } from '@mui/material';
import { Snackbar, Alert } from "@mui/material";
const theme = createTheme();

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};


export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate();
  const { isLogged, isLoginLoading, login, register } = useAuth();

  //useEffecte para redirigir a la pagina de inicio si el usuario esta logueado
  useEffect(() => {
    if (isLogged)
      navigate("/", { state: { message: message } });
  }, [isLogged, navigate, message]);


  const handleSignUp = async (event) => {
    event.preventDefault();

    const userData = {
      name,
      username,
      email,
      password,
    };
    console.log(userData);
    try {
      let result = await register(userData);

      if (result.status === true) {
        login(email, password);
        setShowNotification(true);
        setMessage(result.message);

      } else {
        setMessage(result.message);
      }
    }
    catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '13rem'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          {isLoginLoading && <strong> Checking credentials...</strong>}
          {!isLoginLoading && <Box component="form" noValidate onSubmit={handleSignUp} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  color="secondary"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="given-username"
                  name="name"

                  fullWidth
                  id="name"
                  label="name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>

                <TextField

                  color="secondary"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="given-username"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="username"
                  autoFocus
                />
              </Grid>


              <Grid item xs={12}>
                <Input
                  color="secondary"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  placeholder="Email"

                />


              </Grid>
              <Grid item xs={12}>

                <Input

                  color="secondary"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  placeholder="Password"
                />

              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
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
            <Button

              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}

            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <RouterLink to="/signin" href="#" variant="body2">
                  Already have an account? Sign in
                </RouterLink>
              </Grid>
            </Grid>
          </Box>}

        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}