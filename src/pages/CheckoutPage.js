import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import CheckoutCard from '../components/Checkout/CheckoutCard';
import Total from '../components/Total';
import { useStateValue } from '../context/StateProvider';

const BoxStyled = {
    flexGrow: 1,
    padding: "2rem",
    marginTop: "7rem",    
};
const TotalStyled = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
};

export default function CheckoutPage() {
    const [{basket} , dispatch] = useStateValue();

    function FormRow() {
        return (
            <React.Fragment>
                {basket?.map((item) => (
                    <Grid item xs={12} sm={8} md={8} lg={4}>
                        <CheckoutCard key={item._id} product={item} />
                    </Grid>
                ))}
            </React.Fragment>
        );
    }
    return (
        <Box sx={BoxStyled}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography align='center' gutterBottom variant='h4'>
                        Shopping Cart
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={8} md={6} container spacing={2}>
                    <FormRow />
                </Grid>
                <Grid sx={TotalStyled} item xs={12} sm={4} md={3}>
                    <Typography align='center' gutterBottom variant='h4'>
                        <Total />
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
}