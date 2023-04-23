
import axios from 'axios';
const GLOBALENDPOINT ='https://natural-cherry-server.up.railway.app/';

export const createPayment = async ( paymentMethod, amount) => {
    const { id } = paymentMethod;
    const { data } = await axios.post(`${GLOBALENDPOINT}stripe`, { id, amount });
    return data;
};




