const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded requests

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "config/config.env" });
}

// Importing Routes
const roles = require("./routes/roles");
const auth = require("./routes/auth");
const navigation = require("./routes/navigation");

// Using Routes
app.use("/api/v1", roles);
app.use("/api/v1", auth);
app.use("/api/v1", navigation);

module.exports = app;
