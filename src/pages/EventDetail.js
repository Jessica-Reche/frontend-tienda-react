import React, { useState } from 'react';
import {
    Box,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormHelperText,
    FormLabel,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@mui/material';
//import { useParams } from 'react-router-dom';

const EventDetail = () => {
    // const { id } = useParams();
    const [tipoEvento, setTipoEvento] = useState('');
    const [fechaEvento, setFechaEvento] = useState('');
    const [eventosSeleccionados, setEventosSeleccionados] = useState({
        cumpleaños: false,
        bodas: false,
        comuniones: false,
        babyShowers: false,
        otros: false,
    });
    const [comentario, setComentario] = useState('');

    const handleTipoEventoChange = (event) => {
        setTipoEvento(event.target.value);
    };

    const handleFechaEventoChange = (event) => {
        setFechaEvento(event.target.value);
    };

    const handleCheckboxChange = (event) => {
        setEventosSeleccionados({
            ...eventosSeleccionados,
            [event.target.name]: event.target.checked,
        });
    };

    const handleComentarioChange = (event) => {
        setComentario(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Lógica para enviar la información a un servidor o para realizar la acción deseada.
    };

    return (
        <>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4">Contratar evento</Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    Complete el formulario para contratar un evento .
                </Typography>
            </Box>
            <form onSubmit={handleSubmit}>
                <FormControl sx={{ mb: 4 }} variant="outlined" fullWidth>
                    <InputLabel>Número de invitados</InputLabel>
                    <Select
                        value={tipoEvento}
                        onChange={handleTipoEventoChange}
                        label="Número de invitados"
                    >
                        <MenuItem value="10-50">de 10-50</MenuItem>
                        <MenuItem value="50-100">de 50-100</MenuItem>
                        <MenuItem value="100-200">de 100-200</MenuItem>
                        <MenuItem value="200-500">de 200-500</MenuItem>
                        <MenuItem value="otros">Otros</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ mb: 4 }} component="fieldset" variant="outlined">
                    <FormLabel component="legend">Seleccione los eventos:</FormLabel>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={eventosSeleccionados.cumpleaños}
                                    onChange={handleCheckboxChange}
                                    name="cumpleaños"
                                />
                            }
                            label="Cumpleaños"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={eventosSeleccionados.bodas}
                                    onChange={handleCheckboxChange}
                                    name="bodas"
                                />
                            }
                            label="Bodas"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={eventosSeleccionados.comuniones}
                                    onChange={handleCheckboxChange}
                                    name="comuniones"
                                />
                            }
                            label="Comuniones"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={eventosSeleccionados.babyShowers}
                                    onChange={handleCheckboxChange}
                                    name="babyShowers"
                                />
                            }
                            label="Baby Showers"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={eventosSeleccionados.otros}
                                    onChange={handleCheckboxChange}
                                    name="otros"
                                />
                            }
                            label="Otros"
                        />
                    </FormGroup>
                    <FormHelperText>Seleccione los eventos que desea contratar.</FormHelperText>
                </FormControl>
                <FormControl sx={{ mb: 4 }} variant="outlined" fullWidth>
                    <TextField
                        id="fechaEvento"
                        label="Fecha del evento"
                        type="date"
                        value={fechaEvento}
                        onChange={handleFechaEventoChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </FormControl>

                <FormControl sx={{ mb: 4 }} variant="outlined" fullWidth>
                    <TextField
                        id="comentario"
                        label="Detalles del evento"
                        multiline
                        rows={4}
                        value={comentario}
                        onChange={handleComentarioChange}
                    />
                </FormControl>

            </form>
        </>
    );
};

export default EventDetail;
