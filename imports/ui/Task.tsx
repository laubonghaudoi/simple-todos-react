import { Meteor } from "meteor/meteor";
import React from "react";
import { TaskInterface } from "../db/TasksCollection";

const toggleChecked = (task: TaskInterface) => {
  Meteor.call("tasks.setIsChecked", task._id, !task.isChecked);
};

const deleteTask = (task: TaskInterface) =>
  Meteor.call("tasks.remove", task._id);
  
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
