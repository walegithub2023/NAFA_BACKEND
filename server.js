//Load env variables
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

//import dependencies
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectToDb = require("./config/connectToDb");
const usersController = require("./controllers/usersController");

//create express app
const app = express();

//configure express app for json and cors
app.use(express.json());
app.use(cors());

//connect to database
connectToDb();

//Routing
app.get("/users", usersController.fetchUsers);

app.get("/users/:id", usersController.fetchUser);

app.post("/users", usersController.createUser);

app.put("/users/:id", usersController.updateUser);

app.delete("/users/:id", usersController.deleteUser);

//start server
app.listen(process.env.PORT, () => {
  console.log("Server running at port:", process.env.PORT);
});
