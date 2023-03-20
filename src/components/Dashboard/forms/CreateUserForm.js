import * as React from "react";
import { styled } from "@mui/material/styles";
import {  useState } from 'react';
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import useAuth from "../../../hooks/useAuth";



const FormBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "2rem",
  border: "1px solid #ccc",
  borderRadius: "4px",
});

const CreateUserForm = () => {
   const { register, isLoginLoading } = useAuth();
    const [name, setName] = useState("");
    const [username, setUsername] =useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rolID, setRolID] = useState("63e54ca6b6d8257a189cbe2e");
    const [message, setMessage] = useState("");

  const navigate = useNavigate();


  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      name,
      username,
      email,
      password,
      rolID,
    };
   
    try {
      const result = await register(userData);
      console.log(result.status);
      result.status === true
        ? navigate("/admin/users")
        : setMessage(result.message);

    } catch (error) {
      setMessage(error.message);
    }
   
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Crear usuario
      </Typography>
      {isLoginLoading && <strong> Checking credentials...</strong>}
      {!isLoginLoading && <form  onSubmit={handleSubmit}>
       
        <FormBox  component="form" noValidate>
          <TextField
            fullWidth
            label="Nombre"
            name="name"
            onChange={(event) => setName(event.target.value)}
            value={name}
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Username"
            name="username"
            onChange={(event) => setUsername(event.target.value)}
            value={username}
            variant="outlined"
            margin="normal"
          />
        

          <TextField
            fullWidth
            label="Email"
            name="email"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
            variant="outlined"
            margin="normal"
            type="email"
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
            variant="outlined"
            margin="normal"
            type="password"
          />
         
          <Select
            fullWidth
            label="Rol"
            name="rol"
            onChange={(event) => setRolID(event.target.value)}
            value={rolID}
            variant="outlined"
            margin="normal"
            type="select"
          >   


            <MenuItem  value="63ed70c9bc14ae28b2162da1">Cliente</MenuItem>
            <MenuItem  value="63ed70d5bc14ae28b2162da3">Administrador</MenuItem>

          </Select>
        
          <Button
            color="primary"
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            onClick={handleSubmit}
          > 
            Crear Usuario
          </Button>
          {message && (
            <Typography variant="body1" color="error" align="center">
              {message}
            </Typography>
          )}
     

        </FormBox>
        </form> }
    </Container>
  );





}

export default CreateUserForm;
