
const config = {
    API_URL: process.env.NODE_ENV === 'production' ?  process.env.REACT_APP_API_URL_PROD : process.env.REACT_APP_API_URL_DEV,
    STRIPE_API_KEY: process.env.REACT_APP_STRIPE_APY_KEY_DEV
};

export default config;

