import express from "express";

import {
  getById,
  getall,
  AddReview,
  deleter,
  updatebyid,
  AddProduct,
} from "../controlers/productcontroler.js";
import { protect, admin } from "../middleware/authmiddleware.js";

const router = express.Router();
router.route("/").get(getall).post(protect, admin, AddProduct);
router.route("/:id").get(getById).put(updatebyid);
router.delete("/delete/:id", deleter);
router.post("/addRe/:id", protect, AddReview);
export default router;
