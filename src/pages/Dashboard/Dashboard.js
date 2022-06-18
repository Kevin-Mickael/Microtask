import React, { useState, useEffect, useCallback } from "react";
import Tasks from "../../components/Tasks/Tasks";
import config from "../../config";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";

const axios = require("axios");

const Dashboard = (props) => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const getUserHandler = useCallback(() => {
    setError(null);

    axios
      .get(`${config.baseUrl}/dashboard`, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        const data = response.data.data;

        dispatch(
          authActions.login({
            username: data.user.username,
            userid: data.user.id,
          })
        );
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      });
  }, [dispatch]);

  useEffect(() => {
    getUserHandler();
  }, [getUserHandler]);

  return (
    <div>
      <Tasks />
      {error && (
        <Typography variant="h2" align="center">
          {error}
        </Typography>
      )}
    </div>
  );
};

export default Dashboard;
