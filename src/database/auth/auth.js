import axios from "axios";

const GLOBALENDPOINT = "https://natural-cherry-server.up.railway.app/";

export const registerUser = async (userData) => {
  const URI = `${GLOBALENDPOINT}user/register`;
  const headers = {
    "Content-Type": "application/json",
  };
  const body = JSON.stringify(userData);
  try {
    const response = await axios.post(URI, body, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const loginUser = async (email, password) => {
  const URI = `${GLOBALENDPOINT}user/login`;
  const headers = {
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    email,
    password,
  });
  try {
    const response = await axios.post(URI, body, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const getUsers = async (token) => {
  const URI = `${GLOBALENDPOINT}user/users`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: token,
  };
  try {
    const response = await axios.get(URI, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const deleteUser = async (id, token) => {
  const URI = `${GLOBALENDPOINT}user/deleteUser/${id}`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: token,
  };
  try {
    const response = await axios.delete(URI, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const updateUser = async (id, userData, token) => {
  const URI = `${GLOBALENDPOINT}user/updateUser/${id}`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: token,
  };
  const body = JSON.stringify(userData);
  try {
    const response = await axios.put(URI, body, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};
