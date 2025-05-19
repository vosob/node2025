import express from "express";

import authRoutes from "./auth.js";
import booksRoutes from "./books.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/books", booksRoutes);

export default router;
