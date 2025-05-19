import express from "express";

import { jsonParser } from "../middlewares/jsonParser.js";
import AuthController from "../controllers/auth.js";

const router = express.Router();

router.post("/register", jsonParser, AuthController.register);
router.post("/login", jsonParser, AuthController.login);

export default router;
