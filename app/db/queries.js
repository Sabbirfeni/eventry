import { eventModel } from "@/models/event-models";
import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/utils/data-util";

async function getAllEvents() {
  const allEvents = await eventModel.find().lean();
  console.log(allEvents);
  return replaceMongoIdInArray(allEvents);
}

async function getEventById(eventId) {
  const event = await eventModel.findById(eventId).lean();
  return replaceMongoIdInObject(event);
}

export { getAllEvents, getEventById };
