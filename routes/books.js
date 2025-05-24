import express from "express";

import { jsonParser } from "../middlewares/jsonParser.js";

import BookController from "../controllers/book.js";

import upload from "../middlewares/upload.js";

const router = express.Router();

router.get("/", BookController.getBooks);

router.get("/:id", BookController.getBook);

router.post("/", jsonParser, upload.single("image"), BookController.createBook);

router.put("/:id", jsonParser, BookController.updateBook);

router.delete("/:id", jsonParser, BookController.deleteBook);

export default router;
