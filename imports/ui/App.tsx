import React, { useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Task } from "./Task";
import { TaskInterface, TasksCollection } from "/imports/api/TasksCollection";
import { TaskForm } from "./TaskForm";

export const App = () => {
  const [hideCompleted, setHideCompleted] = useState<boolean>(false);

  const hideCompletedFilter = { isChecked: { $ne: true } };

  const tasks = useTracker(() =>
    TasksCollection.find(hideCompleted ? hideCompletedFilter : {}, {
      sort: { createdAt: -1 },
    }).fetch()
  );

  const pendingTasksCount = useTracker(() =>
    TasksCollection.find(hideCompletedFilter).count()
  );

  const pendingTasksTitle = `${
    pendingTasksCount ? ` (${pendingTasksCount})` : ""
  }`;

  return (
    <div className="app">
      <header>
        <div className="app-bar">
          <div className="app-header">
            <h1>📝️ To Do List{pendingTasksTitle}</h1>
          </div>
        </div>
      </header>
      <div className="main">
        <TaskForm />
        <div className="filter">
          <button onClick={() => setHideCompleted(!hideCompleted)}>
            {hideCompleted ? "Show All" : "Hide Completed"}
          </button>
        </div>
        <ul className="tasks">
          {tasks.map((task: TaskInterface) => (
            <Task task={task} />
          ))}
        </ul>
      </div>
    </div>
  );
};
