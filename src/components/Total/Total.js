import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import accounting from "accounting";
import { Link } from "react-router-dom";
import { getBasketTotal } from "../../reducer";
import { useStateValue } from "../../context/StateProvider";

const BoxStyled = styled(Box)({
    'root': {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "20vh"
    },
    'button': {
        marginTop: '2rem',
    },
});

const Total = () => {
    // eslint-disable-next-line no-unused-vars
    const [{ basket }, dispatch] = useStateValue();
    return (
        <BoxStyled className="root">
            <h5>Total items: {basket?.length}</h5>
            <h5>{accounting.formatMoney(getBasketTotal(basket), "€")}</h5>
            <Link to="/checkout">
                <Button className="button" variant="contained" color="secondary">Check out</Button>
            </Link>
        </BoxStyled>
    );
}
export default Total;