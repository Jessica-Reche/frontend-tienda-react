
import React from 'react';
import {  Container, Grid, Link, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledFooter = styled('footer')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
}));

const Footer = () => {

    return (
        <StyledFooter>
            <Container maxWidth="lg">
                <Grid container spacing={4} justifyContent="space-evenly">
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" color="text.primary" gutterBottom>
                            About Us 
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            We are a team of developers who are passionate about building great products.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" color="text.primary" gutterBottom>
                            Contact Us
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            <Link href="mailto:
                            ">Email Us</Link>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" color="text.primary" gutterBottom>
                            Terms and Conditions
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            <Link href="/terms">Terms and Conditions</Link>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" color="text.primary" gutterBottom>
                            Privacy Policy  
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            <Link href="/privacy">Privacy Policy</Link>
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </StyledFooter>
    );
};

export default Footer;


