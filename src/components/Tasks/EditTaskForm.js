import React from "react";
import moment from "moment";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { useForm, Controller } from "react-hook-form";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

const EditTaskForm = (props) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const submitHandler = (data) => {
    const taskData = {
      type: data.taskType,
      minute: data.taskMinute,
      second: data.taskSecond,
      count: data.taskCount,
    };

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
        <Controller
          control={control}
          name="taskType"
          defaultValue={props.type}
          rules={{
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
          }}
          render={({ field: { ref, onChange, value, ...field } }) => (
            <Autocomplete
              {...field}
              onChange={(e, v) => onChange(v)}
              value={value}
              id="taskType"
              fullWidth
              freeSolo
              size="small"
              options={props.types.map((option) => option.type)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  inputRef={ref}
                  onChange={onChange}
                  value={value}
                  label="Edit task"
                  variant="standard"
                  error={errors.taskType ? true : false}
                  helperText={errors.taskType ? errors.taskType.message : ""}
                />
              )}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <Box display="flex" justifyContent="flex-end">
          <Controller
            name="taskMinute"
            control={control}
            defaultValue={props.minute}
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
                error={errors.taskMinute ? true : false}
                helperText={errors.taskMinute ? errors.taskMinute.message : ""}
                id="taskMinute"
                label="Minute"
                type="number"
                size="small"
                variant="standard"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{ min: 0 }}
                fullWidth
              />
            )}
          />
          <Controller
            name="taskSecond"
            control={control}
            defaultValue={props.second}
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
                error={errors.taskSecond ? true : false}
                helperText={errors.taskSecond ? errors.taskSecond.message : ""}
                id="taskSecond"
                label="Second"
                type="number"
                size="small"
                variant="standard"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{ min: 0, max: 59 }}
                fullWidth
              />
            )}
          />

          <Controller
            name="taskCount"
            control={control}
            defaultValue={props.count}
            rules={{
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
            }}
            render={({ field }) => (
              <TextField
                {...field}
                error={errors.taskCount ? true : false}
                helperText={errors.taskCount ? errors.taskCount.message : ""}
                id="taskCount"
                label="Count"
                type="number"
                size="small"
                variant="standard"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{ min: 1 }}
                fullWidth
              />
            )}
          />
          <Tooltip title="Confirm edit">
            <IconButton
              color="success"
              aria-label="Confirm edit"
              component="button"
              type="submit"
            >
              <DoneIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Cancel edit">
            <IconButton
              color="error"
              aria-label="Cancel edit"
              component="button"
              onClick={props.onClose}
            >
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Grid>
    </Grid>
  );
};
export default EditTaskForm;
