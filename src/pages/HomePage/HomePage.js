import React, { useEffect, useState } from "react";
import { Alert, Grid, Snackbar } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import Carousel from 'react-material-ui-carousel';
import { useMediaQuery } from '@mui/material';
import {
  SectionContainer,
  SectionTitle,
  SectionSubtitle,
  ProductImage,
  ProductName,
  ProductDescription,
  ProductButton,
  ProductCard,
  HeroSection,
  HeroTitle,
  PromoSection,
  CarouselContainer,
  PromoTitle,
} from "./homePageStyles";
import useProducts from "../../hooks/useProducts";
import config from "../../config";
const urlBase = config.API_URL;


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
    xs: useMediaQuery("(max-width:600px)"),
    sm: useMediaQuery("(max-width:960px)"),
  }
  const chunk = (arr, size) =>
    arr.reduce(
      (acc, _, i) => (i % size ? acc : [...acc, arr.slice(i, i + size)]),
      []
    );
  const productGroups = chunk(products, isMobile.xs ? 1 : 3);
  return (
    <CarouselContainer data-cy="category-test-categories" style={{ marginLeft: '2rem' }}>
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
        <ProductList products={filteredProducts} urlBase={urlBase} />
      </Section>
      <PromoSection>
        <PromoTitle>¡Obtén un 10% de descuento en tu primer pedido!</PromoTitle>
      </PromoSection>
    </>
  );
};
export default Home;


