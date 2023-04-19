import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Alert, Container, Grid, Paper, Snackbar } from "@mui/material";
import { useProducts } from '../context/productsContext';
import { Link, useLocation } from "react-router-dom";
import Carousel from 'react-material-ui-carousel';
import { useMediaQuery } from '@mui/material';


const SectionContainer = styled(Container)`
  padding: 80px 0;
  background-color:  #e8e9ef;
  
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: 60px;
  color: #2f4858;
  font-size: 3rem;
`;

const SectionSubtitle = styled.h3`
  text-align: center;
  margin-bottom: 45px;
  color: #8f8f8f;
  font-size: 2rem;
`;

const ProductImage = styled.img`
  border-radius: 50%;
  height: 180px;
  width: 180px;
  margin: 0 auto 20px;
  display: block;
`;

const ProductName = styled.h4`
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #2f4858;
`;

const ProductDescription = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #8f8f8f;
`;
const ProductButton = styled.button`
    display: block;
    margin: 0 auto;
    background: #2f4858;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 1.2rem;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background: #1a2a35;
    }
`;


const ProductCard = styled(Paper)`
  padding: 30px;
  max-width: 350px;
  margin: 0 auto;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
  }

  .MuiPaper-root {
    aspectRatio: 4/3;
  }
`;

const HeroSection = styled.section`
  text-align: center;
  background: #f5f5f5;
  padding: 2rem;

`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 2rem;
`;

const PromoSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 2rem;
`;

const CarouselContainer = styled.div`
    width: 100%;
    margin: 0 auto;
    max-width: 1200px;
`;



const PromoTitle = styled.h2`font-size: 2rem; margin-bottom: 1rem; text-align: center`;

const Section = ({ title, subtitle, children }) => {

    return (


        <SectionContainer data-cy='category-test-section' >
            <SectionTitle>{title}</SectionTitle>
            {subtitle && <SectionSubtitle>{subtitle}</SectionSubtitle>}
            <Grid container spacing={4}>
                {children}
            </Grid>
        </SectionContainer>



    );
};

const ProductList = ({ products, urlBase }) => {

    const isMobile = {
       xs:useMediaQuery("(max-width:600px)"),
       sm: useMediaQuery("(max-width:960px)"),

    }
    const chunk = (arr, size) =>
    arr.reduce(
      (acc, _, i) => (i % size ? acc : [...acc, arr.slice(i, i + size)]),
      []
    );
  const productGroups = chunk(products, isMobile.xs ? 1 : 3);

  return (
    <CarouselContainer  data-cy="category-test-categories" style={{marginLeft:'2rem'}}>
      <Carousel
        animation="slide"
        autoPlay={false}
        swipe={true}
        navButtonsAlwaysVisible={true}
        indicators={true}
        slidesPerPage={3}
      >
        {productGroups.map((group, index) => (
          <Grid container spacing={2} key={index}>
            {group.map((product) => (
              <Grid item key={product.id} xs={12} sm={4}>
                <ProductCard>
                  <ProductImage
                    src={`${urlBase}/${product.poster.link}`}
                    alt={product.name}
                  />
                  <ProductName>{product.category}</ProductName>
                  <ProductDescription>
                    Extensa selección de {product.category}
                  </ProductDescription>
                  <Link
                    to="/products"
                    state={{ category: product.category }}
                  >
                    <ProductButton>Ver más</ProductButton>
                  </Link>
                </ProductCard>
              </Grid>
            ))}
          </Grid>
        ))}
      </Carousel>
    </CarouselContainer>
  );
  
};

const Home = () => {

  
    const { state } = useLocation();
    const [mensaje, setMensaje] = useState('');
    const [showNotification, setShowNotification] = useState(false);
    const { products } = useProducts();
    const baseImageUrl = 'https://mundo-tarta-server.up.railway.app';
    // Filtrar el primer producto  de cada categoría
    const filteredProducts = products.filter((product, index, self) => {
        return index === self.findIndex((t) => (t.category === product.category));
    });



    useEffect(() => {
        if (state && state.message) {
            setShowNotification(true);
            setMensaje(state.message);
        }

    }, [state]);

    return (
        <>
            <Snackbar
                open={showNotification}
                autoHideDuration={6000}
                onClose={() => setShowNotification(false)}
            >
                <Alert
                    onClose={() => setShowNotification(false)}
                    severity="success"
                    sx={{ width: "100%" }}
                >
                    {mensaje}
                </Alert>
            </Snackbar>

            <HeroSection>
                <HeroTitle>Bienvenido a Natural Cherry!</HeroTitle>
                {/* <HeroImage src={logo} alt="Cake" /> */}
            </HeroSection>
            <Section title="Categorías" subtitle="Encuentra lo que buscas">
                <ProductList products={filteredProducts} urlBase={baseImageUrl} />
            </Section>
            <PromoSection>
                <PromoTitle>¡Obtén un 10% de descuento en tu primer pedido!</PromoTitle>

            </PromoSection>
        </>
    );
};

export default Home;


