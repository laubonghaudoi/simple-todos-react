import { Meteor } from "meteor/meteor";
import { TasksCollection } from "/imports/db/TasksCollection";
import { ReactiveAggregate } from "meteor/tunguska:reactive-aggregate";

// Dont forget to create indexes that improves the join's performance
Meteor.startup(function () {    
  TasksCollection.rawCollection().createIndex({ 
    userId:1 // This will create an index in the Document's prop authorId.
  })
});

Meteor.publish("tasks", function () {
  return TasksCollection.find({ userId: this.userId! });
});

Meteor.publish("tasksWithProfile", function(skip=0, limit=100){
  try {
    console.log("Calling this");
    // Call the ReactiveAggregate instance
    ReactiveAggregate(
      this, // The context
      TasksCollection, // The collection object, // The collection object
      [      // The pipeline stage. This is pure mongo!!
        {
          $match: {
            // Try to filter the tasks.
          }
        },
        // Usually you want to sort the query by a date
        { 
          $sort: {
            createdAt:-1
          }
        },
        {
          $skip: skip // Useful to paginate
        },
        {
          $limit:limit // Try to always limit your query... and paginate server side
        },
        {
          $lookup: { // lookup. Make sure you're using the proper indexation
            from: "users", // The foreign collection
            localField: "userId", // The field in the local collection (better if its an index)
            foreignField: "_id", // The index to match in the foreign collection
            as: "profile" // The name you want this field to be named
          }
        },
        // And thats it, you'll get your todoslike this:
        /*
          {
            _id: "theTodoId",
            ...anything,
            profile: [
              {
                _id: "theUserId"
              }
            ]
          }
        */
       // Please note that the profile prop comes as an array, if you want it to be an object, 
       // unwind it.
       {
          $unwind: "$profile"
       },
       // You surely dont want all the information in users collection
       // There's a lot of "garbage there"
       { 
         $addFields: {
           profile: "$profile.profile"
         }
       }
      ],
      { // The options object
        clientCollection: "tasksWithProfile", // Your client collection that will receive the data
        // noAutomaticObservers:true, // Disable the expensive automatic observer
        // observers: [ // Create your own observers
        //   Meteor.users.find(), // To Observe the users collection... Not recommended. Just if needed
        //   TasksCollection.find()
        // ]
      }
    )
  } catch (exception) {
    // Controls the Error flow
    throw new Meteor.Error('500', exception);
  }
})