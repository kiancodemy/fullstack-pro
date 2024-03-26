import {
  authUser,
  updateUserProfil,
  updateUser,
  getUserProfile,
  registerUser,
  getUsers,
  deleteUser,
  getUserById,
  logoutUser,
} from "../controlers/usercontroler.js";
import express from "express";
const router = express.Router();
router.route("/").get(getUsers).post(registerUser);
router.route("/login").post(authUser);
router.route("/logout").post(logoutUser);
router.route("/profile").get(getUserProfile).put(updateUserProfil);
router.route("/:id").delete(deleteUser).get(getUserById).put(updateUser);
export default router;
