import express from "express";

import authRoutes from "./auth.js";
import booksRoutes from "./books.js";
import userRoutes from "./user.js";

import auth from "../middlewares/auth.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/books", auth, booksRoutes);
router.use("/user", auth, userRoutes);

export default router;
