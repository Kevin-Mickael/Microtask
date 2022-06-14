import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import AddTaskIcon from "@mui/icons-material/AddTask";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";

const TaskForm = (props) => {
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

  const submitHandler = (event) => {
    event.preventDefault();

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
      type: enteredType
    };
    props.onAddType(typeData);
  };

  const deleteTypeDataHandler = () => {
    props.onDeleteTypeData(enteredType);
    setEnteredType("");
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={submitHandler}
    >
      <Stack direction="row" spacing={0}>
        <Autocomplete
          id="task-type"
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
            />
          )}
        />
        <Button
          disableElevation
          variant="outlined"
          color="secondary"
          sx={{ borderRadius: 0 }}
          onClick={saveTypeDataHandler}
        >
          <SaveIcon />
        </Button>
        <Button
          disableElevation
          variant="outlined"
          color="secondary"
          sx={{ borderRadius: 0 }}
          onClick={deleteTypeDataHandler}
        >
          <PlaylistRemoveIcon />
        </Button>
        <TextField
          id="task-minute"
          label="Minute"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{ min: 0 }}
          variant="filled"
          sx={{ width: "8rem" }}
          value={enteredMinute}
          onChange={minuteChangeHandler}
        />
        <TextField
          id="task-second"
          label="Second"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{ min: 0, max: 60 }}
          variant="filled"
          sx={{ width: "8rem" }}
          value={enteredSecond}
          onChange={secondChangeHandler}
        />
        <TextField
          id="task-count"
          label="Count"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{ min: 0 }}
          variant="filled"
          sx={{ width: "8rem" }}
          value={enteredCount}
          onChange={countChangeHandler}
        />
        <Button
          disableElevation
          variant="contained"
          color="secondary"
          type="submit"
          sx={{ borderRadius: 0 }}
        >
          <AddTaskIcon />
        </Button>
      </Stack>
    </Box>
  );
};

export default TaskForm;
