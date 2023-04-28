import { Grid, TextField } from '@mui/material'
import React from 'react'
import { Controller, useFormContext,   } from 'react-hook-form'





const CustomInput = ({ name, label, required, type, error }) => {
    const { control } = useFormContext()

   
    return (
        <Grid item xs={12} sm={6}>
            <Controller  render={({ field }) => <TextField {...field} fullWidth label={label} required={required} type={type} />} control={control} type={type} fullWidth name={name} label={label} required={required} error={!!error} />
        </Grid>
    )
}

export default CustomInput