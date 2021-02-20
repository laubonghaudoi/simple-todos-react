import { Meteor } from "meteor/meteor";
import { NotesCollection } from "/imports/db/NotesCollection";

Meteor.startup(function () {
  NotesCollection.rawCollection().createIndex({
    userId: 1, // This will create an index in the Document's prop authorId.
  });
});

Meteor.publish("notes", function () {
  return NotesCollection.find({});
});
