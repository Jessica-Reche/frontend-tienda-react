import { createContext, useState, useEffect, useContext } from 'react';
import {  getProducts } from '../database/products';
import { useAuth } from './authContext';
import { deleteProduct ,addProduct } from '../database/products'

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const { token } = useAuth();

  const handleDeleteProduct = async (id) => {
    console.log(id);
    console.log(token);
    await deleteProduct(id, token);
    const updatedProducts = await getProducts();

    setProducts(updatedProducts);
  };

  const handleCreateProduct = async (productData) => {
   let result = await addProduct(productData, token);
    const updatedProducts = await getProducts();
    setProducts(updatedProducts);
    console.log(result);
    return result;
  };

  // const handleUpdateProduct = async (productId, productData) => {
  //   await updateProduct(productId, productData);
  //   const updatedProducts = await getProducts();
  //   setProducts(updatedProducts);
  // };

  useEffect(() => {
    async function fetchProducts() {
      const data = await getProducts();
      setProducts(data);
    }

    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, handleDeleteProduct, handleCreateProduct}}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts =() => useContext(ProductContext);
