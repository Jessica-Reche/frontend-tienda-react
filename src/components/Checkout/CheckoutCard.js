import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import accounting from "accounting";
import { Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import styled from "@emotion/styled";
import { useStateValue } from "../../context/StateProvider";
import { actionTypes } from "../../utils";

const CardStyled = styled(Card)({

    'CardActions-root': {
        display: 'flex',
        justifyContent: 'space-between',
        textAlign: 'center',

    },
    '.cardRating': {
        display: 'flex',

    },
    ' .media': {
        display: 'flex',
        justifyContent: 'space-between',
        textAlign: 'center',
        marginTop: '1rem',
        marginBottom: '1rem',

    },

});



export default function CheckoutCard({ product: { _id, name, poster, price, rating } }) {
    console.log(_id);
    console.log(name);
    console.log(poster);
    console.log(price);
    console.log(rating);
  // eslint-disable-next-line no-unused-vars
    const [{ basket }, dispatch] = useStateValue();
    const removeItem = () => {
        dispatch({
            type: actionTypes.REMOVE_ITEM,
            id: _id,
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
                    <Delete fontSize="large"  />
                </IconButton>
            </CardActions>
        </CardStyled>
    );
}
