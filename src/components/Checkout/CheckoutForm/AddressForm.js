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
            <CustomInput required name="nombre" label="Nombre" type="text"/>
            <CustomInput required name="apellidos" label="Apellidos" type="text"/>
            <CustomInput required name="direccion" label="Dirección" type="text"/>
            <CustomInput required name="city" label="Ciudad" type="text"/>
            <CustomInput required name="pablacion" label="Población" type="text"/>
            <CustomInput required name="codigo-postal" label="Código postal" type="number"/>
            <CustomInput required name="pais" label="Pais" type="text"/>
        
          </Grid>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
            <Button component={Link} to="/checkout-page" variant="contained" >
              Volver
            </Button>
            <Button type="submit" variant="contained" > Siguiente </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;




