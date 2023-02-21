
export const registerUser = (username, email, password) => {
  return fetch("http://localhost:4000/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  }).then(res => {
    if (!res.ok) throw new Error('Response is NOT ok')
    return true
  })
};



export const loginUser = (email, password) => {

 
  return fetch("http://localhost:4000/user/login", {
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
  return fetch("http://localhost:4000/product/getProducts", {
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


