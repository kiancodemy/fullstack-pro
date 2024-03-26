import user from "../models/usermodel.js";
import jtw from "jsonwebtoken";
const jwtmaker = (id) => {
  return jtw.sign({ id: id }, process.env.SECRETPASS, {
    expiresIn: "2d",
  });
};

const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!password || !email) {
      throw new Error("you have not enter password or email");
    }

    const myuser = await user.findOne({ email: email });

    if (myuser && (await myuser.passfiner(password))) {
      const token = jwtmaker(myuser._id);
      const cookie = res.cookie("jwt", token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      });
      res.status(200).json({
        _id: myuser._id,
        name: myuser.name,
        email: myuser.email,
        admin: myuser.isAdmin,
      });
    } else {
      throw new Error("information is not valid");
    }
  } catch (err) {
    res.status(404).json({
      message: `you face ${err}`,
    });
  }
};

const getUsers = async (req, res) => {
  res.send("getUsers");
};

const getUserProfile = async (req, res) => {
  res.send("getUserProfile");
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
