require("express-async-errors");
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

const {
  errorHandlerMiddleware,
} = require("../backend/middleware/errorHandler");

//create express app
const app = express();

//configure express app for json and cors
app.use(express.json());
app.use(cors());

//connect to database
connectToDb();

//Routing
//Routing for users

app.post("/login", usersController.loginUser);
app.get("/logout", usersController.logout);
app.get("/users", usersController.fetchUsers);

app.get("/users/:id", usersController.fetchUser);
app.post("/users", usersController.createUser);

app.put("/users/:id", usersController.updateUser);

app.delete("/users/:id", usersController.deleteUser);

//middleware
app.use(errorHandlerMiddleware);

//start server
app.listen(process.env.PORT, () => {
  console.log("Server running at port:", process.env.PORT);
});
