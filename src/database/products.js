import axios from 'axios';

const GLOBALENDPOINT = "https://natural-cherry-server.up.railway.app/";

export const getProducts = async () => {
  try {
    const response = await axios.get(`${GLOBALENDPOINT}product/getProducts`, {
      headers: { "Content-Type": "application/json" },
    });
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

//Delete product
export const deleteProduct = async(id, token) => {
  console.log(id);
  const headers = { 'Authorization': `${token}`, 'Content-Type': 'application/json' };
  const ENDPOINT = `${GLOBALENDPOINT}product/deleteProduct/${id}`;

  try {
    const response = await axios.delete(ENDPOINT, { headers });
    console.log(response.data);
    return response.data.message;
  } catch (error) {
    console.log(error.response.data.error);
    return error.response.data.error;
  }
};

//Add product
export const addProduct = async(product, token) => {

  const headers = { 'Authorization': `${token}`};
  const ENDPOINT = `${GLOBALENDPOINT}product/createProduct`;
  try {
    const response = await axios.post(ENDPOINT, product, { headers });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.response.data.error);
    return error.response.data.error;
  }
};

//Update poster
export const updatePoster = async(id, posterData, token) => {
  try {
    const response = await axios.put(`${GLOBALENDPOINT}product/updateProductPoster/${id}`, posterData, {
      headers: { Authorization: `${token}` },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.response.data.error);
    return error.response.data.error;
  }
};

//Update product
export const updateProduct = async(id, productData,token) => {
  const data = Object.fromEntries(productData);
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': ` ${token}`
  };
  try {
    const response = await axios.put(`${GLOBALENDPOINT}product/updateProduct/${id}`, data, { headers });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.response.data.error);
    return error.response.data.error;
  }
}
