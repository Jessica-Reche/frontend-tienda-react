import * as React from "react";
import { styled } from "@mui/material/styles";

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";


import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  MenuItem,
  Select,
} from "@mui/material";
import useProducts from "../../../hooks/useProducts";

const FormBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "2rem",
  border: "1px solid #ccc",
  borderRadius: "4px",
});


const UpdateProductForm = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    sku: "",
    rating: "",
    discount: "",
    category: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { id } = useParams();
  const { products, handleUpdateProduct, handleUpdatePoster } = useProducts()
  const [posterMsg, setPosterMsg] = useState("");
  const [isPoster, setIsposter] = useState(false);

  useEffect(() => {
    const product = products.find((product) => product._id === id);
    setProduct(product);
  }, [id, products]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };
  const handleImageChange = (event) => {
    const [file] = event.target.files;
    setProduct((prevProduct) => ({ ...prevProduct, poster: file }));
    setIsposter(true);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, description, poster, price, stock, sku, rating, discount, category } = product;
    const productData = new FormData();
    productData.append("name", name);
    productData.append("description", description);
    productData.append("price", price);
    productData.append("stock", stock);
    productData.append("sku", sku);
    productData.append("rating", rating);
    productData.append("discount", discount);
    productData.append("category", category);

    const resProduct = await handleUpdateProduct(id, productData);
    let allUpdatesSuccessful = true;

    if (resProduct.status === false) {
      allUpdatesSuccessful = false;
    }
    if (isPoster) {

      const posterData = new FormData();
      posterData.append("poster", poster);


      const resPoster = await handleUpdatePoster(id, posterData);
    
      if (resPoster.status === false) {
        allUpdatesSuccessful = false;
        setPosterMsg(resPoster.message);
      };

    };

    if (allUpdatesSuccessful) {
      navigate("/admin/products");
    } else {
      //concatenar los mensajes de error de los dos fetch
      const mensaje = resProduct.message + ',' + posterMsg;
      setError(mensaje);
    }
  };


  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Editar Producto
      </Typography>

      <form onSubmit={handleSubmit}>
        <FormBox>
        <Select
            fullWidth
            label="Categoría"
            name="category"
            onChange={handleInputChange}
            value={product.category }
            variant="outlined"
            margin="normal"
          >

        <MenuItem value="tartas">Tartas</MenuItem>
            <MenuItem value="cupcakes">Cupcakes</MenuItem>
            <MenuItem value="donnuts">Donnuts</MenuItem>
            <MenuItem value="cookies">Cookies</MenuItem>
            <MenuItem value="cajasdulces">Cajadulce</MenuItem>
          </Select>
 




          <TextField
            fullWidth
            label="Nombre"
            name="name"
            onChange={handleInputChange}
            value={product.name}
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Descripción"
            name="description"
            onChange={handleInputChange}
            value={product.description}
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Imagen principal"

            variant="outlined"
            margin="normal"
            type="file"
            accept="image/*"
            name="poster"

            onChange={handleImageChange}
          />

          <TextField
            fullWidth
            label="Precio"
            name="price"
            onChange={handleInputChange}
            value={product.price}
            variant="outlined"
            margin="normal"
            type="number"
          />
          <TextField
            fullWidth
            label="Descuento"
            name="discount"
            onChange={handleInputChange}
            value={product.discount}
            variant="outlined"
            margin="normal"
            type="number"
          />

          <TextField
            fullWidth
            label="Stock"
            name="stock"
            onChange={handleInputChange}
            value={product.stock}
            variant="outlined"
            margin="normal"
            type="number"
          />
          <TextField
            fullWidth
            label="SKU"
            name="sku"
            onChange={handleInputChange}
            value={product.sku}
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Rating"
            name="rating"
            onChange={handleInputChange}
            value={product.rating}
            variant="outlined"
            margin="normal"
            type="number"
          />
          <Button
            color="primary"
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            onClick={handleSubmit}
          >
            Editar Producto
          </Button>
          {error && (
            <Typography variant="body1" color="error" align="center">
              {error}
            </Typography>
          )}

        </FormBox>
      </form>
    </Container>
  );





}

export default UpdateProductForm;
