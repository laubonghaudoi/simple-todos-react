import React, { useState } from "react";
import { TasksCollection } from "../api/TasksCollection";

interface Props {
  userId: string;
}

export const TaskForm = (props: Props) => {
  const [text, setText] = useState<string>("");

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!text) return;

    TasksCollection.insert({
      text: text.trim(),
      userId: props.userId,
      createdAt: new Date(),
      isChecked: false,
    });

    setText("");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Type to add new tasks"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
};
