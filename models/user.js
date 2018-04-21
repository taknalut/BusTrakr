const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  uuid: { type: String, required: true },
  routes: { type: Array }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
