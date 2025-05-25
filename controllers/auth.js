import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { registerSchema } from "../schemas/usersSchemas.js";
import User from "../models/user.js";

const register = async (req, res, next) => {
  const user = req.body;
  const { error } = registerSchema.validate(user);

  if (error) {
    return res.status(400).send({ message: error.message });
  }

  const normalizedEmail = user.email.toLowerCase();

  try {
    const duplicateUser = await User.findOne({ email: normalizedEmail });

    if (duplicateUser !== null) {
      return res.status(409).send({ message: "User already registered" });
    }

    const passwordHash = await bcrypt.hash(user.password, 10);

    await User.create({
      name: user.name,
      email: normalizedEmail,
      password: passwordHash,
    });

    res.status(201).send({ message: "Register successfully" });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const userData = req.body;
  const normalizedEmail = userData.email.toLowerCase();
  try {
    const user = await User.findOne({ email: normalizedEmail });

    if (user === null) {
      console.log("email");
      return res.status(401).send({ message: "Email or password incorrect" });
    }

    const isMatch = await bcrypt.compare(userData.password, user.password);

    if (isMatch === false) {
      console.log("pass");
      return res.status(401).send({ message: "Email or password incorrect" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    await User.findOneAndUpdate(user._id, { token });

    res.send({ token });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, { token: null });
    res.status(204).send({ message: "Logout successful" });
  } catch (error) {
    next(error);
  }
};

export default { register, login, logout };
