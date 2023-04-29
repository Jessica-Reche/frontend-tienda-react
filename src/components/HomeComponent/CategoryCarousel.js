
import React from "react";
import { Grid } from "@mui/material";
import Carousel from 'react-material-ui-carousel';
import { useMediaQuery } from '@mui/material';
import { Link } from "react-router-dom";
import {
    ProductImage,
    ProductName,
    ProductDescription,
    ProductButton,
    ProductCard,
    CarouselContainer,
} from "../../pages/HomePage/homePageStyles";

const CategoriList = ({ products, urlBase }) => {
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

export default CategoriList;