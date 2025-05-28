import express from "express";

import authRoutes from "./auth.js";
import booksRoutes from "./books.js";
import userRoutes from "./user.js";
import favoritesRoutes from "./favorites.js";

import auth from "../middlewares/auth.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/books", auth, booksRoutes);
router.use("/user", auth, userRoutes);
router.use("/favorites", auth, favoritesRoutes);

export default router;
