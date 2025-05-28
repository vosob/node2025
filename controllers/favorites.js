import User from "../models/user.js";
import Book from "../models/book.js";

const getFavorites = async (req, res, next) => {
  const userId = req.user._id || req.user.id;

  try {
    const user = await User.findById(userId).populate("favorites");
    if (!user) return res.status(404).json({ message: "User not found" });
    console.log("USER WITH FAVORITES:", user);
    res.status(200).json(user.favorites);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const addFavorite = async (req, res, next) => {
  const userId = req.user._id || req.user.id;
  const { bookId } = req.params;

  try {
    // Перевіряємо чи існує книга
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Перевіряємо чи книга вже є в улюблених
    if (user.favorites.includes(bookId)) {
      return res.status(400).json({ message: "Book already in favorites" });
    }

    // Додаємо книгу до улюблених
    user.favorites.push(bookId);
    await user.save();

    // Отримуємо оновленого користувача з попульованими даними
    const updatedUser = await User.findById(userId).populate("favorites");

    res.status(200).json({
      message: "Book added to favorites",
      favorites: updatedUser.favorites,
    });
  } catch (err) {
    next(err);
  }
};

export const removeFavorite = async (req, res, next) => {
  const userId = req.user._id || req.user.id;
  const { bookId } = req.params;

  try {
    // Перевіряємо чи існує книга (опціонально, залежно від вашої логіки)
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Перевіряємо чи книга є в улюблених
    if (!user.favorites.includes(bookId)) {
      return res.status(400).json({ message: "Book is not in favorites" });
    }

    // Видаляємо книгу з улюблених
    user.favorites = user.favorites.filter(
      (favId) => favId.toString() !== bookId
    );
    await user.save();

    // Отримуємо оновленого користувача з попульованими даними
    const updatedUser = await User.findById(userId).populate("favorites");

    res.status(200).json({
      message: "Book removed from favorites",
      favorites: updatedUser.favorites,
    });
  } catch (err) {
    next(err);
  }
};

export default { getFavorites, addFavorite, removeFavorite };
