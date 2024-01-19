//Load env variables
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

// import Custom error

//import bcryptjs libraries
const bcrypt = require("bcryptjs");
/* const jwt = require("jsonwebtoken"); */

//import User model
const User = require("../models/user");
const { CustomError } = require("../middleware/errorHandler");

const validator = require("validator");
const { encrypt, createJwtToken } = require("../utils/tools");
const { statusCodes } = require("../utils/statusCodes");

//login

const loginUser = async (req, res) => {
  //extract the neccesary values from the body
  const { svcNo, password } = req.body;

  console.log(req.body);

  if (validator.isEmpty(svcNo?.trim())) {
    throw new CustomError(400, "Invalid credentials");
  }

  if (validator.isEmpty(password)) {
    throw new CustomError(400, "Invalid credentials");
  }

  //checking existing user
  const checkUserAlreadyExist = await User.findOne({ svcNo });

  if (!checkUserAlreadyExist) {
    throw new CustomError(400, `Invalid credentials`);
  }
  const comparedPassword = await bcrypt.compare(
    password,
    checkUserAlreadyExist.password
  );
  if (!comparedPassword) {
    throw new CustomError(400, "Sorry invalid credentials");
  }

  /*extract the values to encrypt from the 
  user gotten from the database, exclude the password*/
  const user = { ...checkUserAlreadyExist._doc, password: undefined };

  // encrypt the user user crpyto library
  const encryptedUserInfo = encrypt(JSON.stringify(user));

  // create a json web token
  const token = await createJwtToken(encryptedUserInfo);

  // establish a login session for the user

  // await SessionModel.findOneAndUpdate(
  //   { userId: user._id },
  //   {
  //     remoteAddress: req.ip,
  //     userDevice: req.headers["user-agent"],
  //     token: token,
  //     userId: user._id,
  //   },
  //   {
  //     upsert: true,
  //   }
  // );

  res.status(statusCodes.OK).json({
    surname: user.surname,
    token,
  });
};

//logout
function logout(req, res) {}

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
  try {
    //Get the sent in data off request body
    const svcNo = req.body.svcNo;
    const initials = req.body.initials;
    const surname = req.body.surname;
    const appt = req.body.appt;
    const rank = req.body.rank;
    const password = req.body.password;
    const category = req.body.category;

    //Hash Password
    const hashedPassword = bcrypt.hashSync(password, 8);

    //Create a user with it
    const user = await User.create({
      svcNo: svcNo,
      initials: initials,
      surname: surname,
      appt: appt,
      rank: rank,
      password: hashedPassword,
      category: category,
    });
    //respond with the new user
    res.json({ user: user });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

//update user
const updateUser = async (req, res) => {
  //get id off url
  const userId = req.params.id;

  //get the data off the req body
  const svcNo = req.body.svcNo;
  const initials = req.body.initials;
  const surname = req.body.surname;
  const appt = req.body.appt;
  const rank = req.body.rank;
  const password = req.body.password;
  const category = req.body.category;

  //find user using the id and update user
  const user = await User.findByIdAndUpdate(userId, {
    svcNo: svcNo,
    initials: initials,
    surname: surname,
    appt: appt,
    rank: rank,
    password: password,
    category: category,
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
  //await User.findByIdAndDelete(userId);

  //respond
  res.json({ success: "user deleted successfully" });
};

module.exports = {
  loginUser,
  logout,
  fetchUsers,
  fetchUser,
  createUser,
  updateUser,
  deleteUser,
};
