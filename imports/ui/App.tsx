import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Task } from "./Task";
import { TaskInterface, TasksCollection } from "/imports/api/TasksCollection";
import { TaskForm } from "./TaskForm";


export const App = () => {
  const tasks = useTracker(() =>
    TasksCollection.find({}, { sort: { createdAt: -1 } }).fetch()
  );

  return (
    <div>
      <h1>Welcome to Meteor!</h1>
      <TaskForm />
      <ul>
        {tasks.map((task: TaskInterface) => (
          <Task key={task._id} task={task} />
        ))}
      </ul>
    </div>
  );
};
