export const getProducts = () => {
  return fetch("http://localhost:4000/product/getProducts", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.data);
      return data.data;
    })
    .catch((error) => {
      console.error(error);
      return error;
    });
};

//Delete product
export const deleteProduct = async(id, token) => {
  console.log(id);
  const headers = { 'Authorization': `${token}`, 'Content-Type': 'application/json' };
  const ENDPOINT = `http://localhost:4000/product/deleteProduct/${id}`;

  const response = await fetch(ENDPOINT, { method: 'DELETE', headers: headers });
  const data = await response.json();
  if (data.error) {
    console.log(data.error);
    return data.error;
  }
  console.log(data);
  return data.message;
};

//Add product
export const addProduct = async(product, token) => {

  const headers = { 'Authorization': `${token}`};
  const ENDPOINT = `http://localhost:4000/product/createProduct`;
  const response = await fetch(ENDPOINT, { method: 'POST', headers: headers, body: product });
  const data = await response.json();
  console.log(data);
  return data;

};

//Update poster
export const updatePoster = async(id, posterData, token) => {
  const posterResponse = await fetch(`http://localhost:4000/product/updateProductPoster/${id}`, {
        method: "PUT", 
        headers: { Authorization: `${token}` },
        body: posterData,
      });
      const posterResult = await posterResponse.json();
      console.log(posterResult);
      return posterResult;
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
    const response = await fetch( `http://localhost:4000/product/updateProduct/${id}`, requestOptions);
    const result = await response.json();
    console.log(result);
    return result;
  
  
}




