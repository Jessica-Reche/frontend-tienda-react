import * as React from "react";
import { styled } from "@mui/material/styles";
import { useProducts } from "../../../context/productsContext";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Container,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";



const FormBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "2rem",
  border: "1px solid #ccc",
  borderRadius: "4px",
});

const CreateProductForm = () => {
  const { handleCreateProduct } = useProducts();
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [poster, setPoster] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [discount, setDiscount] = React.useState("");
  const [stock, setStock] = React.useState("");
  const [rating, setRating] = React.useState("");
  const [category, setCategory] = React.useState("tartas");
  const [error, setError] = React.useState("");
  const [sku, setSku] = React.useState("");
  const navigate = useNavigate();

  const handlePosterFileChange = (event) => {
    const [file] = event.target.files;
    setPoster(file);

  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    //formData
    const productData = new FormData();
    productData.append("name", name);
    productData.append("description", description);
    productData.append("poster", poster);
    productData.append("price", price);
    productData.append("discount", discount);
    productData.append("stock", stock);
    productData.append("rating", rating);
    productData.append("sku", sku);
    productData.append("category", category);

    console.log(productData);
 //si algún campo está vacío, no se envía el formulario
    if (!name || !description || !poster || !price || !stock || !rating || !sku || !category) {
      setError("Rellena los campos obligatorios");
      return;
    }
 
    
    const result = await handleCreateProduct(productData);
    console.log("reeees:"+result);
    result.status === true? navigate("/admin/products"): setError(result.message);
  };


  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Crear Producto
      </Typography>

      <form>
        <FormBox>
          <Select
            required
            fullWidth
            label="Categoría"
            name="category"
            onChange={(event) => setCategory(event.target.value)}
            value={category}
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
            required
            fullWidth
            label="Nombre"
            name="name"
            onChange={(event) => setName(event.target.value)}
            value={name}
            variant="outlined"
            margin="normal"
          />
          <TextField
            required
            fullWidth
            label="Descripción"
            name="description"
            onChange={(event) => setDescription(event.target.value)}
            value={description}
            variant="outlined"
            margin="normal"
          />
          <TextField
            required
            fullWidth
            label="Imagen principal"
            name="poster"
            // onChange={handlePosterChange}
            variant="outlined"
            margin="normal"
            type="file"

            onChange={handlePosterFileChange}
          />

          <TextField
            required
            fullWidth
            label="Precio"
            name="price"
            onChange={(event) => setPrice(event.target.value)}
            value={price}
            variant="outlined"
            margin="normal"
            type="number"
          />
          <TextField
            fullWidth
            label="Descuento"
            name="discount"
            onChange={(event) => setDiscount(parseFloat(event.target.value))}
            value={discount}
            variant="outlined"
            margin="normal"
            type="number"
          />

          <TextField
          required
            fullWidth
            label="Stock"
            name="stock"
            onChange={(event) => setStock(event.target.value)}
            value={stock}
            variant="outlined"
            margin="normal"
            type="number"
          />
          <TextField
            required
            fullWidth
            label="SKU"
            name="sku"
            onChange={(event) => setSku(event.target.value)}
            value={sku}
            variant="outlined"
            margin="normal"
          />
          <TextField
            required
            fullWidth
            label="Rating"
            name="rating"
            onChange={(event) => setRating(event.target.value)}
            value={rating}
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
            Crear Producto
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

export default CreateProductForm;
