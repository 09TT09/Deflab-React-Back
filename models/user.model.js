const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      require: true,
      maxlength: 200,
      minlength: 8,
    },
    firstName: {
      type: String,
      required: true,
      maxlength: 100,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      maxlength: 100,
      trim: true,
    },
    picture: {
      type: String,
      default: "./uploads/profil/user.png",
    },
    cellphone: {
      type: Number,
      trim: true,
    },
    relations: {
      type:[Object],
    },
    organizations: {
      type: [Object],
    },
    event: {
      type: [Object],
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
