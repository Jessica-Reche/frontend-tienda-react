import styled from "@emotion/styled";
import Carousel from "react-material-ui-carousel";

const StyledCarousel = styled(Carousel)(({ theme }) => ({
    //definir el spacing sin spacint lo hago de otra manera porque si no me da error
    marginTop: ' 9rem',
    marginBottom:'2rem',
    height: '100%',

    '& .CarouselItem': {
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black', // fondo negro semitransparente
        color:' white',
        padding: '0.2rem',
        minHeight: '00px',
        position: 'relative', // posición relativa para los elementos de texto y botón
    },
    '& .CarouselItem img': {
        objectFit: 'cover',
        width: '100%', // ancho de la imagen reducido
        height: '30rem',
        maxWidth: '100%', // máximo ancho de la imagen
    },

    '& .CarouselItem h2': {
        fontSize: '25px',
        fontWeight: 'bold',
        marginBottom: '2rem',
        position: 'absolute', // posición absoluta para el título
        top: '30%', // centrado verticalmente
        left: '50%', // centrado horizontalmente
        transform: 'translate(-50%, -50%)', // centrado exacto
        color: '#AEB6F1',
        '-webkit-text-stroke': '1px black', // agregar borde negro al texto
    },
    '& .CarouselItemP': {
        fontSize: '20px',
        fontWeight: 'bold',
        marginBottom: '2rem',
        position: 'absolute', // posición absoluta para la descripción
        top: '60%', // debajo del título
        left: '50%', // centrado horizontalmente
        transform: 'translate(-50%, -50%)', // centrado exacto
        '-webkit-text-stroke': '1px black', // agregar borde negro al texto

    },
    '& .buttonVerMas': {
        position: 'absolute', // posición absoluta para el botón
        top: '73%', // debajo de la descripción
        left: '50%', // centrado horizontalmente
        transform: 'translate(-50%, -50%)', // centrado exacto

    },
    ' .buttonRegister': {
        backgroundColor: '#F1225F'
    }

}));



export {
    StyledCarousel

}


