import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AddShoppingCart, Delete } from "@mui/icons-material";
import accounting from "accounting";
import { actionTypes } from "../../utils";
import { useStateValue } from "../../context/StateProvider";
import useAuth from "../../hooks/useAuth";




const ExpandMoreButton = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));


export default function Product({ product: { _id, name, poster, price, description, rating, discount }, handleDelete }) {
  const [expanded, setExpanded] = React.useState(false);
  const [{ basket }, dispatch] = useStateValue();
  const { admin } = useAuth();

  const baseImageUrl = 'https://mundo-tarta-server.up.railway.app';
  poster = `${baseImageUrl}${poster.link}`;


  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleDeleteClick = () => {
    handleDelete();
  };

  const addToBasket = () => {
    dispatch({
      type: actionTypes.ADD_TO_BASKET,
      item: { _id, name, poster, price, description, rating },
    });
  };


  return (
    <Card sx={{ maxWidth: 345 }}>
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
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {discount == 0 ? "" : discount}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="Add to Cart" onClick={addToBasket}>
          <AddShoppingCart fontSize="large" />
        </IconButton>

        {Array(rating)
          .fill()
          .map((_, i) => (
            <p>&#11088;</p>
          ))}

        <ExpandMoreButton
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"

        >
          <ExpandMoreIcon />
        </ExpandMoreButton>
        {admin && <IconButton aria-label="Delete" onClick={handleDeleteClick}>
          <Delete fontSize="large" />
        </IconButton>}




      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{description}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
