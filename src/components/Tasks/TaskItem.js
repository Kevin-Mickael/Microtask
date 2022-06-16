import React, { useState } from "react";
import EditTaskForm from "./EditTaskForm";
import moment from "moment";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";

// Add leading zero
const zeroPad = (num, places) => String(num).padStart(places, "0");

const TaskItem = (props) => {
  const [edit, setEdit] = useState(false);

  const editHandler = () => {
    setEdit(true);
  };

  const closeHandler = () => {
    setEdit(false);
  };

  const deleteHandler = () => {
    props.onDelete(props.id);
  };

  return (
    <ListItem divider>
      {edit ? (
        <EditTaskForm
          id={props.id}
          date={props.date}
          type={props.type}
          minute={props.minute}
          second={props.second}
          count={props.count}
          onUpdate={props.onUpdate}
          onClose={closeHandler}
          types={props.types}
        />
      ) : (
        <>
          <ListItemText
            primary={moment(props.date).format("MMMM Do YYYY, h:mm:ss a")}
            secondary={props.type}
          />
          <Typography variant="body2" component="div">
            {`${props.minute}:${zeroPad(props.second, 2)} Count: ${
              props.count
            }`}
          </Typography>
          <IconButton
            color="secondary"
            aria-label="Edit task"
            component="button"
            onClick={editHandler}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            aria-label="Delete task"
            component="button"
            onClick={deleteHandler}
          >
            <DeleteForeverIcon />
          </IconButton>
        </>
      )}
    </ListItem>
  );
};

export default TaskItem;
