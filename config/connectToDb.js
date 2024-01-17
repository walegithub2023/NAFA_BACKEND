//load env variables
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

//import dependencies
const mongoose = require("mongoose");

//connect to database
async function connectToDb() {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Connected to nafa database");
  } catch (err) {
    console.log(err);
  }
}

//export connection function
module.exports = connectToDb;
