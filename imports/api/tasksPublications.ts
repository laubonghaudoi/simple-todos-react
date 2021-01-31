import { Meteor } from "meteor/meteor";
import { TasksCollection } from "/imports/db/TasksCollection";
import { ReactiveAggregate } from "meteor/tunguska:reactive-aggregate";

Meteor.publish("tasks", function () {
  return TasksCollection.find({ userId: this.userId! });
});

Meteor.publish("tasksWithProfile", function () {
  ReactiveAggregate(
    this,
    Meteor.users,
    [
      {
        $lookup: {
          from: "tasks",
          localField: "userId",
          foreignField: "_id",
          as: "authorId",
        },
      },
    ],
    {
      noAutomaticObserver: true,
    }
  );
});
