import React from "react";
import TaskItem from "./TaskItem";
import List from "@mui/material/List";

const TasksList = (props) => {
  return (
    <div>
      <List>
        {props.items.map((task) => (
          <TaskItem
            key={task.id}
            id={task.id}
            date={task.date}
            type={task.type}
            minute={task.minute}
            second={task.second}
            count={task.count}
            onDelete={props.onDeleteItem}
          />
        ))}
      </List>
    </div>
  );
};

export default TasksList;
