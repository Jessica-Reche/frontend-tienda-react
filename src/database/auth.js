import config from "../config";
const urlBase = config.API_URL;

//registro de usuario
export const registerUser = async (userData) => {
    const URI = `${urlBase}user/register`;
    const headers = {
      "Content-Type": "application/json",
    };
    const body = JSON.stringify(userData);
    const options = {
      method: "POST",
      headers,
      body,
    };
    const response = await fetch(URI, options);
    const data = await response.json();
    return data;
};


export const loginUser = (email, password) => {
return fetch(`${urlBase}user/login`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    email,
    password,
  }),
})
  .then((res) => {
    if (!res.ok)  return res.json()
    return res.json()
  })
  .then((data) => { 
    return data;
  })
};

export const getUsers = (token) => {
return fetch(`${urlBase}user/users`, {

  method: "GET",
  headers: { 
    "Content-Type": "application/json", 
    'Authorization': `${token}`},
})
  .then((response) => response.json())
  .then((data) => {
    return data;
  })
  .catch((error) => {
    console.error(error);
    return error;
  });
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


