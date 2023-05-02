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
import config from "../../../config";

const FormBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "2rem",
  border: "1px solid #ccc",
  borderRadius: "4px",
});
const urlBase = config.API_URL;

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
    poster: "",
  });

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { id } = useParams();
  const { products, handleUpdateProduct, handleUpdatePoster, handleUpdateGallery } = useProducts()
  const [isPoster, setIsposter] = useState(false);
  const [isGallery, setIsGallery] = useState(false);
  const [allUpdatesSuccessful, setAllUpdatesSuccessful] = useState(true);
  const [galleryData, setGalleryData] = useState(new FormData());
  const [posterData, setPosterData] = useState(new FormData());
  const [productData, setproductData] = useState(new FormData());

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

  const handleGallery = (event) => {
    const files = event.target.files;
    for (const file of files) {
      galleryData.append("gallery[]", file);
    }
    const formDataObject = Object.fromEntries(galleryData.entries());
    console.log(formDataObject);
    setGalleryData(galleryData);
    setIsGallery(true);

  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, description, poster, price, stock, sku, rating, discount, category } = product;
    productData.append("name", name);
    productData.append("description", description);
    productData.append("price", price);
    productData.append("stock", stock);
    productData.append("sku", sku);
    productData.append("rating", rating);
    productData.append("discount", discount);
    productData.append("category", category);
    setproductData(productData);

    const resProduct = await handleUpdateProduct(id, productData);
    setAllUpdatesSuccessful(true);
    if (resProduct.status === false) {
      setAllUpdatesSuccessful(false);
    }

    if (isPoster) {
      posterData.append("poster", poster);
      setPosterData(posterData);
      const resPoster = await handleUpdatePoster(id, posterData);
      if (resPoster.status === false) {
        setAllUpdatesSuccessful(false);
        setError(prevError => prevError + ',' + resPoster.message);
      };
    };
    if (isGallery) {
      const formDataObject = Object.fromEntries(galleryData.entries());
      console.log(formDataObject);
      const resGallery = await handleUpdateGallery(id, galleryData);
      if (resGallery.status === false) {
        setAllUpdatesSuccessful(false);
        setError(prevError => prevError + ',' + resGallery.message);
      };
    };

    if (allUpdatesSuccessful) {
      navigate("/admin/products", { state: { message: resProduct.message } });
    } else {
      setError(prevError => prevError + ',' + resProduct.message);
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
            value={product?.category}
            variant="outlined"
            margin="normal"
          >

            <MenuItem value="tartas">Tartas</MenuItem>
            <MenuItem value="cupcakes">Cupcakes</MenuItem>
            <MenuItem value="donnuts">Donnuts</MenuItem>
            <MenuItem value="cookies">Cookies</MenuItem>
            <MenuItem value="eventos">Eventos</MenuItem>
          </Select>
          <TextField
            fullWidth
            label="Nombre"
            name="name"
            onChange={handleInputChange}
            value={product?.name}
            variant="outlined"
            margin="normal"
          />
          <TextField
            required
            fullWidth
            label="Descripción"
            name="description"
            onChange={handleInputChange}
            value={product?.description}
            variant="outlined"
            margin="normal"
            multiline
            rows={4}
          />

          <TextField
            fullWidth
            label="Precio"
            name="price"
            onChange={handleInputChange}
            value={product?.price}
            variant="outlined"
            margin="normal"
            type="number"
          />
          <TextField
            fullWidth
            label="Descuento"
            name="discount"
            onChange={handleInputChange}
            value={product?.discount}
            variant="outlined"
            margin="normal"
            type="number"
          />

          <TextField
            fullWidth
            label="Stock"
            name="stock"
            onChange={handleInputChange}
            value={product?.stock}
            variant="outlined"
            margin="normal"
            type="number"
          />
          <TextField
            fullWidth
            label="SKU"
            name="sku"
            onChange={handleInputChange}
            value={product?.sku}
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Rating"
            name="rating"
            onChange={handleInputChange}
            value={product?.rating}
            variant="outlined"
            margin="normal"
            type="number"
          />
          <Box mt={2} >
            <Typography variant="subtitle1">Poster</Typography>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <Box mr={2} style={{ display: 'flex', justifyContent: 'center' }}>
              {product?.poster && (
                <img
                  src={`${urlBase}${product?.poster.link}`}
                  alt="poster"
                  style={{ maxWidth: "100px", maxHeight: "100px", margin: "0.5rem", objectFit: "cover" }}
                />
              )}
            </Box>
          </Box>
           <Typography variant="subtitle1">Añade hasta 5 imágenes a la galería</Typography>
           <input type="file" name="gallery[]" accept="image/*" enctype="multipart/form-data" multiple onChange={handleGallery} />
            <Box mt={2} style={{ display: 'flex', justifyContent: 'center',  }}>
              {product?.gallery &&
                product?.gallery.map((image, index) => (
               <div key={index}>
                    <img
                      key={index}
                      src={`${urlBase}${image.link}`}
                      alt={`Imagen ${index}`}
                      style={{ maxWidth: "100px", maxHeight: "100px", margin: "0.5rem", objectFit: "cover" }}
                    />
                  </div>
                       
                ))}
            </Box>
          <Box mt={2}>
            <Button type="submit" variant="contained">
              Actualizar
            </Button>
          </Box>
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
