/* eslint-disable no-unused-vars */
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { useForm, FormProvider } from 'react-hook-form';
import AddressInput from './AddressInput';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useStateValue } from '../../../context/StateProvider';
import { actionTypes } from '../../../reducer';




const AddressForm = ({ nextStep }) => {
  const methods = useForm();
  const [{ shippingData }, dispatch] = useStateValue();





  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((data) => {
          dispatch({
            type: actionTypes.SET_SHIPPING_DATA,
            shippingData: data
          });
          nextStep();
        }
        )}>
          <Grid container spacing={3}>
            <AddressInput required name="firstName" label="First name" />
            <AddressInput required name="lastName" label="Last name" />
            <AddressInput required name="address1" label="Address line 1" />
            <AddressInput required name="city" label="City" />
            <AddressInput required name="zip" label="Zip / Postal code" />
            <AddressInput required name="country" label="Country" />
            <AddressInput required name="state" label="State" />
          </Grid>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
            <Button component={Link} to="/checkout-page" variant="contained" >
              Back to the Cart
            </Button>
            <Button type="submit" variant="contained" > Next </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;






