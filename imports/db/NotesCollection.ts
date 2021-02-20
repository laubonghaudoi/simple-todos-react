import { Mongo } from "meteor/mongo";

export interface NotesInterface {
  _id: string;
  title: string;
  userId: string;
}

export const NotesCollection = new Mongo.Collection<NotesInterface>("notes");
