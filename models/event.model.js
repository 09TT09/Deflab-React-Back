const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    organizatorId:{
      type: String,
    },
    description: {
      type: String,
      maxlength: 10000,
    },
    picture: {
      type: String,
      default: "./uploads/organization/organization.png",
    },
    location: {
      type: String,
    },
    mapCoordinates: {
      type: [Number | String]
    },
    type: {
      type: String, 
    },
    date: {
      type: [String],
    },
    time: {
      type: [String],
    },
    donationType: {
      type: [String],
    },
    donation: {
      type: [String | Number],
    },
    participantsId: {
      type: [String],
    },
    tags: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

const EventModel = mongoose.model("Event", eventSchema);
module.exports = EventModel;
