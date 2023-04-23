import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PaymentForm from './CheckoutForm/PaymentForm';
import { useState } from 'react';
import AddressForm from './CheckoutForm/AddressForm';
import Confirmation from '../../pages/Confirmation';
import {useStateValue} from '../../context/StateProvider'

const steps = ['Shipping address', 'Payment details'];
const theme = createTheme();

export default function Checkout() {
  const [activeStep, setActivestep] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [{paymentMessage}, dispatch] = useStateValue();
  const nextStep = () => setActivestep((prevActivestep) => prevActivestep + 1);
  const backStep = () => setActivestep((prevActivestep) => prevActivestep - 1);

  const Form = () =>
  activeStep === 0 ? (
    <AddressForm nextStep={nextStep} />
  ) : (
    <PaymentForm backStep={backStep} nextStep={nextStep} />
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="sm" sx={{ mb: 4, mt: 30 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
          
            <Confirmation message={paymentMessage} />
          ) : (
            <Form step={activeStep} />
          )}
        </Paper>
  
      </Container>
    </ThemeProvider>
  );
}