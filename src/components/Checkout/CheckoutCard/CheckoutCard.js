import * as React from "react";

import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import accounting from "accounting";
import { Delete } from "@mui/icons-material";
import { Box, Button, IconButton } from "@mui/material";

import { useStateValue } from "../../../context/StateProvider";
import { actionTypes } from "../../../reducer";
import CardStyled from "./checkoutCardStyles";




export default function CheckoutCard({ product: { _id, name, poster, price, rating } }) {

    const [quantity, setQuantity] = React.useState(1);
    // eslint-disable-next-line no-unused-vars
    const [{ basket }, dispatch] = useStateValue();
    React.useEffect(() => {
        const quantity = basket.reduce((count, item) => {
          if (item._id === _id) {
            return count + 1;
          } else {
            return count;
          }
        }, 0);
        setQuantity(quantity);
      }, [basket, _id]);
      


    const removeItem = () => {
        // eliminar todos los items con el mismo id
        for (let i = 0; i < quantity; i++) {
            dispatch({
                type: actionTypes.REMOVE_ITEM,
                id: _id,
                quantity: quantity,
            });
        }
        
   
    };
    const sumQuantity = () => {
      // sumar Quantity y añadir al basket
        setQuantity(quantity + 1)
        dispatch({ 
            type: actionTypes.ADD_TO_BASKET,
            item: { _id, name, poster, price, rating, quantity },
        });

    };
    const restQuantity = () => {
        setQuantity(Math.max(1, quantity - 1))
        dispatch({
            type: actionTypes.REMOVE_ITEM,
            id: _id,
           
        });
        dispatch({
            type: actionTypes.ADD_QUANTITY,
            id: _id,
            quantity: quantity,
        });

    };


    return (
        <CardStyled sx={{ maxWidth: 345, marginTop: "7rem" }}>
            <CardHeader
                action={
                    <Typography sx={{ fontSize: 25 }} variant="h5" color="textSecondary">
                        {accounting.formatMoney(price, "€")}
                    </Typography>
                }
                title={name}
                alt={name}
                subheader="September 14, 2016"
            />
            <CardMedia
                component="img"
                height="194"
                image={poster}
                alt={name}
            />

            <CardActions disableSpacing className="media">
                <div className="cardRating">
                    {Array(rating)
                        .fill()
                        .map((_, i) => (
                            <p>&#11088;</p>
                        ))}
                </div>
           
               
                <IconButton onClick={removeItem}>
                    <Delete fontSize="large" />
                </IconButton>
            </CardActions>
            <Box sx={{ display: "flex", alignItems: "center", my: 4, ml:2, mb:3 }}>
                  <Button variant="outlined"  onClick={restQuantity}>-</Button>
                  <Typography variant="h6" component="span" sx={{ mx: 2 }}>
                    {quantity}
                  </Typography>
                  <Button variant="outlined" onClick={sumQuantity}>+</Button>
                </Box>
        </CardStyled>
    );
}
