import config from "../config";
const urlBase = config.API_URL;

//registro de usuario
export const registerUser = async (userData) => {
  const ENDPOINT = `${urlBase}user/register`;
  const headers = { 'Content-Type': 'application/json' };
  const body = JSON.stringify(userData);
  const options = { method: 'POST', headers, body };
  const response = await fetch(ENDPOINT, options);
  const data = await response.json();
  return data;
};

export const loginUser = (email, password) => {
  const ENDPOINT = `${urlBase}user/login`;
  const headers = { 'Content-Type': 'application/json' };
  const body = JSON.stringify({ email, password });
  const options = { method: 'POST', headers, body };
  return fetch(ENDPOINT, options)
    .then((res) =>{if(!res.ok)res.json() 
     return res.json()})
    .then((data) => data)
    .catch((error) => { console.error(error); return error; });
};

export const getUsers = (token) => {
  const headers = { 'Authorization': `${token}`, 'Content-Type': 'application/json' };
  const ENDPOINT = `${urlBase}user/users`;
  return fetch(ENDPOINT, { method: 'GET', headers: headers })
    .then((response) => response.json())
    .then((data) => { return data; })
    .catch((error) => { console.error(error);return error; });
};

export const deleteUser = async(id, token) => {
const headers = { 'Authorization': `${token}`, 'Content-Type': 'application/json' };
const ENDPOINT = `${urlBase}user/deleteUser/${id}`;
const response = await fetch(ENDPOINT, { method: 'DELETE', headers: headers });
const data = await response.json();
return data;
};

export const updateUser = async(id, userData,token) => {
const headers = { 'Authorization': `${token}`, 'Content-Type': 'application/json' };
const ENDPOINT = `${urlBase}user/updateUser/${id}`;
const response = await fetch(ENDPOINT, { method: 'PUT', headers: headers, body: JSON.stringify(userData) }); 
console.log(response);
const data = await response.json();
console.log(data);
return data;
};
 





















//Metodo temporal para obtener los productos hay que quitarlo de LoginUser
// export const getProducts = () => {
//   return fetch("${urlBase}product/getProducts", {
//     method: "GET",
//     headers: { "Content-Type": "application/json" },
//   })
//     .then((response) => response.json())
//     .then((data) => {
   
//       return data;
//     })
//     .catch((error) => {
//       console.error(error);
//       return error;
//     });
// };


