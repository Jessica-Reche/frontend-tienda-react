import * as React from 'react';
import { Paper, Grid, Button, Typography, Input } from '@mui/material';
import useAuth from '../../hooks/useAuth';
import { useState } from 'react';
import { Snackbar, Alert } from "@mui/material";
import { StyledCarousel } from './carouselStyles';
import items from './options';
import { Link } from 'react-router-dom';

const CarouselItem = ({ item }) => {
  const { register, login, } = useAuth();
  const [message, setMessage] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  const handleSignUp = async (event) => {
    const actionStatusTrue = (email, password) => {
      login(email, password);
    }
    event.preventDefault();
    const userData = {
      username: event.target.elements.username.value,
      email: event.target.elements.email.value,
      password: event.target.elements.password.value,
    };
    try {
      const { email, password } = userData;
      console.log(userData);
      let result = await register(userData);
      if (result.status === true) {
        actionStatusTrue(email, password);
        setMessage(result.message);
        setShowNotification(true);
      } else {
        setMessage(result.message);
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <Paper className="CarouselItem">
      <img src={item.image} alt={item.name} />
      <h2>{item.name}</h2>
      <p className='CarouselItemP'>{item.description}</p>
      
      <Button component={Link} to="/products" className="buttonVerMas" variant="contained">Ver más</Button>
      <div className="marketing-info" sx={{ display: 'flex' }}>
        <h3>¡Regístrate ahora y obtén un 10% de descuento en tu primer pedido!</h3>
        <form onSubmit={handleSignUp}>
          <Grid container spacing={2}>
            <Grid item xs={6} sm={3}>
              <Input name='username' type="text" placeholder="Usuario" sx={{ backgroundColor: '#f5f5f5' }} />
            </Grid>
            <Grid item xs={6} sm={3}>
              <Input name='email' type="email" placeholder="Email" sx={{ backgroundColor: '#f5f5f5' }} />
            </Grid>
            <Grid item xs={6} sm={3} >
              <Input name="password" type="password" placeholder="contraseña" sx={{ backgroundColor: '#f5f5f5' }} />
            </Grid>
            <Grid item xs={6} sm={3}>
              <Button className='buttonRegister' variant='contained' type="submit">Registrarse</Button>
            </Grid>
          </Grid>
          {showNotification && <Typography sx={{ textTransform: "none" }} color="green" variant="body2">
            {message}
          </Typography>}
          {!showNotification && <Typography sx={{ textTransform: "none" }} color="error" variant="body2">
            {message}
          </Typography>}
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
                severity="success"
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
        </form>
      </div>
    </Paper>
  );
};

const CarouselComponent = () => {
  return (
    <StyledCarousel
      className="Carousel"
      animation="slide"
      autoPlay={false}
      swipe={true}
      navButtonsAlwaysVisible={true}
      indicators={true}
      navButtonsProps={{
        style: { backgroundColor: '#f5f5f5', color: '#000' }
      }}
    >
      {items.map((item, index) => (
        <CarouselItem key={index} item={item} />
      ))}
    </StyledCarousel>
  );
};

export default CarouselComponent;
