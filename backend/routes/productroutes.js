import express from "express";

import { getById, getall, deleter } from "../controlers/productcontroler.js";

const router = express.Router();
router.get("/", getall);
router.get("/:id", getById);
router.delete("/delete/:id", deleter);
export default router;
