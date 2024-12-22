import User from "../models/User.js";
import { createError } from "../Utilities/error.js";

export const getUser = async (req, res, next) => {
  const { user } = req;
  try {
    const userInfo = await User.findById(user._id);
    if (!userInfo) {
      return next(createError(404, "User not found"));
    }

    const {password, ...other} = userInfo._doc;

    res.status(200).json({
      error: false,
      ...other,
      message: "User retrived successfully",
    });
  } catch (error) {
    next(error);
  }
};
