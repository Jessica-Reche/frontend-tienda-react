import styled from "@emotion/styled";
import Box from "@mui/material/Box";

const BoxStyled = styled(Box)({
    ".root": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "2rem",
    },
    tableContainer: {
      marginTop: "4rem",
      overflowX: "auto",
    },
    marginTop: "2rem"
  });

export {
     BoxStyled
}