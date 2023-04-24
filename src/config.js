
const config = {
    API_URL: process.env.NODE_ENV === 'production' ?  process.env.REACT_APP_API_URL_PROD : process.env.REACT_APP_API_URL_DEV,
    STRIPE_API_KEY: 'pk_test_51MzSpXGewgqc010reXlgyGZzygjLjgCQgg0qxkKIveMu3G2ykU7oLfzwGBacK7wRJ81W5Eew71YrUNXN9rP7GGi800RzmRHxlC'
};

export default config;

