import { createContext, useState, useEffect, useContext } from 'react';
import {  getProducts, updatePoster, updateProduct } from '../database/products';

import { deleteProduct ,addProduct } from '../database/products'
import useAuth from '../hooks/useAuth';



export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const {token} = useAuth();
  const [products, setProducts] = useState([]);
  const [state, setState] = useState({ loading: false, error: true });

  const handleDeleteProduct = async (id) => {
    await deleteProduct(id, token);
    const updatedProducts = await getProducts();
    setProducts(updatedProducts);
  };

  const handleCreateProduct = async (productData) => {
    setState({ loading: true, error: false });
    console.log(productData);
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
    <ProductContext.Provider value={{ products, handleDeleteProduct, handleCreateProduct,handleUpdateProduct, handleUpdatePoster,  isLoginLoading: state.loading,}}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts =() => useContext(ProductContext);
