import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Product from '../components/Products/Product';
import { useProducts } from '../hooks/useProducts';
import { MenuItem, Pagination, Select } from '@mui/material';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';


export default function ProductPage() {
  const { state } = useLocation();
  const { products, handleDeleteProduct } = useProducts();
  const productList = products.map((product) => {
    return {
      ...product,
      handleDelete: () => { handleDeleteProduct(product._id) }
    };
  });

  const [category, setCategory] = useState('all');
  const handleChange = (event) => { setCategory(event.target.value); };

  useEffect(() => {
    if (state) {
      setCategory(state.category);
    }

  }, [state]);
  const filteredProducts = productList?.filter((product) => {
    if (category === 'all') {
      return product;
    } else {
      return product.category === category;
    }
  });

  //paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredProducts.slice(startIndex, endIndex);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };
  //fin paginación

  return (
    <>
      <Box sx={{ flexGrow: 1, padding: '4rem', marginTop: '12rem' }}>
        <Select sx={{ width: 200 }} value={category} onChange={handleChange || category}>
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="tartas">Tartas</MenuItem>
          <MenuItem value="cupcakes">Cupcakes</MenuItem>
          <MenuItem value="cookies">Cookies</MenuItem>
          <MenuItem value="donnuts">Donuts</MenuItem>
          <MenuItem value="eventos">Eventos</MenuItem>
        </Select>
        <br />
        <br />
        <Grid container spacing={1}>
          {currentItems?.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
              <Product key={product._id} product={product} handleDelete={product.handleDelete} />
            </Grid>
          ))}
        </Grid>
        <Box sx={{ display:'flex',justifyContent:'center'}}>
          <Pagination variant="outlined" color="secondary" size='large'
            sx={{ '& button': { fontSize: 24, marginTop: '3rem' } }}
            count={pageCount} page={currentPage} onChange={handleChangePage} />
        </Box>
      </Box>
    </>
  );
}
