import express from "express";
import { login, register } from "../controllers/authController.js";
const router = express.Router();

// create a new account
router.post("/register", register);

// login Account
router.post("/login", login);

export default router;
