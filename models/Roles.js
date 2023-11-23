const mongoose = require("mongoose");
const Status = require("../utils/defaultStatus");

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  navigations: {
    type: Array,
    default: [],
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

const Roles = mongoose.model("Roles", roleSchema);

module.exports = Roles
