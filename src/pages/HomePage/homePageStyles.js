import styled from "@emotion/styled";
import { Container, Grid, Paper, TextField,Button } from "@mui/material";


const SectionContainer = styled(Container)`

  width: 100%;
  background-color:  #e8e9ef;

  
`;
const SectionContainerNewsletter = styled(Container)`
  padding: 80px 0;
  background-color: #e8e9ef;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
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
const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  background-color: #f0f0f0;
  border-radius: 1rem;
`;

const StyledTextField = styled(TextField)`
  width: 100%;
`;

const StyledButton = styled(Button)`
  background-color: #0077cc;
  color: white;
  &:hover {
    background-color: #0065a8;
  }
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

const SectionNewsletter = ({ title, subtitle, children }) => {
  return (
      <SectionContainerNewsletter data-cy='category-test-section' >
          <SectionTitle>{title}</SectionTitle>
          {subtitle && <SectionSubtitle>{subtitle}</SectionSubtitle>}
          <Grid container>
              {children}
          </Grid>
      </SectionContainerNewsletter>
  );
};




export {
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
    FormContainer,
    StyledTextField,
    StyledButton,
    Section,
    SectionNewsletter
}
