import express from "express";

import { jsonParser } from "../middlewares/jsonParser.js";

import FavoritesController from "../controllers/favorites.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.get("/", auth, FavoritesController.getFavorites);

router.post("/add/:bookId", jsonParser, auth, FavoritesController.addFavorite);

router.delete(
  "/remove/:bookId",
  auth,
  jsonParser,
  FavoritesController.removeFavorite
);

export default router;
