import styled from "@emotion/styled";
import { AppBar } from "@mui/material";

const StyledAppBar = styled(AppBar)({
    background: " #e8e9ef",
    boxShadow: "none",

    '.root': {
        flexGrow: 1,
    },
    '.grow': {
        flexGrow: 1,
    },
    '.button': {
        ' .MuiButton-root': {
            marginLeft: '0.3em',
            fontSize: '0.7rem',
            backgroundColor: '#F1225F',
            width: '7rem',


        }
    },
    '.image': {
        marginRight: "1rem",
        height: "8rem",
    },

    '.hide-element': {
        opacity: 0,
    },

});

export {
    StyledAppBar,
} 