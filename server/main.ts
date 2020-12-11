import { Meteor } from "meteor/meteor";
import { TasksCollection } from "/imports/api/TasksCollection";

const insertTask = (taskText: string, createdAt: Date) =>
  TasksCollection.insert({ text: taskText, createdAt, checked: false });

Meteor.startup(() => {
  // if (TasksCollection.find().count() === 0) {
  //   [
  //     "First Task",
  //     "Second Task",
  //     "Third Task",
  //     "Fourth Task",
  //     "Fifth Task",
  //     "Sixth Task",
  //     "Seventh Task",
  //   ].forEach(insertTask);
  // }
});
