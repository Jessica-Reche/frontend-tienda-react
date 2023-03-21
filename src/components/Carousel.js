import * as React from 'react';
import { styled } from '@mui/material/styles';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@mui/material';

const items = [
  {
    name: "Tarta de chocolate",
    description: "Deliciosa tarta de chocolate con fresas",
    image: "https://i.ibb.co/4ZQ4bkQ/cupcakes-san-valentin.jpg"
  },
  {
    name: "Panqueques con frutas",
    description: "Deliciosos panqueques con frutas y miel",
    image: "https://i.ibb.co/4ZQ4bkQ/cupcakes-san-valentin.jpg"
  }
];

const StyledCarousel = styled(Carousel)(({ theme }) => ({
  marginTop: theme.spacing(23),
  marginBottom: theme.spacing(2),
  '& .CarouselItem': {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // fondo negro semitransparente
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(2),
    minHeight: '400px',
    position: 'relative', // posición relativa para los elementos de texto y botón
  },
  '& .CarouselItem img': {
    objectFit: 'cover',
    width: '100%', // ancho de la imagen reducido
    height: '45rem', // altura ajustada automáticamente
  },
  '& .CarouselItem h2': {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
    position: 'absolute', // posición absoluta para el título
    top: '50%', // centrado verticalmente
    left: '50%', // centrado horizontalmente
    transform: 'translate(-50%, -50%)', // centrado exacto
    color:'black'
  },
  '& .CarouselItem p': {
    fontSize: '18px',
    marginBottom: theme.spacing(2),
    position: 'absolute', // posición absoluta para la descripción
    top: '70%', // debajo del título
    left: '50%', // centrado horizontalmente
    transform: 'translate(-50%, -50%)', // centrado exacto
    
  },
  '& .CarouselItem button': {
    position: 'absolute', // posición absoluta para el botón
    top: '80%', // debajo de la descripción
    left: '50%', // centrado horizontalmente
    transform: 'translate(-50%, -50%)', // centrado exacto
  }
}));

const CarouselItem = ({ item }) => {
  return (
    <Paper className="CarouselItem">
      <img src={item.image} alt={item.name} />
      <h2>{item.name}</h2>
      <p>{item.description}</p>
      <Button variant="contained">Ver más</Button>
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
