import { Button, Divider, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Snackbar, Alert } from "@mui/material";

const Confirmation = ({ message }) => {
  const [showNotification, setShowNotification] = useState(true);
  useEffect(() => {
    if (message) {
      setShowNotification(true);
    }
  }, [message]);
  return (
    <>
      <div>
        <Typography variant='h6'>{message}</Typography>
        <br />
        <Divider />
        <br />
        <Typography variant='subtitle2' gutterBottom>
          {

            message === "Payment successful"
              ? "Your booking reference : Rgh8787878lkj"
              : ""
          }
        </Typography>
      </div>
      <br />
      <Button component={Link} to='/' variant='outlined' type='button'>
        Back to Home Page
      </Button>
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
            severity={message === "Payment successful" ? "success" : "error"}
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
    </>
  );
};

export default Confirmation;
