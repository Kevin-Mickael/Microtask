import React, { useEffect, useCallback } from "react";
import Tasks from "../../components/Tasks/Tasks";
import config from "../../config";

const axios = require("axios");

const Dashboard = (props) => {
  const { userHandler } = props;

  const getUserHandler = useCallback(() => {
    axios
      .get(`${config.baseUrl}/dashboard`, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        // console.log(response);
        const data = response.data.data;
        userHandler(data.user.username, data.user.id);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userHandler]);

  useEffect(() => {
    getUserHandler();
  }, [getUserHandler]);

  return (
    <div>
      <Tasks />
    </div>
  );
};

export default Dashboard;
