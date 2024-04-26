import { eventModel } from "@/models/event-models";
import { userModel } from "@/models/user-models";
import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/utils/data-util";
import mongoose from "mongoose";

async function getAllEvents(query) {
  let allEvents = [];
  if (query) {
    const regex = new RegExp(query, "i");
    allEvents = await eventModel.find({ name: { $regex: regex } }).lean();
  } else {
    allEvents = await eventModel.find().lean();
  }

  return replaceMongoIdInArray(allEvents);
}

async function getEventById(eventId) {
  const event = await eventModel.findById(eventId).lean();
  return replaceMongoIdInObject(event);
}

async function createUser(user) {
  return await userModel.create(user);
}

async function findUserByCredentials(credentials) {
  const user = await userModel.findOne(credentials).lean();
  if (user) {
    return replaceMongoIdInObject(user);
  }
  return null;
}

async function updateInterest(eventId, authId) {
  const event = await eventModel.findById(eventId);
  if (event) {
    const foundUsers = event.interested_ids.find(
      (id) => id.toString() === authId
    );

    if (foundUsers) {
      event.interested_ids.pull(new mongoose.Types.ObjectId(authId));
    } else {
      event.interested_ids.push(new mongoose.Types.ObjectId(authId));
    }

    event.save();
  } else {
    throw new Error("Unable to add to interested!");
  }
}

async function updateGoing(eventId, authId) {
  const event = await eventModel.findById(eventId);
  if (event) {
    event.going_ids.push(new mongoose.Types.ObjectId(authId));
    event.save();
  } else {
    throw new Error("Something went wrong while payment processing!");
  }
}

export {
  getAllEvents,
  getEventById,
  createUser,
  findUserByCredentials,
  updateInterest,
  updateGoing,
};
