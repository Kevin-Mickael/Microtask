import React, { useState } from "react";
import TasksFilter from "./TasksFilter";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Chart from "./Chart";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Tooltip from "@mui/material/Tooltip";
import { useSelector } from "react-redux";

const TasksSummary = (props) => {
  const [open, setOpen] = useState(false);
  const authUser = useSelector((state) => state.auth);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteHandler = () => {
    props.onDeleteAll();
    handleClose();
  };

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
  const isDisabled =
    authUser.username === "admin" && props.selectedUser !== authUser.userid;

  return (
    <>
      <Box sx={{ flexGrow: 1, m: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={2}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Typography variant="subtitle1" component="div">
                {`Total tasks: ${sumTasks}`}
              </Typography>
              <Typography variant="subtitle1" component="div">
                {`Total hours: ${sumHours.toFixed(2)}`}
              </Typography>
            </Box>
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
              <Tooltip title="Delete all tasks">
                <Button
                  disabled={isDisabled}
                  disableElevation
                  variant="outlined"
                  onClick={handleClickOpen}
                  color="error"
                >
                  Delete All
                </Button>
              </Tooltip>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  Confirm deleting all tasks?
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    <Typography variant="body1" color="error" component="span">
                      This action is not reversible.
                    </Typography>
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="warning">
                    Cancel
                  </Button>
                  <Button onClick={deleteHandler} autoFocus color="warning">
                    Yes
                  </Button>
                </DialogActions>
              </Dialog>
            </Stack>
          </Grid>
        </Grid>
      </Box>
      <Divider />
    </>
  );
};

export default TasksSummary;
