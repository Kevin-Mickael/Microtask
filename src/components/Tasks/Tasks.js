import React, { useState, useEffect, useCallback } from "react";
import moment from "moment";
import NewTask from "../NewTask/NewTask";
import TasksList from "./TasksList";
import TasksSummary from "./TasksSummary";
import config from "../../config";
import Typography from "@mui/material/Typography";

const axios = require("axios");

const Tasks = (props) => {
  const [tasks, setTasks] = useState([]);
  const [types, setTypes] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(props.user.userid);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
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
    if (props.user.username === "admin") {
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
    if (props.user.username === "admin") {
      axios
        .get(`${config.baseUrl}/users`, {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response);
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
        });
    }
  }, [props.user.username]);

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
          console.log(TasksResponse.data, TypesResponse.data);

          // Handle TasksResponse
          console.log(TasksResponse.data);

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
          console.log(TypesResponse.data);

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
        console.log(response);

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
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addTypeHandler = (type) => {
    axios
      .post(`${config.baseUrl}/types`, type, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response);

        setTypes((prevTypes) => {
          const newTypes = [
            {
              id: response.data._id,
              type: response.data.type,
            },
            ...prevTypes,
          ];
          console.log(newTypes);
          // Sort by string
          newTypes.sort((a, b) => (a.type > b.type ? 1 : -1));
          console.log(newTypes);

          return newTypes;
        });
      })
      .catch((error) => {
        console.log(error);
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
        console.log(response);

        setTasks((prevTasks) => {
          const updatedTasks = prevTasks.filter((task) => task.id !== taskId);
          return updatedTasks;
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteTypeHandler = (type) => {
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
        console.log(response);

        setTypes((prevTypes) => {
          const updatedTypes = prevTypes.filter((item) => item.type !== type);
          console.log(updatedTypes);
          return updatedTypes;
        });
      })
      .catch((error) => {
        console.log(error);
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
        console.log(response);

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
      })
      .catch((error) => {
        console.log(error);
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
        console.log(response);

        setTasks((prevTasks) => {
          const updatedTasks = prevTasks.filter((task) => task.userid !== props.user.userid);
          return updatedTasks;
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let content = (
    <TasksList
      items={filteredTasks}
      types={types}
      onDeleteItem={deleteTaskHandler}
      onUpdateItem={updateTaskHandler}
      user={props.user}
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
    <div>
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
        user={props.user}
      />

      {content}
    </div>
  );
};

export default Tasks;
