import React, { useState, useEffect, useCallback } from "react";
import useTimer from "easytimer-react-hook";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useForm, Controller } from "react-hook-form";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import Backdrop from "@mui/material/Backdrop";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

const TasksTimer = (props) => {
  const [checked, setChecked] = useState(true);
  const [timer] = useTimer({
    countdown: true,
  });
  const {
    handleSubmit,
    formState: { errors },
    control,
    getValues,
  } = useForm();

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const clearTimer = useCallback(() => {
    timer.stop();
    timer.removeAllEventListeners();
  }, [timer]);

  const notifyUser = useCallback(() => {
    setOpen(true);
  }, []);

  useEffect(() => {
    if (
      checked &&
      (props.submittedMinute !== 0 || props.submittedSecond !== 0)
    ) {
      clearTimer();

      timer.start({
        countdown: true,
        startValues: {
          minutes: props.submittedMinute,
          seconds: props.submittedSecond,
        },
      });

      timer.addEventListener("targetAchieved", () => {
        notifyUser();
      });
    }
  }, [
    timer,
    checked,
    props.submittedMinute,
    props.submittedSecond,
    props.submittedId,
    clearTimer,
    notifyUser,
  ]);

  const startTimer = () => {
    if (
      checked &&
      (props.submittedMinute !== 0 || props.submittedSecond !== 0)
    ) {
      clearTimer();
      timer.start({
        countdown: true,
        startValues: {
          minutes: props.submittedMinute,
          seconds: props.submittedSecond,
        },
      });
      timer.addEventListener("targetAchieved", () => {
        notifyUser();
      });
    } else if (
      getValues("timerMinute") !== 0 ||
      getValues("timerSecond") !== 0
    ) {
      clearTimer();
      timer.start({
        countdown: true,
        startValues: {
          minutes: getValues("timerMinute"),
          seconds: getValues("timerSecond"),
        },
      });
      timer.addEventListener("targetAchieved", () => {
        notifyUser();
      });
    }
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  useEffect(() => {
    if (!checked) {
      clearTimer();
    }
  }, [checked, clearTimer]);

  const submitHandler = (data) => {
    clearTimer();
    timer.start({
      countdown: true,
      startValues: {
        minutes: parseInt(data.timerMinute),
        seconds: parseInt(data.timerSecond),
      },
    });
    timer.addEventListener("targetAchieved", () => {
      notifyUser();
    });
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ flexDirection: { xs: "column", md: "row" } }}
      >
        <Box display="flex" justifyContent="center" alignItems="center">
          <IconButton
            color="success"
            aria-label="Start timer"
            component="button"
            onClick={startTimer}
            sx={{ p: 0 }}
          >
            <Tooltip title="Start timer">
              <PlayCircleIcon />
            </Tooltip>
          </IconButton>
          <IconButton
            color="warning"
            aria-label="Pause timer"
            component="button"
            onClick={timer.pause}
            sx={{ p: 0 }}
          >
            <Tooltip title="Pause timer">
              <PauseCircleIcon />
            </Tooltip>
          </IconButton>
          <IconButton
            color="error"
            aria-label="Stop timer"
            component="button"
            onClick={timer.stop}
            sx={{ p: 0 }}
          >
            <Tooltip title="Stop timer">
              <StopCircleIcon />
            </Tooltip>
          </IconButton>
          <IconButton
            color="secondary"
            aria-label="Reset timer"
            component="button"
            onClick={timer.reset}
            sx={{ p: 0 }}
          >
            <Tooltip title="Reset timer">
              <RestartAltIcon />
            </Tooltip>
          </IconButton>
          <Typography variant="h2" sx={{ display: "inline-block", px: 2 }}>
            {timer.getTimeValues().toString(["minutes", "seconds"])}
          </Typography>
        </Box>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(submitHandler)}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Controller
            name="timerMinute"
            control={control}
            defaultValue={0}
            rules={{
              required: {
                value: true,
                message: "Required.",
              },
              min: {
                value: 0,
                message: "Should be >= 0.",
              },
              max: {
                value: 1440,
                message: "Should be <= 1440.",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                error={errors.timerMinute ? true : false}
                helperText={
                  errors.timerMinute ? errors.timerMinute.message : ""
                }
                id="timerMinute"
                label="Minute"
                type="number"
                size="small"
                variant="standard"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{ min: 0 }}
                sx={{ width: 60 }}
                disabled={checked}
              />
            )}
          />
          <Controller
            name="timerSecond"
            control={control}
            defaultValue={0}
            rules={{
              required: {
                value: true,
                message: "Required.",
              },
              min: {
                value: 0,
                message: "Should be >= 0.",
              },
              max: {
                value: 59,
                message: "Should be <= 59.",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                error={errors.timerSecond ? true : false}
                helperText={
                  errors.timerSecond ? errors.timerSecond.message : ""
                }
                id="timerSecond"
                label="Second"
                type="number"
                size="small"
                variant="standard"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{ min: 0, max: 59 }}
                sx={{ width: 60 }}
                disabled={checked}
              />
            )}
          />
          <IconButton
            color="success"
            aria-label="Set time"
            component="button"
            type="submit"
            disabled={checked}
          >
            <Tooltip title="Set time">
              <TimerOutlinedIcon />
            </Tooltip>
          </IconButton>
          <FormGroup sx={{ display: "inline-block", px: 1 }}>
            <FormControlLabel
              control={<Switch checked={checked} onChange={handleChange} />}
              label="Autostart"
            />
          </FormGroup>
        </Box>
      </Box>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <NotificationsActiveIcon fontSize="large" />
          <Typography variant="h2">Time for another task!</Typography>
        </Box>
      </Backdrop>
    </>
  );
};

export default TasksTimer;
