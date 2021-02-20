import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import React, { useState } from "react";
import {
  TaskInterface,
  TasksCollection,
  TasksWithProfileCollection,
} from "../db/TasksCollection";
import { NotesCollection } from "/imports/db/NotesCollection";
import { LoginForm } from "./LoginForm";
import { Task } from "./Task";
import { TaskForm } from "./TaskForm";

export const App = () => {
  const user = useTracker(() => Meteor.user());

  useTracker(() => {
    const handler = Meteor.subscribe("notes");
    if (!handler.ready()) return;
    const notes = NotesCollection.find({}).fetch();
    console.log("Notes:")
    console.log(notes);
  });

  // Codes for joining collections
  useTracker(() => {
    const handler = Meteor.subscribe("tasksWithProfile");
    if (!handler.ready()) {
      return {
        tasks: [],
        pendingTasksCount: 0,
        isLoading: true,
      };
    }
    const tasksWithProfiles = TasksWithProfileCollection.find({}).fetch();
    // This always returns an empty array, how to fix?
    console.log("Tasks with profiles:");
    console.log(tasksWithProfiles);
    return tasksWithProfiles;
  });

  // Below are codes for showing ordinary tasks
  const [hideCompleted, setHideCompleted] = useState<boolean>(false);

  const hideCompletedFilter = { isChecked: { $ne: true } };
  const userFilter = user ? { userId: user._id } : {};
  const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter };

  const { tasks, pendingTasksCount, isLoading } = useTracker(() => {
    if (!Meteor.user()) {
      return {
        tasks: [],
        pendingTasksCount: 0,
        isLoading: false,
      };
    }
    const handler = Meteor.subscribe("tasks");

    if (!handler.ready()) {
      return {
        tasks: [],
        pendingTasksCount: 0,
        isLoading: true,
      };
    }

    const tasks = TasksCollection.find(
      hideCompleted ? pendingOnlyFilter : userFilter,
      {
        sort: { createdAt: -1 },
      }
    ).fetch();
    // Tasks are normal, array is non-empty
    console.log("Tasks without profiles:");
    console.log(tasks);
    const pendingTasksCount = TasksCollection.find(pendingOnlyFilter).count();

    return { tasks, pendingTasksCount, isLoading: false };
  });

  const pendingTasksTitle = `${
    pendingTasksCount ? ` (${pendingTasksCount})` : ""
  }`;

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
            <TaskForm />
            <div className="filter">
              <button onClick={() => setHideCompleted(!hideCompleted)}>
                {hideCompleted ? "Show All" : "Hide Completed"}
              </button>
            </div>
            {isLoading && <div className="loading">loading...</div>}
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
