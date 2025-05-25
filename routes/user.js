import express from "express";

import UserController from "../controllers/user.js";

const router = express.Router();

router.get("/", UserController.getUser);

export default router;
