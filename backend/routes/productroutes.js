import express from "express";

import {
  getById,
  getall,
  deleter,
  AddProduct,
} from "../controlers/productcontroler.js";
import { protect, admin } from "../middleware/authmiddleware.js";

const router = express.Router();
router.route("/").get(getall).post(protect, admin, AddProduct);
router.get("/:id", getById);
router.delete("/delete/:id", deleter);
export default router;
