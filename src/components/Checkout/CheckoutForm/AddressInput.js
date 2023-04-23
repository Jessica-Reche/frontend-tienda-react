import { Grid, TextField } from '@mui/material'
import React from 'react'
import { Controller, useFormContext,   } from 'react-hook-form'



const AddressInput = ({ name, label, required }) => {
    const { control } = useFormContext()

   
    return (
        <Grid item xs={12} sm={6}>
            <Controller  render={({ field }) => <TextField {...field} fullWidth label={label} required={required} />} control={control} fullWidth name={name} label={label} required={required} />
        </Grid>
    )
}

export default AddressInput