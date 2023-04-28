/* eslint-disable no-unused-vars */
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { useForm, FormProvider } from 'react-hook-form';

import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useStateValue } from '../../../context/StateProvider';
import { actionTypes } from '../../../reducer';
import CustomInput from '../../CustomInput';




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
            <CustomInput required name="firstName" label="First name" type="text"/>
            <CustomInput required name="lastName" label="Last name" type="text"/>
            <CustomInput required name="address1" label="Address line 1" type="text"/>
            <CustomInput required name="city" label="City" type="text"/>
            <CustomInput required name="zip" label="Zip / Postal code" type="number"/>
            <CustomInput required name="country" label="Country" type="text"/>
            <CustomInput required name="state" label="State" type="text"/>
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





