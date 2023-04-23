/* eslint-disable no-unused-vars */
import React from 'react'
import Review from './Review'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { Button, CircularProgress, Divider, Typography } from '@mui/material'
import { useStateValue } from '../../../context/StateProvider'
import accounting from 'accounting'
import useStripeCustom from '../../../hooks/useStripeCustom'


const stripePromise = loadStripe("pk_test_51MzSpXGewgqc010reXlgyGZzygjLjgCQgg0qxkKIveMu3G2ykU7oLfzwGBacK7wRJ81W5Eew71YrUNXN9rP7GGi800RzmRHxlC")
const CARD_ELEMENT_OPTIONS = {
  iconStyle: "solid",
  hidePostalCode: true,
  style: {
    base: {
      iconColor: "rgb(240, 57, 122)",
      color: "#333",
      fontSize: "18px",
      "::placeholder": {
        color: "#ccc",
      },
    },
    invalid: {
      color: "#e5424d",
      ":focus": {
        color: "#303238",
      },
    },
  },
};

const CheckoutForm = ({ backsTep, nextStep }) => {
  const [{ basket }, dispatch] = useStateValue();

  const stripe = useStripe()
  const elements = useElements()
  const { handlePayment, loading, getBasketTotal } = useStripeCustom();

  const handleSubmit = async (event) => {
    event.preventDefault()
    handlePayment(stripe, elements, CardElement, nextStep);
  }

  return (
    <form onSubmit={handleSubmit}>
      <CardElement options={CARD_ELEMENT_OPTIONS} />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <Button variant='outlined' onClick={backsTep}>Back</Button>
        <Button type="submit" color='primary' variant='contained' disabled={!stripe}>
          {loading ? (
            <CircularProgress />
          ) : (
            `Pay ${accounting.formatMoney(getBasketTotal(basket), '€')}`

          )}

        </Button>
      </div>

    </form>
  )
}

const PaymentForm = ({ backsTep, nextStep }) => {
  return (
    <>
      <Review />
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: '20px 0' }}>
        Payment method
      </Typography>
      <Elements stripe={stripePromise}>
        <CheckoutForm backsTep={backsTep} nextStep={nextStep} />
      </Elements>
    </>

  )
}

export default PaymentForm
