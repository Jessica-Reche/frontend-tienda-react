import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Product from '../components/Products/Product';
import { useProducts } from '../context/productsContext';

export default function Products() {

  const { products, handleDeleteProduct } = useProducts();

const productList =  products.map((product) => {
    return { 
        ...product,
        handleDelete: () =>{handleDeleteProduct(product._id)}  };
    });

  return (
  
      <Box sx={{ flexGrow: 1, padding: '4rem'}}>
        <Grid container spacing={1}>
          {productList.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
              <Product key={product._id} product={product} handleDelete={product.handleDelete} />
            </Grid>
          ))}
        </Grid>
      </Box>
  
  );
}
