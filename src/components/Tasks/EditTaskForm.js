import React, { useState } from "react";
import moment from "moment";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";

const EditTaskForm = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [enteredType, setEnteredType] = useState(props.type);
  const [enteredMinute, setEnteredMinute] = useState(props.minute);
  const [enteredSecond, setEnteredSecond] = useState(props.second);
  const [enteredCount, setEnteredCount] = useState(props.count);

  const typeChangeHandler = (event, values) => {
    setEnteredType(values);
  };

  const minuteChangeHandler = (event) => {
    setEnteredMinute(event.target.value);
  };

  const secondChangeHandler = (event) => {
    setEnteredSecond(event.target.value);
  };

  const countChangeHandler = (event) => {
    setEnteredCount(event.target.value);
  };

  const submitHandler = () => {
    const taskData = {
      type: enteredType,
      minute: enteredMinute,
      second: enteredSecond,
      count: enteredCount,
    };

    console.log(props.id);
    console.log(taskData);

    props.onUpdate(props.id, taskData);

    props.onClose();
  };

  return (
    <Grid
      container
      spacing={0}
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(submitHandler)}
    >
      <Grid item xs={12}>
        <Typography variant="body1" component="div" xs={{ display: "block" }}>
          {moment(props.date).format("MMMM Do YYYY, h:mm:ss a")}
        </Typography>
      </Grid>
      <Grid item xs={12} md={8}>
        <Autocomplete
          id="taskType"
          name="taskType"
          fullWidth
          freeSolo
          size="small"
          options={props.types.map((option) => option.type)}
          value={enteredType}
          onInputChange={typeChangeHandler}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Edit task"
              variant="standard"
              error={errors.taskType ? true : false}
              helperText={errors.taskType ? errors.taskType.message : ""}
              {...register("taskType", {
                required: {
                  value: true,
                  message: "Required.",
                },
                minLength: {
                  value: 1,
                  message: "Required.",
                },
                maxLength: {
                  value: 128,
                  message: "Maximum 128 characters.",
                },
              })}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <Box display="flex" justifyContent="flex-end">
          <TextField
            error={errors.taskMinute ? true : false}
            helperText={errors.taskMinute ? errors.taskMinute.message : ""}
            {...register("taskMinute", {
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
            })}
            id="taskMinute"
            name="taskMinute"
            label="Minute"
            type="number"
            size="small"
            variant="standard"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{ min: 0 }}
            fullWidth
            value={enteredMinute}
            onChange={minuteChangeHandler}
          />
          <TextField
            error={errors.taskSecond ? true : false}
            helperText={errors.taskSecond ? errors.taskSecond.message : ""}
            {...register("taskSecond", {
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
            })}
            id="taskSecond"
            name="taskSecond"
            label="Second"
            type="number"
            size="small"
            variant="standard"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{ min: 0, max: 60 }}
            fullWidth
            value={enteredSecond}
            onChange={secondChangeHandler}
          />
          <TextField
            error={errors.taskCount ? true : false}
            helperText={errors.taskCount ? errors.taskCount.message : ""}
            {...register("taskCount", {
              required: {
                value: true,
                message: "Required.",
              },
              min: {
                value: 1,
                message: "Should be >= 1.",
              },
              max: {
                value: 1000,
                message: "Should be <= 1000.",
              },
            })}
            id="taskCount"
            name="taskCount"
            label="Count"
            type="number"
            size="small"
            variant="standard"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{ min: 0 }}
            fullWidth
            value={enteredCount}
            onChange={countChangeHandler}
          />

          <IconButton
            color="success"
            aria-label="Confirm edit"
            component="button"
            type="submit"
          >
            <DoneIcon />
          </IconButton>

          <IconButton
            color="error"
            aria-label="Cancel edit"
            component="button"
            onClick={props.onClose}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </Grid>
    </Grid>
  );
};
export default EditTaskForm;
