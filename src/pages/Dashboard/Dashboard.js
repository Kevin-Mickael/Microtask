import React, { useState, useEffect, useCallback } from "react";
import Tasks from "../../components/Tasks/Tasks";
import config from "../../config";
import Typography from "@mui/material/Typography";

const axios = require("axios");

const Dashboard = (props) => {
  const [error, setError] = useState(null);

  const { userHandler } = props;

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
        userHandler(data.user.username, data.user.id);
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      });
  }, [userHandler]);

  useEffect(() => {
    getUserHandler();
  }, [getUserHandler]);

  return (
    <div>
      <Tasks user={props.user} />
      {error && (
        <Typography variant="h2" align="center">
          {error}
        </Typography>
      )}
    </div>
  );
};

export default Dashboard;
