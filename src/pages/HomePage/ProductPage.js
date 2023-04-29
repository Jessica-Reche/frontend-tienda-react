import React from "react";
import { Box, Container, Typography } from "@mui/material";
import styled from "@emotion/styled";
import Carousel from "react-material-ui-carousel";
import { useParams } from "react-router-dom";
import useProducts from "../../hooks/useProducts";
import config from "../../config";
const urlBase = config.API_URL;

//TODO: ADD GALLEY IMAGES TO PRODUCT PAGE AND FUNCTIONS DATABASE.
const Image = styled("img")({
  width: "100%",
  height: "auto",
});


const ProductPage = () => {
    const { id } = useParams();
    const { products } = useProducts();
    const product = products.find((product) => product._id === id);
    const gallery = product?.gallery;
    console.log(gallery);
    const galleryImages = gallery && gallery.length ? gallery.map((img) => `${urlBase}${img.link}`) : [];


  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {product?.name}
        </Typography>
        <Carousel showThumbs={false}>
          {galleryImages?.map((image, index) => (
            <div key={index}>
              <Image src={image}  />
            </div>
          ))}
        </Carousel>
        <Typography variant="h6" component="h2" gutterBottom>
          Price: {product?.price}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {product?.description}
        </Typography>
      </Box>
    </Container>
  );
};

export default ProductPage;
