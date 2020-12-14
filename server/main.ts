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

const SEED_USERNAME = "foo";
const SEED_PASSWORD = "bar";

Meteor.startup(() => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }
  // Create a sample task if empty
  const user = Accounts.findUserByUsername(SEED_USERNAME);
  if (TasksCollection.find().count() === 0) {
    insertTask("Foobar", user);
  }
});
