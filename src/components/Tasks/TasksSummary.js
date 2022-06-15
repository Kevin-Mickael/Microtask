import React from "react";
import TasksFilter from "./TasksFilter";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Chart from "./Chart";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const TasksSummary = (props) => {
  let sumTasks = 0;
  let sumMinutes = 0;
  let sumSeconds = 0;
  let sumHours = 0;

  for (let i = 0; i < props.items.length; i++) {
    sumTasks += parseInt(props.items[i].count);
    sumMinutes +=
      parseInt(props.items[i].minute) * parseInt(props.items[i].count);
    sumSeconds +=
      parseInt(props.items[i].second) * parseInt(props.items[i].count);
  }

  sumHours += (sumMinutes * 60 + sumSeconds) / 60 / 60;

  // Delete all should be disabled if admin browses others' tasks
  const isDisabled = props.user.username === "admin" && props.selectedUser !== props.user.userid;

  return (
    <>
      <Box sx={{ flexGrow: 1, m: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={2}>
            <Typography variant="body1" component="div">
              {`Total tasks: ${sumTasks}`}
            </Typography>
            <Typography variant="body1" component="div">
              {`Total hours: ${sumHours.toFixed(2)}`}
            </Typography>
          </Grid>

          <Grid item xs={12} md={8}>
            <Chart items={props.items} />
          </Grid>

          <Grid item xs={12} md={2}>
            <Stack direction="column" spacing={2}>
              <TasksFilter
                label="Start date"
                selected={props.filteredStartDate}
                onChangeFilter={props.onFilterStartDateChange}
              />
              <TasksFilter
                label="End date"
                selected={props.filteredEndDate}
                onChangeFilter={props.onFilterEndDateChange}
              />
              <Button
                disabled={isDisabled}
                disableElevation
                variant="contained"
                onClick={props.onDeleteAll}
                sx={{ color: "white", borderRadius: 0 }}
              >
                Delete All
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
      <Divider />
    </>
  );
};

export default TasksSummary;
