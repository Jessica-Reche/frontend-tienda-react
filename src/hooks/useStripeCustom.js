/* eslint-disable no-unused-vars */
import { useCallback } from 'react'
import { useStateValue } from '../context/StateProvider';
import { useState } from 'react';
import { actionTypes, getBasketTotal } from '../utils';
import { createPayment } from '../database/stripe';

export default function useStripeCustom() {
    const [{ basket, paymentMessage }, dispatch] = useStateValue();
    const [loading, setLoading] = useState(false);
    
    const createPaymentMethod = useCallback(async (stripe, elements, cardElement) => {
        const paymentMethodData = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(cardElement),
        });
        return paymentMethodData;
    }, []);

    const clearCardElement = (elements, cardElement) => {
        elements.getElement(cardElement).clear();
    };

    const handleDispatchMessage = (message) => {
        dispatch({
            type: actionTypes.SET_PAYMENT_MESSAGE,
            paymentMessage: message,
        });
    };

    const handleDispatchBasket = () => {
        dispatch({
            type: actionTypes.EMPTY_BASKET,
            basket: [],
        });
    };
    const handlePayment = useCallback(async (stripe, elements, cardElement, nextStep) => {
        setLoading(true);
        const paymentMethodData = await createPaymentMethod(stripe, elements, cardElement);
        const { paymentMethod, error } = paymentMethodData;
        if (!error) {
            try {
                const data = await createPayment(paymentMethod, getBasketTotal(basket) * 100);
                handleDispatchMessage(data.message);
                handleDispatchBasket()
                clearCardElement(elements, cardElement);
                nextStep();

            } catch (error) {
                console.log(error);
                nextStep();
            }
        }
        setLoading(false);
   
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return { handlePayment, loading, getBasketTotal };

}



