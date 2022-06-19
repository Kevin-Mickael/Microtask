import React, { useState } from "react";
import EditTaskForm from "./EditTaskForm";
import moment from "moment";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Tooltip from "@mui/material/Tooltip";
import { useSelector } from "react-redux";

// Add leading zero
const zeroPad = (num, places) => String(num).padStart(places, "0");

const TaskItem = (props) => {
  const authUser = useSelector((state) => state.auth);
  // Should be disabled if admin browses others' tasks
  const isDisabled =
    authUser.username === "admin" && props.selectedUser !== authUser.userid;

  const [edit, setEdit] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
            disabled={isDisabled}
            color="warning"
            aria-label="Edit task"
            component="button"
            onClick={editHandler}
          >
            <Tooltip title="Edit task">
              <EditOutlinedIcon />
            </Tooltip>
          </IconButton>
          <IconButton
            disabled={isDisabled}
            color="error"
            aria-label="Delete task"
            component="button"
            onClick={handleClickOpen}
          >
            <Tooltip title="Delete task">
              <DeleteOutlineOutlinedIcon />
            </Tooltip>
          </IconButton>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              Confirm deleting this task?
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Date: {moment(props.date).format("MMMM Do YYYY, h:mm:ss a")}{" "}
                <br />
                Task: {props.type} <br />
                Time: {`${props.minute}:${zeroPad(props.second, 2)}`} <br />
                Count: {props.count} <br />
                <Typography variant="body1" color="error" component="span">
                  This action is not reversible.
                </Typography>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={deleteHandler} autoFocus>
                Yes
              </Button>
              <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </ListItem>
  );
};

export default TaskItem;
