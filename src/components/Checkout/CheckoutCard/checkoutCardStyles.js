import styled from "@emotion/styled";
import Card from "@mui/material/Card";

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

export default CardStyled;
