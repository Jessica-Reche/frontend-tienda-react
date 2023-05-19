
import React from 'react';
import {  Grid, Link, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledFooter = styled('footer')(({ theme }) => ({
    backgroundColor: '#f5f5f5',
    padding: theme.spacing(6),
    marginTop: 'auto',
  }));
  

const Footer = () => {

    return (<StyledFooter>
        <section maxWidth="lg">
            <Grid container spacing={4} justifyContent="space-evenly">
                <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="h6" color="text.primary" gutterBottom>
                        Acerca de Natural Cherry
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        Somos una tienda de postres ecológicos comprometidos con el medio ambiente y la salud de nuestros clientes.
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="h6" color="text.primary" gutterBottom>
                        Contacto
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        <Link href="mailto:info@naturalcherry.com">info@naturalcherry.com</Link>
                    </Typography>
                    
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="h6" color="text.primary" gutterBottom>
                        Términos y condiciones
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        <Link href="/terminos">Términos y condiciones</Link>
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="h6" color="text.primary" gutterBottom>
                        Política de privacidad
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        <Link href="/privacidad">Política de privacidad</Link>
                    </Typography>
                </Grid>
            </Grid>
        </section>
    </StyledFooter>
    
    );
};

export default Footer;


