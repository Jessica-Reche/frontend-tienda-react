/* eslint-disable no-unused-vars */
import { ListItem, ListItemText, Typography } from '@mui/material'
import React from 'react'
import { useStateValue } from '../../../context/StateProvider'
import { getBasketTotal } from '../../../reducer'
import accounting from 'accounting'

const Review = () => {

  const [{ basket }, dispatch] = useStateValue()
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>

      {basket?.map((product) => (
        <ListItem key={product.name}>
          <ListItemText primary={product.name} secondary={`Quantity: ${1}`} />
          <Typography variant="body2">{accounting.formatMoney(product.price, "€")}</Typography>
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