
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
  console.log('este es el token'+token);
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

}

//Add product
export const addProduct = async(product, token) => {
  const headers = { 'Authorization': `${token}`};
  const ENDPOINT = `http://localhost:4000/product/createProduct`;
  const response = await fetch(ENDPOINT, { method: 'POST', headers: headers, body: product });
  const data = await response.json();
  if (data.error) {
    console.log(data.error);
    return data.error;
  }
  console.log(data);
  return data;





}



