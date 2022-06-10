import React, { useState } from "react";
import EditTaskForm from "./EditTaskForm";
import moment from "moment";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";

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
          <Button
            type="button"
            color="secondary"
            sx={{ minWidth: "24px" }}
            onClick={editHandler}
          >
            <EditIcon />
          </Button>
          <Button
            type="button"
            color="secondary"
            onClick={deleteHandler}
            sx={{ minWidth: "24px" }}
          >
            <DeleteForeverIcon />
          </Button>
        </>
      )}
    </ListItem>
  );
};

export default TaskItem;