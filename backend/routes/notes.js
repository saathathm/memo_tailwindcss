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
router.post("/note/add", authenticateToken, addNote);

// Update note
router.put("/note/update/:noteId", authenticateToken, updateNote);

// Update pin note
router.put("/note/update_ispinned/:noteId", authenticateToken, updateIsPinned);

// Get all note
router.get("/note/", authenticateToken, getAllNotes);

// Get all note
router.get("/note/get/:noteId", authenticateToken, getNoteById);

// Delete note
router.delete("/note/:noteId", authenticateToken, deleteNoteById);

export default router;
