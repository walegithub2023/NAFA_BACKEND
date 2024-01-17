//import User model
const User = require("../models/user");

//fetch all users
const fetchUsers = async (req, res) => {
  //find the users
  const users = await User.find();
  //respond with them
  res.json({ users: users });
};

//fetch single user
const fetchUser = async (req, res) => {
  //Get id of the url
  const userId = req.params.id;
  //find the user using the id
  const user = await User.findById(userId);
  //respond with user
  res.json({ user: user });
};

//post or insert or create user
const createUser = async (req, res) => {
  //Get the sent in data off request body
  const nafNo = req.body.nafNo;
  const firstname = req.body.firstname;
  const middlename = req.body.middlename;
  const lastname = req.body.lastname;
  const username = req.body.username;
  const password = req.body.password;

  //Create a user with it
  const user = await User.create({
    nafNo: nafNo,
    firstname: firstname,
    middlename: middlename,
    lastname: lastname,
    username: username,
    password: password,
  });
  //respond with the new user
  res.json({ user: user });
};

//update user
const updateUser = async (req, res) => {
  //get id off url
  const userId = req.params.id;

  //get the data off the req body
  const nafNo = req.body.nafNo;
  const firstname = req.body.firstname;
  const middlename = req.body.middlename;
  const lastname = req.body.lastname;
  const username = req.body.username;
  const password = req.body.password;

  //find user using the id and update user
  const user = await User.findByIdAndUpdate(userId, {
    nafNo: nafNo,
    firstname: firstname,
    middlename: middlename,
    lastname: lastname,
    username: username,
    password: password,
  });

  //find updated user
  const updatedUser = await User.findById(userId);

  //respond with updated user
  res.json({ user: updatedUser });
};

//delete user
const deleteUser = async (req, res) => {
  //get id off url
  const userId = req.params.id;

  //delete user using id
  await User.deleteOne({ id: userId });

  //respond
  res.json({ success: "user deleted successfully" });
};

module.exports = {
  fetchUsers: fetchUsers,
  fetchUser: fetchUser,
  createUser: createUser,
  updateUser: updateUser,
  deleteUser: deleteUser,
};
