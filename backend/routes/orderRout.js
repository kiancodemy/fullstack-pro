import {
  addOrder,
  getOrder,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getAllOrders,
} from "../controlers/ordercontroler.js";
import { protect, admin } from "../middleware/authmiddleware.js";
import express from "express";
const router = express.Router();
router.route("/").get(protect, admin, getAllOrders).post(protect, addOrder);
router.route("/mine").get(protect, getOrder);
router.route("/:id").get(protect, admin, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/delivered").put(protect, admin, updateOrderToDelivered);
export default router;
