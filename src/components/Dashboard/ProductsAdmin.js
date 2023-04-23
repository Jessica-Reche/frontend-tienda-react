import * as React from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";

import Grid from "@mui/material/Grid";
import useProducts from "../../hooks/useProducts";

const BoxStyled = styled(Box)({
  ".root": {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "2rem",
  },
  tableContainer: {
    marginTop: "4rem",
    overflowX: "auto",
  },
  marginTop:"2rem"
});

export default function AdminProducts() {
  const { products, handleDeleteProduct,  isLoginLoading} = useProducts();
  const productList = products.map((product) => {
    return {
      ...product,
      handleDelete: () => {
        handleDeleteProduct(product._id);
      },
    };
  });

  return (
    <BoxStyled className="root">
      <h1>Administración de Productos</h1>
      <Button variant="contained" component={Link} to="/admin/products/new">
        Crear Nuevo Producto
      </Button>
      <br/>
      {isLoginLoading &&<strong> Loading products...</strong>}
      {!isLoginLoading && <TableContainer component={Paper} className="tableContainer">
        <Table aria-label="Productos">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Categoría</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productList.map((product) => (
              <TableRow key={product._id}>
                <TableCell component="th" scope="row">
                  {product._id}
                </TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>
                  <Grid container spacing={1} justifyContent="center">
                    <Grid item>
                      <Button
                        variant="contained"
                        size="small"
                        component={Link}
                        to={`/admin/products/edit/${product._id}`}
                      >
                        Editar
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={product.handleDelete}
                      >
                        Eliminar
                      </Button>
                    </Grid>
                  </Grid>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> }

      
    </BoxStyled>
  );
}
