/* eslint-disable no-unused-vars */
import { ListItem, ListItemText, Typography } from '@mui/material'
import React from 'react'
import { useStateValue } from '../../../context/StateProvider'
import { getBasketTotal } from '../../../reducer'
import accounting from 'accounting'

const Review = () => {

  const [{ basket }, dispatch] = useStateValue()

  const uniqueProducts = [...new Set(basket?.map(item => item._id))];
  const filteredBasket = uniqueProducts.map(id => {
    return {
      ...basket.find(item => item._id === id),
      quantity: basket.reduce((count, item) => {
        if (item._id === id) {
          return count + 1;
        } else {
          return count;
        }
      }
        , 0)
    }
  });

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Resumen del pedido
      </Typography>

      {filteredBasket?.map((product) => (
        <ListItem key={product.name}>
       <ListItemText primary={product.name} secondary={`Quantity: ${product.quantity}`} />

          <Typography variant="body2">{accounting.formatMoney(product.price*product.quantity, "€")}</Typography>
        </ListItem>
      ))
      }
      <ListItem>
        <ListItemText primary="Total" />
        <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
          {accounting.formatMoney(getBasketTotal(basket), "€")}
        </Typography>
      </ListItem>

    </>
  )
}

export default Review