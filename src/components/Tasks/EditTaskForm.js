import React, { useState } from "react";
import moment from "moment";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";

const EditTaskForm = (props) => {
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

  const submitHandler = (event) => {
    event.preventDefault();

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
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end",
      }}
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={submitHandler}
    >
      <Box sx={{ width: "100%" }}>
        <Typography variant="body1" component="div">
          {moment(props.date).format("MMMM Do YYYY, h:mm:ss a")}
        </Typography>
        <Autocomplete
          sx={{ width: "100%" }}
          id="task-type"
          freeSolo
          size="small"
          options={props.types.map((option) => option.type)}
          value={enteredType}
          onInputChange={typeChangeHandler}
          renderInput={(params) => <TextField {...params} variant="standard" />}
        />
      </Box>
      <TextField
        id="task-minute"
        label="Minute"
        type="number"
        size="small"
        variant="standard"
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{ min: 0 }}
        sx={{ width: "8rem" }}
        value={enteredMinute}
        onChange={minuteChangeHandler}
      />
      <TextField
        id="task-second"
        label="Second"
        type="number"
        size="small"
        variant="standard"
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{ min: 0, max: 60 }}
        sx={{ width: "8rem" }}
        value={enteredSecond}
        onChange={secondChangeHandler}
      />
      <TextField
        id="task-count"
        label="Count"
        type="number"
        size="small"
        variant="standard"
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{ min: 0 }}
        sx={{ width: "8rem" }}
        value={enteredCount}
        onChange={countChangeHandler}
      />
      <Button
        disableElevation
        type="submit"
        sx={{ color: "green", minWidth: "24px" }}
      >
        <DoneIcon />
      </Button>
      <Button
        disableElevation
        type="button"
        sx={{
          color: "red",
          minWidth: "24px",
        }}
        onClick={props.onClose}
      >
        <CloseIcon />
      </Button>
    </Box>
  );
};
export default EditTaskForm;
