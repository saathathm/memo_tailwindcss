import express from "express";
import { getUser } from "../controllers/userController.js";
import { authenticateToken } from "../Utilities/utilities.js";

const router = express.Router();

// Get User
router.get("/", authenticateToken, getUser);

export default router;