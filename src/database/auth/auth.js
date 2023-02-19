
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
//funcion qque coomprueba si tiene permisos de administracion o no
export const isAdmin = (user) => {
  if (user.rol.name === "admin") {
    localStorage.setItem("isAdmin", true);
    return true;
  } else {
    return false;
  }
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
      if (data.status === true) {
      const { token, user } = data;
       const username = user.username;
        localStorage.setItem("token", token);
        localStorage.setItem("user", username);
        localStorage.setItem("isAdmin", isAdmin(user));
        
        return data;

      }
      logoutUser();

     
      return data
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
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.error(error);
      return error;
    });
};


export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("isAdmin");
  return true;
};
//funcion que desencripta el token para añdirlo a los headers de las peticiones

export const getToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return token;
  } else {
    return false;
  }
};

//funcion que añade el token a los headers de las peticiones
export const addTokenToHeaders = () => {
  const token = getToken();
  if (token) {
    return {
      headers: {
        Authorization: ` ${token}`,
      },
    };
  } else {
    return alert("No token found");
  }
}


