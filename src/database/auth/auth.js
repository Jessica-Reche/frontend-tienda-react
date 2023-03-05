
//registro de usuario
  export const registerUser = async (username, email, password) => {
    //registro de usuario
  
      const URI = "https://backend-tienda.vercel.app/user/register";
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

 
  return fetch("https://backend-tienda.vercel.app/user/login", {
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
//Metodo temporal para obtener los productos hay que quitarlo de LoginUser
export const getProducts = () => {
  return fetch("https://backend-tienda.vercel.app/product/getProducts", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
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


