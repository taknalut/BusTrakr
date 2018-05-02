require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Serve up static assets
app.use(express.static("client/build"));
// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@ds263989.mlab.com:63989/heroku_1j33xvcc` || "mongodb://localhost/busTrackr");

// Start the API server
app.listen(PORT, function() {
  console.log(`API Server now listening on PORT ${PORT}`);
});