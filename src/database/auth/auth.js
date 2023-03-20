
//registro de usuario
  export const registerUser = async (userData) => {
    //registro de usuario
  
      const URI = "https://mundo-tarta-server.up.railway.app/user/register";
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

 
  return fetch("https://mundo-tarta-server.up.railway.app/user/login", {
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
      if (!res.ok) throw new Error('Response is NOT ok')
      return res.json()
    })
    .then((data) => {

    
   return  data;
      
    });
};

export const getUsers = (token) => {
  return fetch("https://mundo-tarta-server.up.railway.app/user/users", {

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
  const ENDPOINT = `https://mundo-tarta-server.up.railway.app/user/deleteUser/${id}`;
  const response = await fetch(ENDPOINT, { method: 'DELETE', headers: headers });
  const data = await response.json();
  return data;
};

export const updateUser = async(id, userData,token) => {
  const headers = { 'Authorization': `${token}`, 'Content-Type': 'application/json' };
  const ENDPOINT = `https://mundo-tarta-server.up.railway.app/user/updateUser/${id}`;
  const response = await fetch(ENDPOINT, { method: 'PUT', headers: headers, body: JSON.stringify(userData) }); 
  console.log(response);
  const data = await response.json();
  console.log(data);
  return data;
};
   





















//Metodo temporal para obtener los productos hay que quitarlo de LoginUser
// export const getProducts = () => {
//   return fetch("https://mundo-tarta-server.up.railway.app/product/getProducts", {
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


