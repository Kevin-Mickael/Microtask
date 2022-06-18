import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Link } from "react-router-dom";
import config from "../../config";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

const axios = require("axios");

const Register = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const [message, setMessage] = useState();
  const history = useHistory();

  const submitHandler = (data, e) => {
    setMessage({
      data: "Registration is in progress...",
    });

    axios
      .post(`${config.baseUrl}/user/register`, data)
      .then((response) => {
        // const data = response.data.data;

        setMessage({
          data: "Registered successfully, redirecting to the login page...",
          severity: "success",
        });

        setTimeout(() => {
          history.push("/login");
        }, 3000);

        e.target.reset();
      })
      .catch((error) => {
        setMessage({
          data: error.response.data.error,
          severity: "error",
        });
      });
  };

  return (
    <Container maxWidth="sm">
      {message && <Alert severity={message.severity}>{message.data}</Alert>}

      <Box
        component="form"
        onSubmit={handleSubmit(submitHandler)}
        noValidate
        autoComplete="off"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h1" component="div">
          User Registration
        </Typography>
        <Controller
          name="username"
          control={control}
          defaultValue={""}
          rules={{
            required: {
              value: true,
              message: "Please enter a username.",
            },
            minLength: {
              value: 3,
              message: "Username should contain at least 3 characters.",
            },
            maxLength: {
              value: 30,
              message: "Username should have a maximum of 30 characters.",
            },
            pattern: {
              value: /^[a-zA-Z0-9_-]{3,30}$/,
              message:
                "Username should contain letters, numbers, underscore, and dash only.",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              sx={{ mb: 3 }}
              error={errors.username ? true : false}
              helperText={errors.username ? errors.username.message : ""}
              variant="outlined"
              label="Username"
              id="username"
              type="text"
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          defaultValue={""}
          rules={{
            required: {
              value: true,
              message: "Please enter a password.",
            },
            minLength: {
              value: 6,
              message: "Password should contain at least 6 characters.",
            },
            maxLength: {
              value: 128,
              message: "Password should have a maximum of 128 characters.",
            },
            pattern: {
              value:
                /^\S*(?=\S{6,128})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/,
              message:
                "Password should contain at least 1 upper case English letter, 1 lower case English letter, and 1 special character.",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              sx={{ mb: 3 }}
              error={errors.password ? true : false}
              helperText={errors.password ? errors.password.message : ""}
              variant="outlined"
              label="Password"
              id="password"
              type="password"
            />
          )}
        />
        <Button
          disableElevation
          variant="contained"
          type="submit"
          sx={{ px: 10, mb: 5 }}
        >
          Submit
        </Button>
        <Typography variant="h6" component="div">
          <Link to="/login" style={{ color: "black", textDecoration: "none" }}>
            Cancel
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Register;
