
import axios from 'axios';
import config from "../config";
const urlBase = config.API_URL;

export const createPayment = async (paymentMethod, amount) => {
    const { id } = paymentMethod;
    const { data } = await axios.post(`${urlBase}stripe`, { id, amount });
    return data;
};




