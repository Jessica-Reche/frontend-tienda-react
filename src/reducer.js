export const initialState = {
    // basket: JSON.parse(localStorage.getItem("basket")) || [],
    basket: [],
    //user: null,
    shippingData: {},
    paymentMessage: "",

};
export const actionTypes = {
    ADD_TO_BASKET: "ADD_TO_BASKET",
    REMOVE_ITEM: "REMOVE_ITEM",
    EMPTY_BASKET: "EMPTY_BASKET",
    //SET_USER: "SET_USER",
    SET_SHIPPING_DATA: "SET_SHIPPINGDATA",
    SET_PAYMENT_MESSAGE: "SET_PAYMENT_MESSAGE",
    SET_QUANTITY: "SET_QUANTITY",
};

export const getBasketTotal = (basket) => basket?.reduce((amount, item) => item.price + amount, 0);
const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_TO_BASKET":
            return {
                ...state,
                basket: [...state.basket, action.item],
            };
        case "REMOVE_ITEM":
            const index = state.basket.findIndex((basketItem) => basketItem.id === action._id);
            let newBasket = [...state.basket];
            if (index >= 0) {
                newBasket.splice(index, 1);
            } else {
                console.warn(`Can't remove product (id: ${action._id}) as it's not in basket!`);
            }
            return { ...state, basket: newBasket, };

        case "EMPTY_BASKET":
            // localStorage.removeItem("basket");
            return { ...state, basket: action.basket };
        case "SET_SHIPPINGDATA":

            return { ...state, shippingData: action.shippingData };
        case "SET_PAYMENT_MESSAGE":

            return { ...state, paymentMessage: action.paymentMessage };
     
        default:
            return state;
    }
};

export default reducer;