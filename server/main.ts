import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { TasksCollection } from "../imports/db/TasksCollection";
import "/imports/api/tasksMethods";
import "/imports/api/tasksPublications";

const insertTask = (taskText: string, user: Meteor.User | undefined | null) =>
  TasksCollection.insert({
    text: taskText,
    userId: user?._id || "",
    createdAt: new Date(),
    isChecked: true,
  });

Meteor.startup(() => {
  if (!Accounts.findUserByUsername("user1")) {
    Accounts.createUser({
      username: "user1",
      password: "user1",
      profile: {
        nickname: "User 1",
      },
    });
  }
  if (!Accounts.findUserByUsername("user2")) {
    Accounts.createUser({
      username: "user2",
      password: "user2",
      profile: {
        nickname: "User 2",
      },
    });
  }
  // Create a sample task if empty
  const user1 = Accounts.findUserByUsername("user1");
  if (TasksCollection.find().count() === 0) {
    insertTask("Task 1 of User 1", user1);
    insertTask("Task 2 of User 1", user1);
  }
  const user2 = Accounts.findUserByUsername("user2");
  if (TasksCollection.find().count() === 0) {
    insertTask("Task 1 of User 2", user2);
    insertTask("Task 2 of User 2", user2);
  }
});
