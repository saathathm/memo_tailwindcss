import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import { createError } from "../Utilities/error.js";

export const register = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName) {
      return res.status(400).json({
        error: true,
        message: "Full Name is required",
      });
    }

    if (!email) {
      return next(createError(400, "Email is required"));
    }

    if (!password) {
      return next(createError(400, "Password is required"));
    }

    const isUser = await User.findOne({ email });

    if (isUser) {
      return next(createError(409, "User already exists"));
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const user = new User({
      fullName,
      email,
      password: hash,
    });

    await user.save();

    const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "36000m",
    });

    return res.status(200).json({
      error: false,
      message: "Registration Successful",
      fullName,
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return next(createError(400, "Please enter the email"));
    }

    if (!password) {
      return next(createError(400, "Please enter the password"));
    }

    const userInfo = await User.findOne({ email });

    if (!userInfo) {
      return next(createError(404, "User not found"));
    }

    const verifyPassword = await bcrypt.compare(password, userInfo.password);

    if (!verifyPassword) {
      return next(createError(400, "Password is incorrect"));
    }

    const user = { user: userInfo };

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "36000m",
    });

    return res.status(200).json({
      error: false,
      message: "Login Successful",
      email,
      fullName: userInfo.fullName,
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};
