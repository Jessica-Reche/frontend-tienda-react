/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import styled from "@emotion/styled";
import Carousel from "react-material-ui-carousel";
import {  useParams } from "react-router-dom";
import useProducts from "../hooks/useProducts";
import config from "../config";
import { useStateValue } from "../context/StateProvider";
import { actionTypes } from "../reducer";
import { Modal } from "@mui/material";
const urlBase = config.API_URL;
const Image = styled("img")({
  width: "100%",
  height: "auto",
});

const ProductPage = () => {
  const { id } = useParams();
  const { products, isLoginLoading } = useProducts();
  const product = products.find((product) => product._id === id);
  const gallery = product?.gallery;
  const [quantity, setQuantity] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [loaded, setLoaded] = useState(false);
  const handleImageLoad = () => {
    setLoaded(true);
  };

  // eslint-disable-next-line no-unused-vars
  const [{ basket }, dispatch] = useStateValue();
  //si  hay imagenes en el array gallery, entonces mapea el array y devuelve un nuevo array con las imagenes
  const galleryImages = gallery && gallery.length ? gallery.map((img) => `${urlBase}${img.link}`) : [];



  const handleAddToCart = () => {

    for (let i = 0; i < quantity; i++) {
      dispatch({
        type: actionTypes.ADD_TO_BASKET,
        item: { ...product },
      });
    }

  };

  const CarouselComponent = ({ galleryImages }) => {
    const chunk = (arr, size) =>
      arr.reduce(
        (acc, _, i) => (i % size ? acc : [...acc, arr.slice(i, i + size)]),
        []
      );
    const imageGroups = chunk(galleryImages, 3);
    return (
    
     
     <Carousel
   
        autoPlay={false}
        swipe={true}
        navButtonsAlwaysVisible={true}
        indicators={true}
      
        slidesPerPage={3}>
        {imageGroups.map((imageGroup, index) => (
          <div key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
            {imageGroup.map((image, index) => (
              <div key={index} onClick={() => { setSelectedImage(image); setOpenModal(true) }} style={{ width: 'calc(100% / 3)', paddingRight: '10px', display: loaded ? "block" : "none"  }}>
                <Image   onLoad={handleImageLoad} src={image} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            ))}
          </div>
        ))}
      </Carousel>
      
    );
  };

  

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4, marginTop: '10rem' }}>
      
        {
          isLoginLoading ? (<Typography variant="h4">Loading...</Typography>)
            : (
              <>
                <Typography variant="h4" component="h1" gutterBottom>
                  {product?.name}
                </Typography>
                <div style={{ height: "100%" }}>
                  <CarouselComponent galleryImages={galleryImages} />
                </div>

                <Modal sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  outline: 'none',
                  '& img': {
                    maxWidth: '100%',
                    maxHeight: '100%',
                  },
                }}
                  open={openModal} onClose={() => setOpenModal(false)}>
                  <div>
                    <Image src={selectedImage} />
                    <button onClick={() => setOpenModal(false)}></button>
                  </div>
                </Modal>
                <Typography variant="h6" component="h2" gutterBottom>
                  Price: {product?.price}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {product?.description}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", my: 4 }}>
                  <Typography variant="h6" component="span" sx={{ mr: 2 }}>
                    Quantity:
                  </Typography>
                  <Button variant="outlined" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</Button>
                  <Typography variant="h6" component="span" sx={{ mx: 2 }}>
                    {quantity}
                  </Typography>
                  <Button  variant="outlined" onClick={() => setQuantity(quantity + 1)}>+</Button>
                  
                </Box>
                <>

                  <Button variant="contained" onClick={handleAddToCart}>Añadir al carrito</Button>
                </>

                
              </>
            )
        }
      </Box>
    </Container>
  );
};
export default ProductPage;