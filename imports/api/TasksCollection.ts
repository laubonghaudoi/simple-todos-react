import { Mongo } from "meteor/mongo";

export interface TaskInterface {
  _id: number;
  text: string;
  createdAt: Date;
  isChecked: boolean;
}

export const TasksCollection = new Mongo.Collection<TaskInterface>("tasks");
