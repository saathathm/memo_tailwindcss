import express from "express";
import { authenticateToken } from "../Utilities/utilities.js";
import {
  addNote,
  deleteNoteById,
  getAllNotes,
  getNoteById,
  updateIsPinned,
  updateNote,
} from "../controllers/noteController.js";

const router = express.Router();

// Create note
router.post("/add", authenticateToken, addNote);

// Update note
router.put("/update/:noteId", authenticateToken, updateNote);

// Update pin note
router.put("/update_ispinned/:noteId", authenticateToken, updateIsPinned);

// Get all note
router.get("/", authenticateToken, getAllNotes);

// Get note by id
router.get("/get/:noteId", authenticateToken, getNoteById);

// Delete note
router.delete("/:noteId", authenticateToken, deleteNoteById);

export default router;
