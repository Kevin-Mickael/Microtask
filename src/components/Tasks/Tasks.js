import React, { useState, useEffect, useCallback } from "react";
import moment from "moment";
import NewTask from "../NewTask/NewTask";
import TasksList from "./TasksList";
import TasksSummary from "./TasksSummary";
import config from "../../config";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";

const axios = require("axios");

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={3} ref={ref} variant="filled" {...props} />;
});

const Tasks = (props) => {
  const authUser = useSelector((state) => state.auth);
  const [tasks, setTasks] = useState([]);
  const [types, setTypes] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(authUser.userid);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState({
    open: false,
    severity: "success",
    content: "",
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setMessage({ open: false, severity: "success", content: "" });
  };

  // Local date
  const [filteredStartDate, setFilteredStartDate] = useState(
    new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() - 6
    ).toLocaleDateString()
  );
  const [filteredEndDate, setFilteredEndDate] = useState(
    new Date().toLocaleDateString()
  );

  const filterStartDateChangeHandler = (selected) => {
    setFilteredStartDate(selected);
  };
  const filterEndDateChangeHandler = (selected) => {
    setFilteredEndDate(selected);
  };

  const selectUserHandler = (selectedUser) => {
    setSelectedUser(selectedUser);
  };

  const filteredTasks = tasks.filter((task) => {
    // Convert input dates to UTC as dates in database are stored as UTC dates
    const offset = moment().utcOffset();
    const start = moment(filteredStartDate, "MM/DD/YYYY").utcOffset(offset);
    const end = moment(filteredEndDate, "MM/DD/YYYY")
      .utcOffset(offset)
      .add(1, "days");

    // Check if user is admin
    if (authUser.username === "admin") {
      return (
        moment(task.date) >= start &&
        moment(task.date) < end &&
        task.userid === selectedUser
      );
    } else {
      return moment(task.date) >= start && moment(task.date) < end;
    }
  });

  const getUsersHandler = useCallback(() => {
    if (authUser.username === "admin") {
      axios
        .get(`${config.baseUrl}/users`, {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        })
        .then((response) => {
          const usersData = response.data;
          const loadedUsers = [];

          for (const key in usersData) {
            loadedUsers.push({
              id: usersData[key]._id,
              username: usersData[key].username,
            });
          }
          // Sort by string
          loadedUsers.sort((a, b) => (a.username > b.username ? 1 : -1));

          setUsers(loadedUsers);
        })
        .catch((error) => {
          console.log(error);
          setMessage({
            open: true,
            severity: "error",
            content: "Something went wrong.",
          });
        });
    }
  }, [authUser.username]);

  const getDataHandler = useCallback(() => {
    setIsLoading(true);
    setError(null);

    const requestTasks = axios.get(`${config.baseUrl}/tasks`, {
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    const requestTypes = axios.get(`${config.baseUrl}/types`, {
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    axios
      .all([requestTasks, requestTypes])
      .then(
        axios.spread((TasksResponse, TypesResponse) => {
          // Handle TasksResponse
          const tasksData = TasksResponse.data;
          const loadedTasks = [];

          for (const key in tasksData) {
            loadedTasks.push({
              id: tasksData[key]._id,
              date: tasksData[key].date,
              type: tasksData[key].type,
              minute: tasksData[key].minute,
              second: tasksData[key].second,
              count: tasksData[key].count,
              userid: tasksData[key].userid,
            });
          }

          // Sort by date in reverse order
          loadedTasks.reverse((a, b) => {
            return new Date(a.date) - new Date(b.date);
          });

          setTasks(loadedTasks);

          // Handle TypesResponse
          const typesData = TypesResponse.data;
          const loadedTypes = [];

          for (const key in typesData) {
            loadedTypes.push({
              id: typesData[key]._id,
              type: typesData[key].type,
            });
          }

          // Sort by type
          loadedTypes.sort((a, b) => (a.type > b.type ? 1 : -1));

          setTypes(loadedTypes);
        })
      )
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      });

    setIsLoading(false);
  }, []);

  useEffect(() => {
    getUsersHandler();
    getDataHandler();
  }, [getDataHandler, getUsersHandler]);

  const addTaskHandler = (task) => {
    axios
      .post(`${config.baseUrl}/tasks`, task, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setTasks((prevTasks) => {
          return [
            {
              id: response.data._id,
              date: response.data.date,
              type: response.data.type,
              minute: response.data.minute,
              second: response.data.second,
              count: response.data.count,
              userid: response.data.userid,
            },
            ...prevTasks,
          ];
        });

        setMessage({
          open: true,
          severity: "success",
          content: "New task added.",
        });
      })
      .catch((error) => {
        console.log(error);
        setMessage({
          open: true,
          severity: "error",
          content: "Something went wrong.",
        });
      });
  };

  const addTypeHandler = (type) => {
    // Do not submit if type is "" or null
    if (type.type === "" || type.type === null) {
      setMessage({
        open: true,
        severity: "error",
        content: "Please input task type.",
      });
      return;
    }

    // Extract type from types array
    const checkTypes = types.map((type) => type.type);

    // Do not submit if type exists
    if (checkTypes.includes(type.type)) {
      setMessage({
        open: true,
        severity: "error",
        content: "Type already exists.",
      });
      return;
    }

    axios
      .post(`${config.baseUrl}/types`, type, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setTypes((prevTypes) => {
          const newTypes = [
            {
              id: response.data._id,
              type: response.data.type,
            },
            ...prevTypes,
          ];
          // Sort by string
          newTypes.sort((a, b) => (a.type > b.type ? 1 : -1));

          return newTypes;
        });

        setMessage({
          open: true,
          severity: "success",
          content: "New task type added.",
        });
      })
      .catch((error) => {
        console.log(error);
        setMessage({
          open: true,
          severity: "error",
          content: "Something went wrong.",
        });
      });
  };

  const deleteTaskHandler = (taskId) => {
    axios
      .delete(`${config.baseUrl}/tasks/${taskId}`, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setTasks((prevTasks) => {
          const updatedTasks = prevTasks.filter((task) => task.id !== taskId);
          return updatedTasks;
        });

        setMessage({
          open: true,
          severity: "success",
          content: "Task deleted.",
        });
      })
      .catch((error) => {
        console.log(error);
        setMessage({
          open: true,
          severity: "error",
          content: "Something went wrong.",
        });
      });
  };

  const deleteTypeHandler = (type) => {
    // Do not submit if type is "" or null
    if (type === "" || type === null) {
      setMessage({
        open: true,
        severity: "error",
        content: "Please input task type.",
      });
      return;
    }

    axios
      .delete(`${config.baseUrl}/types`, {
        data: {
          type: type,
        },
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setTypes((prevTypes) => {
          const updatedTypes = prevTypes.filter((item) => item.type !== type);
          return updatedTypes;
        });

        setMessage({
          open: true,
          severity: "success",
          content: "Task type deleted.",
        });
      })
      .catch((error) => {
        console.log(error);
        setMessage({
          open: true,
          severity: "error",
          content: "Something went wrong.",
        });
      });
  };

  const updateTaskHandler = (taskId, taskData) => {
    axios
      .put(`${config.baseUrl}/tasks/${taskId}`, taskData, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setTasks((prevTasks) => {
          const updatedTasks = prevTasks.map((task) => {
            if (task.id === taskId) {
              return { ...task, ...taskData };
            } else {
              return task;
            }
          });
          return updatedTasks;
        });

        setMessage({
          open: true,
          severity: "success",
          content: "Task updated.",
        });
      })
      .catch((error) => {
        console.log(error);
        setMessage({
          open: true,
          severity: "error",
          content: "Something went wrong.",
        });
      });
  };

  const deleteAllHandler = () => {
    axios
      .delete(`${config.baseUrl}/tasks/`, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setTasks((prevTasks) => {
          const updatedTasks = prevTasks.filter(
            (task) => task.userid !== authUser.userid
          );
          return updatedTasks;
        });

        setMessage({
          open: true,
          severity: "success",
          content: "All tasks have been deleted.",
        });
      })
      .catch((error) => {
        console.log(error);
        setMessage({
          open: true,
          severity: "error",
          content: "Something went wrong.",
        });
      });
  };

  let content = (
    <TasksList
      items={filteredTasks}
      types={types}
      onDeleteItem={deleteTaskHandler}
      onUpdateItem={updateTaskHandler}
      users={users}
      onSelectUser={selectUserHandler}
    />
  );

  if (error) {
    content = (
      <Typography variant="h2" align="center">
        {error}
      </Typography>
    );
  }

  if (isLoading) {
    content = (
      <Typography variant="h2" align="center">
        Loading...
      </Typography>
    );
  }

  return (
    <Box>
      <NewTask
        onAddTask={addTaskHandler}
        types={types}
        onAddType={addTypeHandler}
        onDeleteType={deleteTypeHandler}
      />
      <TasksSummary
        items={filteredTasks}
        onDeleteAll={deleteAllHandler}
        filteredStartDate={filteredStartDate}
        filteredEndDate={filteredEndDate}
        onFilterStartDateChange={filterStartDateChangeHandler}
        onFilterEndDateChange={filterEndDateChangeHandler}
        selectedUser={selectedUser}
      />

      {content}

      <Snackbar
        open={message.open}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Alert
          onClose={handleClose}
          severity={message.severity}
          sx={{ width: "100%" }}
        >
          {message.content}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Tasks;
