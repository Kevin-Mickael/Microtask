import React from 'react';
// import { v4 as uuidv4 } from 'uuid';
import TaskForm from './TaskForm';

const NewTask = (props) => {
  const saveTaskDataHandler = (enteredTaskData) => {
    const taskData = {
      ...enteredTaskData
    };
    props.onAddTask(taskData);
  };

  return (
    <div>
      <TaskForm onSaveTaskData={saveTaskDataHandler}/>
    </div>
  );
};

export default NewTask;
