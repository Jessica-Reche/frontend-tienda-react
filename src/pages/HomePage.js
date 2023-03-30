import React from "react";
import styled from "@emotion/styled";
import { Container, Grid, Paper } from "@mui/material";
import { useProducts } from '../context/productsContext';


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
  margin-bottom: 30px;
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

const ProductCard = styled(Paper)`
  padding: 30px;
  max-width: 350px;
  margin: 0 auto;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
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

// const HeroImage = styled.img`
//   width: 100%;
//   max-width: 10rem;
//   height: auto;
// `;
const PromoSection = styled.section`
  display: flex
  y justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 2rem;
`;
const PromoTitle = styled.h2 `font-size: 2rem; margin-bottom: 1rem; text-align: center`;

const Section = ({ title, subtitle, children }) => {

    return (
        <SectionContainer>
            <SectionTitle>{title}</SectionTitle>
            {subtitle && <SectionSubtitle>{subtitle}</SectionSubtitle>}
            <Grid container spacing={4}>
                {children}
            </Grid>
        </SectionContainer>
    );
};

const Home = () => {
    const { products } = useProducts(); 
    const baseImageUrl = 'https://mundo-tarta-server.up.railway.app';

    const productList = products.map((product) => {
        return {
            ...product,
            poster: `${baseImageUrl}${product.poster.link}`,
        };
    });
   


    return (
        <>
            <HeroSection>
                <HeroTitle>Bienvenido a Natural Cherry!</HeroTitle>
                {/* <HeroImage src={logo} alt="Cake" /> */}
            </HeroSection>

            <Section title="Tartas">
                {productList
                    .filter((product) => product.category === "tartas")
                    .map((product) => (
                        <Grid item key={product.id} xs sm={6}
                            md={4}
                        >
                            <ProductCard>
                                <ProductImage src={product.poster} alt={product.name} />
                                <ProductName>{product.name}</ProductName>
                                <ProductDescription>{product.description}</ProductDescription>
                            </ProductCard>
                        </Grid>
                    ))}
            </Section>
            <Section title="Cupcakes">
                {productList
                    .filter((product) => product.category === "cupcakes")
                    .map((product) => (
                        <Grid item key={product.id} xs={6} sm={6} md={4}>
                            <ProductCard>
                                <ProductImage src={product.poster} alt={product.name} />
                                <ProductName>{product.name}</ProductName>
                                <ProductDescription>{product.description}</ProductDescription>
                            </ProductCard>
                        </Grid>
                    ))}
            </Section>
            <Section title="Donnuts">
                {productList
                    .filter((product) => product.category === "donnuts")
                    .map((product) => (
                        <Grid item key={product.id} xs={6} sm={6} md={4}>
                            <ProductCard>
                                <ProductImage src={product.poster} alt={product.name} />
                                <ProductName>{product.name}</ProductName>
                                <ProductDescription>{product.description}</ProductDescription>
                            </ProductCard>
                        </Grid>
                    ))}
            </Section>
            <Section title="Cookies">
                {productList
                    .filter((product) => product.category === "cookies")
                    .map((product) => (
                        <Grid item key={product.id} xs={6} sm={6} md={4}>
                            <ProductCard>
                                <ProductImage src={product.poster} alt={product.name} />
                                <ProductName>{product.name}</ProductName>
                                <ProductDescription>{product.description}</ProductDescription>
                            </ProductCard>
                        </Grid>
                    ))}
            </Section>
            <PromoSection>
                <PromoTitle>¡Obtén un 10% de descuento en tu primer pedido!</PromoTitle>
               
            </PromoSection>
            <Section title="Cajas Dulces" subtitle="Una selección de nuestras deliciosas creaciones dulces.">
                {productList
                    .filter((product) => product.category === "cajasdulces")
                    .map((product) => (
                        <Grid item key={product.id} xs={6} sm={6} md={4}>
                            <ProductCard>
                                <ProductImage src={product.poster} alt={product.name} />
                                <ProductName>{product.name}</ProductName>
                                <ProductDescription>{product.description}</ProductDescription>
                            </ProductCard>
                        </Grid>
                    ))}
            </Section>
        </>
    );
};

export default Home;


