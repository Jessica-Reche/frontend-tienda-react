import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import CheckoutCard from '../../components/Checkout/CheckoutCard/CheckoutCard';
import Total from '../../components/Total/Total';
import { useStateValue } from '../../context/StateProvider';
import {
    BoxStyled,
    TotalStyled,
    titleStyle,
} from './checkoutPageStyles';



export default function CheckoutPage() {
    // eslint-disable-next-line no-unused-vars
    const [{ basket }, dispatch] = useStateValue();

    function FormRow() {
        return (
            <>
                {basket?.map((item) => (
                    <Grid item xs={12} sm={8} md={8} lg={4}>
                        <CheckoutCard key={item._id} product={item} />
                    </Grid>
                ))}
            </>
        );
    }
    return (
        <Box sx={BoxStyled}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography sx={titleStyle} align='center' gutterBottom variant='h4'>
                        Checkout
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