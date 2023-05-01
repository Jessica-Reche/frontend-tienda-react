

import { useState, useEffect } from "react";
import {getProducts, deleteProduct, addProduct, updateGallery, updatePoster, updateProduct } from "../database/products";
import useAuth from "./useAuth";



export const useProducts = () => {
  const {token} = useAuth();
  const [products, setProducts] = useState([]);
  const [state, setState] = useState({ loading: false, error: true });


  const handleDeleteProduct = async (id) => {
   let message= await deleteProduct(id, token);
    const updatedProducts = await getProducts();
    setProducts(updatedProducts);
    return message;
  };

  const handleCreateProduct = async (productData) => {
    setState({ loading: true, error: false });
    console.log( 'product',productData);
    let result = await addProduct(productData, token);
    console.log(result);
    setState({ loading: false, error: false });
    const updatedProducts = await getProducts();
    setProducts(updatedProducts);
    return result;
  };

  const handleUpdateProduct = async (id, productData) => {
    setState({ loading: true, error: false });
    const result = await updateProduct(id, productData, token);
    setState({ loading: false, error: false });
    const updatedProducts = await getProducts();
    setProducts(updatedProducts);
    return result;
  };
  const handleUpdatePoster = async (id, posterData) => {
    const result = await updatePoster(id, posterData, token);
    const updatedProducts = await getProducts();
    setProducts(updatedProducts);
    return result;
  };
  const handleUpdateGallery = async (id, galleryData) => {
    const result = await updateGallery(id, galleryData, token);
    const updatedProducts = await getProducts();
    setProducts(updatedProducts);
    return result;
  };

  useEffect(() => {
    async function fetchProducts() {
      setState({ loading: true, error: false });
      const data = await getProducts();
      setState({ loading: false, error: false });
      setProducts(data);
    }

    fetchProducts();
  }, []);

    return (
        { products, handleDeleteProduct, handleCreateProduct,handleUpdateProduct, handleUpdatePoster, handleUpdateGallery, isLoginLoading: state.loading}
    )
};

export default useProducts;






