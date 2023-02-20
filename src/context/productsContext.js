import { createContext, useState, useEffect, useContext } from 'react';
import {  getProducts, updatePoster, updateProduct } from '../database/products';
import { useAuth } from './authContext';
import { deleteProduct ,addProduct } from '../database/products'

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const { token } = useAuth();

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

  const handleUpdateProduct = async (productId, productData,fileData) => {
    const result = await updateProduct(productId, productData, token);
   console.log(fileData);
    const posterResult = await updatePoster(productId, fileData, token);
    const updatedProducts = await getProducts();
    setProducts(updatedProducts);
    return [result, posterResult];
  };
  


  useEffect(() => {
    async function fetchProducts() {
      const data = await getProducts();
      setProducts(data);
    }

    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, handleDeleteProduct, handleCreateProduct,handleUpdateProduct}}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts =() => useContext(ProductContext);
