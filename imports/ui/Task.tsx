import React from "react";
import { TaskInterface, TasksCollection } from "/imports/api/TasksCollection";

const toggleChecked = (task: TaskInterface) => {
  TasksCollection.update(task._id, {
    $set: {
      isChecked: !task.isChecked,
    },
  });
};

const deleteTask = (task: TaskInterface) => TasksCollection.remove(task._id);

interface Props {
  task: TaskInterface;
}

export const Task = (props: Props) => {
  return (
    <li key={props.task._id} className="task">
      <input
        type="checkbox"
        checked={!!props.task.isChecked}
        onClick={() => toggleChecked(props.task)}
        readOnly
      />
      <span>{props.task.text}</span>
      <button onClick={() => deleteTask(props.task)}>&times;</button>
    </li>
  );
};
