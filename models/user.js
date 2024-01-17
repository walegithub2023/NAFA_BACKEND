//import dependencies
const mongoose = require("mongoose");

//create Schema
const UserSchema = new mongoose.Schema({
  nafNo: String,
  firstname: String,
  middlename: String,
  lastname: String,
  username: String,
  password: String,
});

//create or access model
const User = mongoose.model("User", UserSchema);

//export or make model available to other pages
module.exports = User;
