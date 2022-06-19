import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import Stack from "@mui/material/Stack";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import { useForm, Controller } from "react-hook-form";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

const TaskForm = (props) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    getValues,
  } = useForm();

  const submitHandler = (data) => {
    const taskData = {
      date: new Date(),
      type: data.taskType,
      minute: data.taskMinute,
      second: data.taskSecond,
      count: data.taskCount,
    };

    props.onSaveTaskData(taskData);
  };

  const saveTypeDataHandler = () => {
    const enteredType = getValues("taskType").trim();

    const typeData = {
      type: enteredType,
    };
    props.onAddType(typeData);
  };

  const deleteTypeDataHandler = () => {
    props.onDeleteTypeData(getValues("taskType").trim());
    setValue("taskType", "");
  };

  let options = [];
  if (props.types !== undefined) {
    options = props.types.map((option) => option.type);
  }

  return (
    <Grid
      container
      spacing={0}
      component="form"
      autoComplete="off"
      onSubmit={handleSubmit(submitHandler)}
      noValidate
      sx={{ px: 1 }}
    >
      <Grid item xs={12} md={8}>
        <Stack direction="row" spacing={0}>
          <Controller
            control={control}
            name="taskType"
            defaultValue=""
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
                sx={{ m: 1 }}
                freeSolo
                options={options}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    inputRef={ref}
                    onChange={onChange}
                    value={value}
                    label="What task are you working on?"
                    variant="outlined"
                    error={errors.taskType ? true : false}
                    helperText={errors.taskType ? errors.taskType.message : ""}
                  />
                )}
              />
            )}
          />

          <Tooltip title="Save task type">
            <IconButton
              color="secondary"
              aria-label="Add type"
              component="button"
              onClick={saveTypeDataHandler}
              tabIndex={-1}
            >
              <BookmarkAddIcon fontSize="large" sx={{ p: 1 }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete task type">
            <IconButton
              color="secondary"
              aria-label="Remove type"
              component="button"
              onClick={deleteTypeDataHandler}
              tabIndex={-1}
            >
              <BookmarkRemoveIcon fontSize="large" sx={{ p: 1 }} />
            </IconButton>
          </Tooltip>
        </Stack>
      </Grid>
      <Grid item xs={12} md={4}>
        <Box display="flex" justifyContent="flex-end">
          <Controller
            name="taskMinute"
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
                error={errors.taskMinute ? true : false}
                helperText={errors.taskMinute ? errors.taskMinute.message : ""}
                id="taskMinute"
                label="Minute"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{ min: 0 }}
                variant="outlined"
                fullWidth
                sx={{ m: 1 }}
              />
            )}
          />

          <Controller
            name="taskSecond"
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
                error={errors.taskSecond ? true : false}
                helperText={errors.taskSecond ? errors.taskSecond.message : ""}
                id="taskSecond"
                label="Second"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{ min: 0, max: 59 }}
                variant="outlined"
                fullWidth
                sx={{ m: 1 }}
              />
            )}
          />

          <Controller
            name="taskCount"
            control={control}
            defaultValue={1}
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
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{ min: 1 }}
                variant="outlined"
                fullWidth
                sx={{ m: 1 }}
              />
            )}
          />

          <Tooltip title="Submit task">
            <IconButton
              color="success"
              aria-label="Add task"
              component="button"
              type="submit"
            >
              <AddCircleOutlinedIcon sx={{ p: 1 }} fontSize="large" />
            </IconButton>
          </Tooltip>
        </Box>
      </Grid>
    </Grid>
  );
};

export default TaskForm;
