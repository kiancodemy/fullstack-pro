import express from "express";

import { getById, getall } from "../controlers/productcontroler.js";

const router = express.Router();
router.get("/", getall);
router.get("/:id", getById);
export default router;
