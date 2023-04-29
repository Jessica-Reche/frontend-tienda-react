import * as React from "react";
import { Link } from "react-router-dom";

import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Grid from "@mui/material/Grid";
import useAuth from "../../../hooks/useAuth";
import { BoxStyled } from "./usersAdminStyles";
import { Snackbar, Alert } from "@mui/material";


export default function AdminProducts() {
  const { users, deleteUserById, isLoginLoading } = useAuth();
  const [message, setMessage] = React.useState("");
  const [showNotification, setShowNotification] = React.useState(false);
  const usersList = users.map((user) => {
    return {
      ...user,
      handleDelete: async () => {
        let response = await deleteUserById(user._id);
        console.log(response);

        setMessage(response.message);
        setShowNotification(true);


      }
    };
  });

  return (
    <BoxStyled className="root">
      <h1>Administración de usuarios</h1>
      <Button variant="contained" component={Link} to="/admin/users/new">
        Añadir nuevo usuario
      </Button>
      <br />
      {isLoginLoading && <strong> Loading users...</strong>}
      {!isLoginLoading && <TableContainer component={Paper} className="tableContainer">
        <Table aria-label="Productos">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Rol</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersList.map((user) => (
              <TableRow key={user._id}>
                <TableCell component="th" scope="row">
                  {user._id}
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.rol.name}</TableCell>
                <TableCell>
                  <Grid container spacing={1} justifyContent="center">
                    <Grid item>
                      <Button
                        variant="contained"
                        size="small"
                        component={Link}
                        to={`/admin/users/edit/${user._id}`}
                      >
                        Editar
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={user.handleDelete}
                      >
                        Eliminar
                      </Button>
                    </Grid>
                  </Grid>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>}
      {message && (
        <Snackbar
          key={message}
          open={showNotification}
          autoHideDuration={6000}
          onClose={() => setShowNotification(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            onClose={() => setShowNotification(false)}
            severity="success"
            sx={{
              width: "100%",
              fontSize: "1.2rem",
              padding: "1.5rem",
              border: "2px solid black",
            }}
          >
            {message}
          </Alert>
        </Snackbar>

      )}

    </BoxStyled>
  );
}