import * as React from "react";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import useProducts from "../../../hooks/useProducts";
import { BoxStyled } from "./productsAdminStyles";
import { useState } from "react";
import { Snackbar, Alert, Pagination, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ButtonGroup from "@mui/material/ButtonGroup";
import { IconButton } from "@mui/material";


export default function AdminProducts() {
  const { products, handleDeleteProduct, isLoginLoading } = useProducts();
  const [message, setMessage] = React.useState("");
  const [showNotification, setShowNotification] = useState(false);




  const productList = products.map((product) => {
    return {
      ...product,
      handleDelete: async () => {
        let response = await handleDeleteProduct(product._id);
        console.log(response);
        setMessage(response);
        setShowNotification(true);
      },
    };
  });
  //paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const pageCount = Math.ceil(productList.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = productList.slice(startIndex, endIndex);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };
  //fin paginación


  return (
    <BoxStyled className="root">
<h1>Administración de productos</h1>

<div style={{ display: 'flex', alignItems: 'center' }}>
  <IconButton
    aria-label="add"
    color="secondary"
    component={Link} to="/admin/products/new"
  >
    <AddBusinessIcon sx={{ fontSize: 50 }} /> 
  </IconButton>
  <span style={{ marginLeft: '10px' }}>Añadir producto nuevo</span>
</div>

<br />

   

      {isLoginLoading && <strong> Loading products...</strong>}
      {!isLoginLoading && (
        <>
          <TableContainer component={Paper} className="tableContainer">
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
                {currentItems.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell component="th" scope="row">
                      {product._id}
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.description}</TableCell>
                    <TableCell>
                      <ButtonGroup variant="text" aria-label="text button group">
                        <IconButton
                          aria-label="edit"
                          color="secondary"
                          component={Link}
                          to={`/admin/products/edit/${product._id}`}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          onClick={product.handleDelete}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {message && (
            <Snackbar
              key={message}
              open={showNotification}
              autoHideDuration={6000}
              onClose={() => setShowNotification(false)}
            >
              <Alert
                onClose={() => setShowNotification(false)}
                severity="success"
                sx={{ width: "100%" }}
              >
                {message}
              </Alert>
            </Snackbar>
          )}
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Pagination variant="outlined" color="secondary" size='large'
              sx={{ '& button': { fontSize: 24, marginTop: '3rem' } }}
              count={pageCount} page={currentPage} onChange={handleChangePage} />
          </Box>
        </>
      )}
    </BoxStyled>
  );
}



