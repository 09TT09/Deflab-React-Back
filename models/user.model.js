const mongoose = require("mongoose");
const { isEmail, isMobilePhone } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      validate: [isEmail],
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
    birthday: {
      type: Date,
      required: true,
    },
    picture: {
      type: String,
      default: "./uploads/profil/user.png",
    },
    cellphone: {
      type: Number,
      trim: true,
    },
    userType: {
      type: Number,
      required: true,
    },
    relationsId: {
      type:[String],
    },
    organizationsId: {
      type: [String],
    },
    eventId: {
      type: [String],
    },
    organizationOrganizerId: {
      type: String,
    },
    hideSensitiveInformation: {
      type: Boolean,
      default: true
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function(email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('Mot de passe incorrect !');
  }
  throw Error('Email incorrect !');
}

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
