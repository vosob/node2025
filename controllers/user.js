import User from "../models/user.js";
const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password -token");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export default { getUser };
