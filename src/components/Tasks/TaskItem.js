import React from "react";
import moment from "moment";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

// Add leading zero
const zeroPad = (num, places) => String(num).padStart(places, "0");

const TaskItem = (props) => {
  const deleteHandler = () => {
    props.onDelete(props.id);
  };

  return (
    <ListItem divider>
      <ListItemText
        primary={moment(props.date).format("MMMM Do YYYY, h:mm:ss a")}
        secondary={props.type}
      />
      <Typography variant="body2" component="div">
        {`${props.minute}:${zeroPad(props.second, 2)} Count: ${props.count}`}
      </Typography>
      <Button type="button" onClick={deleteHandler}>
        <DeleteForeverIcon />
      </Button>
    </ListItem>
  );
};

export default TaskItem;
