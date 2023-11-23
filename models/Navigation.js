const mongoose = require("mongoose");
const Status = require("../utils/defaultStatus")

const navSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
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

const Navigation = mongoose.model("Navigations", navSchema);

module.exports = Navigation
