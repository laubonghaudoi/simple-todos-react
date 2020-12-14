import { Meteor } from 'meteor/meteor';
import React, { useState } from "react";

export const TaskForm = () => {
  const [text, setText] = useState<string>("");

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!text) return;

    Meteor.call("tasks.insert", text.trim());

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
