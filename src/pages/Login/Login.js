import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Link } from "react-router-dom";
import config from "../../config";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import taskImage from "../../images/completed_tasks.svg";

const axios = require("axios");

const Login = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const [message, setMessage] = useState();
  const history = useHistory();

  const submitHandler = (data, e) => {
    setMessage({
      data: "Login is in progress...",
      severity: "info",
    });

    axios
      .post(`${config.baseUrl}/user/login`, data)
      .then((response) => {
        const data = response.data.data;

        setMessage({
          data: "Logged in successfully, redirecting...",
          severity: "success",
        });

        localStorage.setItem("token", data.token);

        setTimeout(() => {
          history.push("/dashboard");
        }, 2000);

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
    <>
      {message && (
        <Alert severity={message.severity} sx={{ borderRadius: 0 }}>
          {message.data}
        </Alert>
      )}

      <Grid container spacing={0}>
        <Grid
          item
          md={7}
          sx={{
            display: { xs: "none", md: "block" },
          }}
        >
          <Box
            component="div"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h1" component="div" sx={{ m: 4 }}>
              Task tracking made simple.
            </Typography>
            <img
              src={taskImage}
              alt="Two people completing tasks."
              style={{ height: 400 }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
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
            <Typography variant="h2" component="div" sx={{ m: 3 }}>
              Welcome back
            </Typography>
            <Card
              variant="outlined"
              sx={{
                p: 3,
                minWidth: 250,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
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
                    message:
                      "Password should have a maximum of 128 characters.",
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
                fullWidth
                disableElevation
                variant="contained"
                type="submit"
              >
                Login
              </Button>
            </Card>
            <Typography variant="h3" component="div" sx={{ m: 3 }}>
              Don't have an account?
            </Typography>
            <Button
              disableElevation
              variant="contained"
              color="secondary"
              component={Link}
              to="/register"
              sx={{ px: 5 }}
            >
              Register
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
