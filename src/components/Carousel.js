import * as React from 'react';
import { styled } from '@mui/material/styles';
import Carousel from 'react-material-ui-carousel';
import { Paper,Grid, Button, Typography, Input } from '@mui/material';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const items = [
  {
    name: "Disfruta de nuestros postres orgánicos y respetuosos con el medio ambiente, además de ser deliciosos",
    description: "¡No te quedes sin tu postre favorito!",
    image: "https://i.ibb.co/sKKR2z9/befunky-collage-7.jpg"
    
  },
 {
    name: "Tartas de cumpleaños, tartas de boda, tartas de comunión, cuidamos cada detalle para que tu evento sea único, todo hecho a mano y con mucho amor",
    description: "Añade un toque especial a tu evento, ¡pide tu tarta personalizada!",

    image: "https://i.ibb.co/mCww6y3/tarta-abecedario-01b.jpg"

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
    padding: theme.spacing(1),
    minHeight: '500px',
    position: 'relative', // posición relativa para los elementos de texto y botón
  },
  '& .CarouselItem img': {
    objectFit: 'cover',
    width: '100%', // ancho de la imagen reducido
    height: '30rem',
    maxWidth: '100%', // máximo ancho de la imagen
  },
  
  '& .CarouselItem h2': {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
    position: 'absolute', // posición absoluta para el título
    top: '40%', // centrado verticalmente
    left: '50%', // centrado horizontalmente
    transform: 'translate(-50%, -50%)', // centrado exacto
    color: '#AEB6F1',
    '-webkit-text-stroke': '1px black', // agregar borde negro al texto
  },
  '& .CarouselItemP': {
    fontSize: '25px',
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
    position: 'absolute', // posición absoluta para la descripción
    top: '75%', // debajo del título
    left: '50%', // centrado horizontalmente
    transform: 'translate(-50%, -50%)', // centrado exacto
    '-webkit-text-stroke': '1px black', // agregar borde negro al texto

  },
  '& .buttonVerMas': {
    position: 'absolute', // posición absoluta para el botón
    top: '83%', // debajo de la descripción
    left: '50%', // centrado horizontalmente
    transform: 'translate(-50%, -50%)', // centrado exacto
  },
  '.buttoRegister':{

     backgroundColor: '#F1225F'
  }

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
              <Button className='buttoRegister' variant='contained' type="submit">Registrarse</Button>
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
