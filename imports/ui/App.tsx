import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import React, { useState } from "react";
import { LoginForm } from "./LoginForm";
import { Task } from "./Task";
import { TaskForm } from "./TaskForm";
import { TaskInterface, TasksCollection } from "../db/TasksCollection";

export const App = () => {
  const user = useTracker(() => Meteor.user());

  const [hideCompleted, setHideCompleted] = useState<boolean>(false);

  const hideCompletedFilter = { isChecked: { $ne: true } };
  const userFilter = user ? { userId: user._id } : {};
  const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter };

  const pendingTasksCount = useTracker(() => {
    if (!user) {
      return 0;
    }
    const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter };
    return TasksCollection.find(pendingOnlyFilter).count();
  });
  const pendingTasksTitle = `${
    pendingTasksCount ? ` (${pendingTasksCount})` : ""
  }`;

  const tasks = useTracker(() => {
    if (!user) {
      return [];
    }

    return TasksCollection.find(
      hideCompleted ? pendingOnlyFilter : userFilter,
      {
        sort: { createdAt: -1 },
      }
    ).fetch();
  });

  const logout = () => Meteor.logout();
  
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
        {user ? (
          <React.Fragment>
            <div className="user" onClick={logout}>
              {user.username} 🚪
            </div>
            <TaskForm userId={user._id} />
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
          </React.Fragment>
        ) : (
          <LoginForm />
        )}
      </div>
    </div>
  );
};
