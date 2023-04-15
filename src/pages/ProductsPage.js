import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Product from '../components/Products/Product';
import { useProducts } from '../context/productsContext';
import { MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';


export default function Products() {
  const {state} = useLocation();

  const { products, handleDeleteProduct } = useProducts();

  const productList = products.map((product) => {
    return {
      ...product,
      handleDelete: () => { handleDeleteProduct(product._id) }
    };
  });

  const [category, setCategory] = useState('all');
  const handleChange = (event) => { setCategory(event.target.value); };

  const filteredProducts = productList.filter((product) => {
   const category = state?.category || 'all';

    if (category === 'all') {
      return product;
    } else {
      return product.category === category;
    }
  });


  return (
 
    <>
      <Box sx={{ flexGrow: 1, padding: '4rem', marginTop: '12rem' }}>
       
        <Select sx={{ width: 200 }} value={category} onChange={handleChange}>
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="tartas">Tartas</MenuItem>
          <MenuItem value="cupcakes">Cookies</MenuItem>
          <MenuItem value="donnuts">Donuts</MenuItem>
          <MenuItem value="cajasdulces">Cajas Dulces</MenuItem>
        </Select>
        <br />
        <br />
        <Grid container spacing={1}>
      
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
              <Product key={product._id} product={product} handleDelete={product.handleDelete} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
