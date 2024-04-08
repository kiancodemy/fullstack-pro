import express from "express";

import {
  getById,
  getall,
  deleter,
  updatebyid,
  AddProduct,
} from "../controlers/productcontroler.js";
import { protect, admin } from "../middleware/authmiddleware.js";

const router = express.Router();
router.route("/").get(getall).post(protect, admin, AddProduct);
router.route("/:id").get(getById).put(updatebyid);
router.delete("/delete/:id", deleter);
export default router;
