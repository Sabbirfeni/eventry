import mongoose, { Schema } from "mongoose";

const schema = new Schema({
  name: {
    required: false,
    type: String,
  },
  details: {
    required: false,
    type: String,
  },
  location: {
    required: false,
    type: String,
  },
  imageUrl: {
    required: false,
    type: String,
  },
  interested_ids: {
    required: false,
    type: Array,
  },
  going_ids: {
    required: false,
    type: Array,
  },
  swgs: {
    required: false,
    type: Array,
  },
});

export const eventModel =
  mongoose.models.events ?? mongoose.model("events", schema);
