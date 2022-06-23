import React, { useState, useEffect } from "react";
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
import Stack from "@mui/material/Stack";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";

const TasksTimer = (props) => {
  const [checked, setChecked] = useState(true);
  const [timer, isTargetAchieved] = useTimer({
    countdown: true,
    updateWhenTargetAchieved: true,
  });
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  useEffect(() => {
    if (
      checked &&
      (props.submittedMinute !== 0 || props.submittedSecond !== 0)
    ) {
      if (timer.isRunning) {
        timer.stop();
      }
      timer.start({
        countdown: true,
        startValues: {
          minutes: props.submittedMinute,
          seconds: props.submittedSecond,
        },
      });
    }
  }, [
    timer,
    checked,
    props.submittedMinute,
    props.submittedSecond,
    props.submittedId,
  ]);

  const showNotification = () => {
    const notification = new Notification("Time is up", {
      body: "It is time for another task",
    });

    notification.addEventListener("click", () => {
      notification.close();
    });
  };

  const notifyUser = () => {
    // https://developer.mozilla.org/en-US/docs/Web/API/notification

    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
      showNotification();
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {
          showNotification();
        }
      });
    }
  };

  const startTimer = () => {
    timer.start();
  };
  const pauseTimer = () => {
    timer.pause();
  };
  const stopTimer = () => {
    timer.stop();
  };
  const resetTimer = () => {
    timer.reset();
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const submitHandler = (data) => {
    timer.stop();
    timer.start({
      countdown: true,
      startValues: {
        minutes: parseInt(data.timerMinute),
        seconds: parseInt(data.timerSecond),
      },
    });
  };

  if (isTargetAchieved) {
    notifyUser();
  }

  return (
    <>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Box display="flex" justifyContent="center" alignItems="center">
          <Typography variant="h2" sx={{ display: "inline-block" }}>
            {timer.getTimeValues().toString(["minutes", "seconds"])}
          </Typography>
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
            onClick={pauseTimer}
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
            onClick={stopTimer}
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
            onClick={resetTimer}
            sx={{ p: 0 }}
          >
            <Tooltip title="Reset timer">
              <RestartAltIcon />
            </Tooltip>
          </IconButton>
        </Box>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(submitHandler)}
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
          <Tooltip title="Confirm time">
            <IconButton
              color="success"
              aria-label="Confirm time"
              component="button"
              type="submit"
              disabled={checked}
            >
              <TimerOutlinedIcon />
            </IconButton>
          </Tooltip>
          <FormGroup sx={{ display: "inline-block" }}>
            <FormControlLabel
              control={<Switch checked={checked} onChange={handleChange} />}
              label="Autostart"
            />
          </FormGroup>
        </Box>
      </Stack>
    </>
  );
};

export default TasksTimer;
