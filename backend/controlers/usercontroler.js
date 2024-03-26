import user from "../models/usermodel.js";

const authUser = async (req, res) => {
  res.send("authUser");
};

const getUsers = async (req, res) => {
  res.send("getUsers");
};

const getUserProfile = async (req, res) => {
  res.send("getUserProfile");
};

const logoutUser = async (req, res) => {
  res.send("logoutuser");
};

const updateUserProfil = async (req, res) => {
  res.send("updateUserProfil");
};

const registerUser = async (req, res) => {
  res.send("registeruser");
};
const deleteUser = async (req, res) => {
  res.send("deleteUser  ");
};

const updateUser = async (req, res) => {
  res.send("getUserById");
};
const getUserById = async (req, res) => {
  res.send("getUserById");
};
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
