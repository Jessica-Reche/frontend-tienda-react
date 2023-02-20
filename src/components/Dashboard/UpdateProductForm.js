import * as React from "react";
import { styled } from "@mui/material/styles";
import { useProducts } from "../../context/productsContext";
import { useNavigate, useParams} from "react-router-dom";
import { useEffect,useState } from "react";



import {
  Box,
  Button,
  Container,
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

const UpdateProductForm = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    poster: "",
    price: "",
    stock: "",
    sku: "",
    rating: "",
    discount: "",
  });
  const [error, setError] = useState("");
  const{ id } = useParams();
   const { products, handleUpdateProduct } = useProducts();
  const navigate = useNavigate();
  const productData = new FormData();
  const fileData = new FormData();

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
  };
  
  const  handleSubmit =async (event) => {
    event.preventDefault();
    const { name, description, poster, price, stock, sku, rating, discount } = product;
     console.log(poster);
    productData.append("name", name);
    productData.append("description", description);
    productData.append("poster", poster);
    productData.append("price", price);
    productData.append("stock", stock);
    productData.append("sku", sku);
    productData.append("rating", rating);
    productData.append("discount", discount);
    fileData.append("poster", poster);
    console.log(productData);
   const posterFile = productData.get("poster");
    console.log(posterFile);
    if (posterFile instanceof File) {
      productData.append("poster", posterFile);
    }else{
      console.log("no es un archivo");
    }




    const result = await handleUpdateProduct(id,productData,fileData);
    if (result[0].status === true) {
      navigate(-1);
    }else{
      setError(result.message);
    }

   



  };





  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Editar Producto
      </Typography>

      <form onSubmit={handleSubmit}>
        <FormBox>
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

export default UpdateProductForm;
