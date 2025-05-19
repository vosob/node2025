import Book from "../models/book.js";
import { booksSchema } from "../schemas/booksSchema.js";

const getBooks = async (req, res, next) => {
  console.log(req.user);
  try {
    const books = await Book.find({ ownerId: req.user.id });

    res.status(200).send(books);
  } catch (error) {
    next(error);
  }
};

const getBook = async (req, res, next) => {
  const { id } = req.params;

  try {
    const book = await Book.findById(id);

    if (book === null) {
      return res.status(404).send("Book not found :(");
    }

    // перевірка чи належить книга конкретному юзеру
    if (book.ownerId.toString() !== req.user.id) {
      // return res.status(403).send("Access denied");
      return res.status(404).send("Book not found :(");
    }

    res.status(200).send(book);
  } catch (error) {
    next(error);
  }
};

const createBook = async (req, res, next) => {
  const { error, value } = booksSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const book = await Book.create({ ...value, ownerId: req.user.id });
    return res.status(201).json(book);
  } catch (err) {
    next(err);
  }
};

const updateBook = async (req, res, next) => {
  const { id } = req.params;
  const { error, value } = booksSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const updBook = await Book.findOneAndUpdate(
      { _id: id },
      { $set: value },
      {
        new: true,
      }
    );

    if (!updBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json(updBook);
  } catch (err) {
    next(err);
  }
};

const deleteBook = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await Book.findByIdAndDelete(id);

    if (result === null) {
      return res.status(404).send("Book not found :(");
    }
    res.send({ id });
  } catch (error) {
    next(error);
  }
};

export default {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
};
