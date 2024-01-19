//import dependencies
const mongoose = require("mongoose");

//create Schema
const UserSchema = new mongoose.Schema({
  svcNo: {
    type: String,
    required: true,
    unique: true,
  },

  initials: String,
  surname: String,
  appt: String,
  rank: String,

  password: {
    type: String,
    required: true,
  },

  category: String,
});

//create or access model
const User = mongoose.model("User", UserSchema);

//export or make model available to other pages
module.exports = User;
