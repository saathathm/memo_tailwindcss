import Note from "../models/Note.js";
import { createError } from "../Utilities/error.js";

export const addNote = async (req, res, next) => {
  try {
    const { title, content, tags } = req.body;
    const user = req.user;

    if (!title) {
      return next(createError(400, "Title is required"));
    }
    if (!content) {
      return next(createError(400, "Content is required"));
    }

    const note = new Note({
      title,
      content,
      tags: tags || [],
      userId: user._id,
    });

    await note.save();

    return res.status(200).json({
      error: false,
      note,
      message: "Note successfully added",
    });
  } catch (error) {
    next(error);
  }
};

export const updateNote = async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const { title, content, tags, isPinned } = req.body;

    const { user } = req;

    if (!title && !content && !tags) {
      return next(createError(400, "No changes were provided"));
    }

    const note = await Note.findOne({
      _id: noteId,
      userId: user._id,
    });

    if (title) note.title = title;
    if (content) note.content = content;
    if (tags) note.tags = tags;
    if (isPinned) note.isPinned = isPinned;

    await note.save();

    return res.status(200).json({
      error: false,
      note,
      message: "Note successfully updated",
    });
  } catch (error) {
    next(error);
  }
};

export const getAllNotes = async (req, res, next) => {
  try {
    const { user } = req;

    const notes = await Note.find({ userId: user._id }).sort({ isPinned: -1 });

    res.status(200).json({
      error: false,
      notes,
      message: "All notes retrieved successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getNoteById = async (req, res, next) => {
  const { user } = req;
  const { noteId } = req.params;

  try {
    const note = await Note.findOne({
      userId: user._id,
      _id: noteId,
    });

    if (!note) {
      return next(createError(404, "Note is not found"));
    }

    res.status(200).json({
      error: false,
      note,
      message: "Note retrived successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteNoteById = async (req, res, next) => {
  const { user } = req;
  const { noteId } = req.params;

  try {
    const note = await Note.findOne({
      userId: user,
      _id: noteId,
    });

    if (!note) {
      return next(createError(404, "Note not found"));
    }

    await Note.deleteOne({
      _id: noteId,
    });

    res.status(200).json({
      error: false,
      id: noteId,
      message: "Note deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const updateIsPinned = async (req, res, next) => {
  const { user } = req;
  const { noteId } = req.params;

  try {
    const note = await Note.findOne({
      userId: user._id,
      _id: noteId,
    });

    if (!note) {
      return next(createError(404, "Note not found"));
    }

    note.isPinned = !note.isPinned;

    await note.save();

    res.status(200).json({
      error: false,
      note,
      message: note.isPinned ? "Pinned" : "Un Pinned",
    });
  } catch (error) {
    next(error);
  }
};

export const searchNotes = async (req, res, next) => {
  try {
    const { user } = req;
    const { query } = req.query;

    if (!query) {
      return next(createError(400, "Search query is required"));
    }

    const matchingNotes = await Note.find({
      userId: user._id,
      $or: [
        { title: { $regex: new RegExp(query, "i") } },
        { content: { $regex: new RegExp(query, "i") } },
      ],
    });

    res.status(200).json({
      error: false,
      notes: matchingNotes,
      message: "Notes metched",
    });
  } catch (error) {
    next(error);
  }
};
