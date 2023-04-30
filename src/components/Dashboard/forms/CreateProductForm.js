import * as React from "react";
import { styled } from "@mui/material/styles";

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
import useProducts from "../../../hooks/useProducts";
import { Snackbar, Alert } from '@mui/material';
//import { useDropzone } from 'react-dropzone'




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
  const [message, setMessage] = React.useState("");
  const [error, setError] = React.useState(false);
  const [sku, setSku] = React.useState("");
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = React.useState(false);
  const productData = new FormData();

  const handlePosterFileChange = (event) => {
    const [file] = event.target.files;
    setPoster(file);
  };

  const handleGallery = (event) => {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      productData.append("gallery[]", files[i]);
    }
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    //formData

    productData.append("name", name);
    productData.append("description", description);
    productData.append("poster", poster);

    productData.append("price", price);
    productData.append("discount", discount);
    productData.append("stock", stock);
    productData.append("rating", rating);
    productData.append("sku", sku);
    productData.append("category", category);
    const object = Object.fromEntries(productData.entries());

    console.log(object);


    //si algún campo está vacío, no se envía el formulario
    if (!name || !description || !poster || !price || !stock || !rating || !sku || !category ) {
      console.log('falleryyyyyyy')
      setMessage("Rellena los campos obligatorios");
      setError(true);
      setShowNotification(true);
      return;
    }


    const result = await handleCreateProduct(productData);
    if (result.status === true) {
      navigate("/admin/products", { state: { message: result.message } });
    } else {
      setShowNotification(true);
      setError(true);
      setMessage(result.message);
    }

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
            multiline
            rows={4}
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
            label="Valoración"
            name="rating"
            onChange={(event) => setRating(event.target.value)}
            value={rating}
            variant="outlined"
            margin="normal"
            type="number"
          />
          <Box mt={2}>
            <Typography variant="subtitle1">Imagen de Portada</Typography>
            <input type="file" accept="image/*" onChange={handlePosterFileChange} />
          </Box>
          <Box mt={2}>
            <Typography variant="subtitle1">Galería de Imágenes</Typography>
            <input type="file" name="gallery[]" accept="image/*"  enctype="multipart/form-data" multiple onChange={handleGallery} />
          </Box>
          <Box mt={2}>
            <Button type="submit" variant="contained" onClick={handleSubmit}>
              Crear
            </Button>
          </Box>
          {message && (
            <Typography variant="body1" color="error" align="center">
              {message}
            </Typography>
          )}
          {error && message && (
            <Snackbar
              key={message}
              open={showNotification}
              autoHideDuration={6000}
              onClose={() => setShowNotification(false)}
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
              <Alert
                onClose={() => setShowNotification(false)}
                severity="error"
                sx={{
                  width: "100%",
                  fontSize: "1.2rem",
                  padding: "1.5rem",
                  border: "2px solid black",
                }}
              >
                {message}
              </Alert>
            </Snackbar>
          )}

        </FormBox>
      </form>
    </Container>
  );





}

export default CreateProductForm;
