import express from "express";

import { jsonParser } from "../middlewares/jsonParser.js";
import AuthController from "../controllers/auth.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", jsonParser, AuthController.register);
router.post("/login", jsonParser, AuthController.login);
router.get("/logout", auth, AuthController.logout);

export default router;
