import React from "react";
import { TaskInterface } from "/imports/api/TasksCollection";

interface Props {
  key: number | undefined;
  task: TaskInterface;
}

export const Task = (props: Props) => {
  return <li>{props.task.text}</li>;
};
