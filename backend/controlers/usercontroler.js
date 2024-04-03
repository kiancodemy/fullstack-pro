import User from "../models/usermodel.js";

import { tokenGenerator } from "../../frontend/src/utils/generatetoken.js";

const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!password || !email) {
      throw new Error("you have not enter password or email");
    }

    const myuser = await User.findOne({ email: email });

    if (myuser && (await myuser.passfiner(password))) {
      tokenGenerator(res, myuser);
    } else {
      throw new Error("Information is not valid");
    }
  } catch (err) {
    res.status(404).json({
      message: `${err.message}`,
    });
  }
};

const getUsers = async (req, res) => {};

const getUserProfile = async (req, res) => {
  try {
    const find = await User.findById(req.user._id);
    if (!find) {
      throw new Error("there is a error");
    }

    res.status(201).json({
      _id: find._id,
      name: find.name,
      email: find.email,
      admin: find.isAdmin,
    });
  } catch (err) {
    res.status(404).json({
      message: `${err.message}`,
    });
  }
};

const logoutUser = async (req, res) => {
  res.cookie("jwt", "", {
    expiresIn: new Date(0),
    httpOnly: true,
  });
  res.status(201).json({
    message: "Log out suceesfully",
  });
};

const updateUserProfil = async (req, res) => {
  try {
    const find = await User.findById(req.user._id);
    if (!find) {
      throw new Error("it is not found");
    }

    find.email = req.body.email || find.email;
    find.name = req.body.name || find.name;
    if (req.body.password) {
      find.password = req.body.password || find.password;
    }
    const updated = await find.save();
    res.status(201).json({
      _id: updated._id,
      name: updated.name,
      email: updated.email,
      admin: updated.isAdmin,
    });
  } catch (err) {
    res.status(404).json({
      message: `${err.message}`,
    });
  }
};

const registerUser = async (req, res) => {
  try {
    const { name, password, email } = req.body;
    const finder = await User.findOne({ email });
    if (finder) {
      throw new Error("user already exist");
    }
    const user = await User.create({ name, password, email });
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        admin: user.isAdmin,
      });
    } else {
      throw new Error("invalid user data");
    }
  } catch (err) {
    res.status(404).json({
      message: `${err.message}`,
    });
  }
};
const deleteUser = async (req, res) => {
  res.send("deleteUser  ");
};

const updateUser = async (req, res) => {
  res.send("getUserById");
};
const getUserById = async (req, res) => {};
export {
  authUser,
  updateUserProfil,
  updateUser,
  getUserProfile,
  registerUser,
  getUsers,
  deleteUser,
  getUserById,
  logoutUser,
};
