const mongoose = require("mongoose");

const organizationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    representative: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 10000,
    },
    picture: {
      type: String,
      default: "./uploads/organization/organization.png",
    },
    events: {
      type: [Object],
    },
    members: {
      type: [String],
    },
    membersCount: {
      type: Number,
    },
    eventsCount: {
      type: Number,
    }
  },
  {
    timestamps: true,
  }
);

const OrganizationModel = mongoose.model("Organization", organizationSchema);
module.exports = OrganizationModel;
