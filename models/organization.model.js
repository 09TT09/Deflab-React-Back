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
    eventsId: {
      type: [String],
    },
    membersId: {
      type: [String],
    }
  },
  {
    timestamps: true,
  }
);

const OrganizationModel = mongoose.model("Organization", organizationSchema);
module.exports = OrganizationModel;
