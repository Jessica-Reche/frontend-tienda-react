import config from "../config";
const urlBase = config.API_URL;
export const getProducts = () => {
  const ENDPOINT = `${urlBase}product/getProducts`;
  const HEADERS = { 'Content-Type': 'application/json' };
  const OPTIONS = { method: 'GET', headers: HEADERS };
  return fetch(ENDPOINT, OPTIONS)
    .then((response) => response.json())
    .then((data) => { return data.data; })
    .catch((error) => { console.error(error); return error; });
};

//Delete product
export const deleteProduct = async(id, token) => {
  console.log(id);
  const headers = { 'Authorization': `${token}`, 'Content-Type': 'application/json' };
  const ENDPOINT = `${urlBase}product/deleteProduct/${id}`;
  const response = await fetch(ENDPOINT, { method: 'DELETE', headers: headers });
  const data = await response.json();
  console.log(data);
  return data.message;
};

//Add product
export const addProduct = async(product, token) => {

  const headers = { 'Authorization': `${token}`};
  const ENDPOINT = `${urlBase}product/createProduct`;
  const response = await fetch(ENDPOINT, { method: 'POST', headers: headers, body: product });
  const data = await response.json();
  console.log(data);
  return data;

};

//Update poster
export const updatePoster = async(id, posterData, token) => {
  const posterResponse = await fetch(`${urlBase}product/updateProductPoster/${id}`, {
        method: "PUT", 
        headers: { Authorization: `${token}` },
        body: posterData,
      });
      const posterResult = await posterResponse.json();
      console.log(posterResult);
      return posterResult;
};

export const updateGallery = async(id, galleryData, token) => {
  const galleryResponse = await fetch(`${urlBase}product/updateProductGallery/${id}`, {
        method: "PUT",
        headers: { Authorization: `${token}` },
        body: galleryData,
      });

      const galleryResult = await galleryResponse.json();
      console.log(galleryResult);
      return galleryResult;

};

//Update product
export const updateProduct = async(id, productData,token) => {
  const data = Object.fromEntries(productData);
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': ` ${token}`
      },
      body: JSON.stringify(data)
    };
    const response = await fetch( `${urlBase}product/updateProduct/${id}`, requestOptions);
    const result = await response.json();
    console.log(result);
    return result;
}




