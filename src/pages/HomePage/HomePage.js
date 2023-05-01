import React, { useEffect, useState } from "react";
import { Alert, Snackbar } from "@mui/material";
import { useLocation } from "react-router-dom";
import Grid from "@mui/material/Grid";

import {
  PromoTitle,
  PromoSection,
  HeroSection,
  HeroTitle,
  FormContainer,
  StyledTextField,
  StyledButton,
  Section,
  SectionNewsletter,



} from "./homePageStyles";

import useProducts from "../../hooks/useProducts";
import config from "../../config";
import CategoriList from "../../components/HomeComponent/CategoryCarousel";
const urlBase = config.API_URL;

const Home = () => {
  const { state } = useLocation();
  const [message, setMessage] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const { products } = useProducts();
  const filteredProducts = products.filter((product, index, self) => {
    return index === self.findIndex((t) => (t.category === product.category));
  });

  useEffect(() => {
    console.log(state);
    if (state && state.message) {
      setShowNotification(true);
      setMessage(state.message);
    }

  }, [state]);

  const NewsletterForm = () => {
    return (
      <FormContainer >
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <StyledTextField label="Name" variant="outlined" required />
          </Grid>
          <Grid item xs={12} md={6}>
            <StyledTextField label="Email" variant="outlined" required />
          </Grid>
          <Grid item xs={12}>
            <StyledButton variant="contained" type="submit">
              Subscribe
            </StyledButton>
          </Grid>
        </Grid>
      </FormContainer>
    );
  };



  return (
    <>
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

      <HeroSection>
        <HeroTitle>Bienvenido a Natural Cherry!</HeroTitle>
        {/* <HeroImage src={logo} alt="Cake" /> */}
      </HeroSection>
      <Section title="Categorías" subtitle="Encuentra lo que buscas">
        <CategoriList products={filteredProducts} urlBase={urlBase} />
      </Section>
      <PromoSection>
        <PromoTitle>¡Obtén un 10% de descuento en tu primer pedido!</PromoTitle>
      </PromoSection>
      <SectionNewsletter title="Newsletter" subtitle="Suscríbete a nuestro newsletter para recibir las últimas noticias y ofertas">
        <NewsletterForm />
      </SectionNewsletter>
    </>
  );
};
export default Home;


