
//registro de usuario
  export const registerUser = async (username, email, password) => {
    //registro de usuario
  
      const URI = "https://mundo-tarta-server.up.railway.app/user/register";
      const headers = {
        "Content-Type": "application/json",
      };
      const body = JSON.stringify({ username, email, password });
      const options = {
        method: "POST",
        headers,
        body,
      };
      const response = await fetch(URI, options);
      if (!response.ok) {
        throw new Error(`Error al enviar solicitud: ${response.status}`);
      }
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
  const data = Object.fromEntries(userData);
    const requestOptions = {        
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': ` ${token}`
      },
      body: JSON.stringify(data)
    };
    const response = await fetch(`https://mundo-tarta-server.up.railway.app/user/updateUser/${id}`, requestOptions);
    const result = await response.json();
    return result;
}






















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


