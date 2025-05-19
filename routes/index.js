import express from "express";

import authRoutes from "./auth.js";
import booksRoutes from "./books.js";

import auth from "../middlewares/auth.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/books", auth, booksRoutes);

export default router;
