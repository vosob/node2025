import express from "express";

import { jsonParser } from "../middlewares/jsonParser.js";

import BookController from "../controllers/book.js";

const router = express.Router();

router.get("/", BookController.getBooks);

router.get("/:id", BookController.getBook);

router.post("/", jsonParser, BookController.createBook);

router.put("/:id", jsonParser, BookController.updateBook);

router.delete("/:id", jsonParser, BookController.deleteBook);

export default router;
