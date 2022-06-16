import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import Stack from "@mui/material/Stack";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import { useForm } from "react-hook-form";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";

const TaskForm = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [enteredType, setEnteredType] = useState("");
  const [enteredMinute, setEnteredMinute] = useState("");
  const [enteredSecond, setEnteredSecond] = useState("");
  const [enteredCount, setEnteredCount] = useState("");

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
      date: new Date(),
      type: enteredType,
      minute: enteredMinute,
      second: enteredSecond,
      count: enteredCount,
    };

    console.log(taskData);

    props.onSaveTaskData(taskData);
  };

  const saveTypeDataHandler = () => {
    const typeData = {
      type: enteredType,
    };
    props.onAddType(typeData);
  };

  const deleteTypeDataHandler = () => {
    props.onDeleteTypeData(enteredType);
    setEnteredType("");
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
      <Grid item xs={12} md={8}>
        <Stack direction="row" spacing={0}>
          <Autocomplete
            id="taskType"
            name="taskType"
            fullWidth
            freeSolo
            options={props.types.map((option) => option.type)}
            value={enteredType}
            onInputChange={typeChangeHandler}
            renderInput={(params) => (
              <TextField
                {...params}
                label="What task are you working on?"
                variant="filled"
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
          <IconButton
            color="secondary"
            aria-label="Add type"
            component="button"
            onClick={saveTypeDataHandler}
          >
            <BookmarkAddIcon fontSize="large" />
          </IconButton>

          <IconButton
            color="secondary"
            aria-label="Remove type"
            component="button"
            onClick={deleteTypeDataHandler}
          >
            <BookmarkRemoveIcon fontSize="large" />
          </IconButton>
        </Stack>
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
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{ min: 0 }}
            variant="filled"
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
            InputLabelProps={{
              shrink: true,
            }}
            variant="filled"
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
            InputLabelProps={{
              shrink: true,
            }}
            variant="filled"
            fullWidth
            value={enteredCount}
            onChange={countChangeHandler}
          />
          <IconButton
            color="success"
            aria-label="Add task"
            component="button"
            type="submit"
          >
            <AddCircleOutlinedIcon fontSize="large" />
          </IconButton>
        </Box>
      </Grid>
    </Grid>
  );
};

export default TaskForm;
