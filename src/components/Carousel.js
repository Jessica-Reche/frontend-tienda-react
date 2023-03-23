import * as React from 'react';
import { styled } from '@mui/material/styles';
import Carousel from 'react-material-ui-carousel';
import { Paper,Grid, Button, Typography, Input } from '@mui/material';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const items = [
  {
    name: "Tenemos tartas de todos los sabores, cupcakes, cookies",
    description: "¡No te quedes sin tu postre favorito!",
    image: "https://i.ibb.co/4ZQ4bkQ/cupcakes-san-valentin.jpg"
  },
  {
    name: "Tartas de cumpleaños, tartas de boda, tartas de comunión",
    description: "Añade un toque especial a tu evento, ¡pide tu tarta personalizada!",
    image: "https://i.ibb.co/4ZQ4bkQ/cupcakes-san-valentin.jpg"
  }
];

const StyledCarousel = styled(Carousel)(({ theme }) => ({
  marginTop: theme.spacing(18),
  marginBottom: theme.spacing(2),
  '& .CarouselItem': {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black', // fondo negro semitransparente
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(2),
    minHeight: '400px',
    position: 'relative', // posición relativa para los elementos de texto y botón
  },
  '& .CarouselItem img': {
    objectFit: 'cover',
    width: '100%', // ancho de la imagen reducido
    height: '30rem', // altura ajustada automáticamente
  },
  '& .CarouselItem h2': {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
    position: 'absolute', // posición absoluta para el título
    top: '40%', // centrado verticalmente
    left: '50%', // centrado horizontalmente
    transform: 'translate(-50%, -50%)', // centrado exacto
    color: 'black'
  },
  '& .CarouselItemP': {
    fontSize: '18px',
    marginBottom: theme.spacing(2),
    position: 'absolute', // posición absoluta para la descripción
    top: '60%', // debajo del título
    left: '50%', // centrado horizontalmente
    transform: 'translate(-50%, -50%)', // centrado exacto

  },
  '& .buttonVerMas': {
    position: 'absolute', // posición absoluta para el botón
    top: '70%', // debajo de la descripción
    left: '50%', // centrado horizontalmente
    transform: 'translate(-50%, -50%)', // centrado exacto
  },

}));

const CarouselItem = ({ item }) => {
  const { register, login, isLogged } = useAuth();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogged) navigate('/')
  }, [isLogged, navigate])

  const handleSignUp = async (event) => {
    const actionStatusTrue = (email, password) => {
      login(email, password);
      //navigate('/products'); TODO:Descomentar cuando esté habilitada la ruta de productos
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
      result.status === true
        ? actionStatusTrue(email, password)
        : setMessage(result.message);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <Paper className="CarouselItem">
      <img src={item.image} alt={item.name} />
      <h2>{item.name}</h2>
      <p className='CarouselItemP'>{item.description}</p>
      <Button className="buttonVerMas" variant="contained">Ver más</Button>
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
              <Input name="password" type="text" placeholder="contraseña" sx={{ backgroundColor: '#f5f5f5' }} />
            </Grid>
            <Grid item xs={6} sm={3}>
              <Button variant='contained' color='secondary' type="submit">Registrarse</Button>
            </Grid>
          </Grid>

          <Typography sx={{ textTransform: "none" }} className='errorMessage' color="error" variant="body2">
            {message}
          </Typography>
        </form>

      </div>
    </Paper>
  );
};

const CarouselComponent = () => {
  return (
    <StyledCarousel
      animation="slide"
      autoPlay={false}
      swipe={true}
      navButtonsAlwaysVisible={true}
      indicators={true}
    >
      {items.map((item, index) => (
        <CarouselItem key={index} item={item} />
      ))}
    </StyledCarousel>
  );
};

export default CarouselComponent;
