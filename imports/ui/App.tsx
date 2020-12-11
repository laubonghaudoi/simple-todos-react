import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Task } from "./Task";
import { TaskInterface, TasksCollection } from "/imports/api/TasksCollection";
import { TaskForm } from "./TaskForm";
import { Info } from "./Info";

export const App = () => {
  const tasks = useTracker(() =>
    TasksCollection.find({}, { sort: { createdAt: -1 } }).fetch()
  );

  return (
    <div className="app">
      <header>
        <div className="app-bar">
          <div className="app-header">
            <h1>📝️ To Do List</h1>
          </div>
        </div>
      </header>
      <div className="main">
        <TaskForm />
        <ul className="tasks">
          {tasks.map((task: TaskInterface) => (
            <Task task={task} />
          ))}
        </ul>
      </div>
    </div>
  );
};
