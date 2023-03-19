import { createContext, useState, useEffect, useContext } from 'react';
import {  getProducts, updatePoster, updateProduct } from '../database/products';

import { deleteProduct ,addProduct } from '../database/products'
import useAuth from '../hooks/useAuth';



export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const {token} = useAuth();
  const [products, setProducts] = useState([]);



  const handleDeleteProduct = async (id) => {
    await deleteProduct(id, token);
    const updatedProducts = await getProducts();
    setProducts(updatedProducts);
  };

  const handleCreateProduct = async (productData) => {
   let result = await addProduct(productData, token);
    const updatedProducts = await getProducts();
    setProducts(updatedProducts);
    return result;
  };

  const handleUpdateProduct = async (id, productData) => {
    const result = await updateProduct(id, productData, token);
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

  useEffect(() => {
    async function fetchProducts() {
      const data = await getProducts();
      setProducts(data);
    }

    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, handleDeleteProduct, handleCreateProduct,handleUpdateProduct, handleUpdatePoster}}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts =() => useContext(ProductContext);
