import { Mongo } from "meteor/mongo";

export interface TaskInterface {
  _id: string;
  text: string;
  createdAt: Date;
  isChecked: boolean;
}

export const TasksCollection = new Mongo.Collection<TaskInterface>("tasks");
