import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { TasksCollection } from "../imports/db/TasksCollection";
import { LinksCollection } from "/imports/api/links";
import '/imports/api/tasksMethods';

function insertLink(title: string, url: string) {
  LinksCollection.insert({ title, url, createdAt: new Date() });
}

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
  // If the Links collection is empty, add some data.
  if (LinksCollection.find().count() === 0) {
    insertLink(
      "Do the Tutorial",
      "https://www.meteor.com/tutorials/react/creating-an-app"
    );

    insertLink("Follow the Guide", "http://guide.meteor.com");

    insertLink("Read the Docs", "https://docs.meteor.com");

    insertLink("Discussions", "https://forums.meteor.com");
  }

  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }
  const user = Accounts.findUserByUsername(SEED_USERNAME);
  if (TasksCollection.find().count() === 0) {
    insertTask("Foobar", user);
  }
});
