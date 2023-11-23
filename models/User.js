const mongoose = require("mongoose");
const Status = require("../utils/defaultStatus");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  avatar: {
    public_id: String,
    url: String,
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Email already exists.."],
    trim: true,
  },
  password: {
    type: String,
    requiredL: true,
    minLength: [4, "Password too short"],
    select: false,
  },
  roles: {
    type: String,
    default: "ADMIN",
  },
  Status: {
    type: String,
    default: Status.ACTIVE,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

mongoose.models = {};

const User = mongoose.model("Users", userSchema);

module.exports = User
