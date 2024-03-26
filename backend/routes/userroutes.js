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
import { protect, admin } from "../middleware/authmiddleware.js";
import express from "express";
const router = express.Router();
router.route("/").get(protect, admin, getUsers).post(registerUser);
router.route("/login").post(authUser);
router.route("/logout").post(logoutUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfil);
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);
export default router;
