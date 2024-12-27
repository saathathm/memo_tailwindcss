import React, { useEffect, useState } from "react";
import TagInput from "../../components/Input/TagInput";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getNotes } from "../../actions/noteActions";
import {
  addNewNote as createNewNote,
  editNote as updateNote,
} from "../../actions/noteActions";

const AddEditNotes = ({ noteData, type, onClose, showToastMsg }) => {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const { error: noteError, note } = useSelector((state) => state.noteState);

  // Add New Note
  const addNewNote = async () => {
    dispatch(createNewNote(title, content, tags));
  };

  // Edit Note
  const editNote = async () => {
    const noteId = noteData?._id;
    dispatch(updateNote(title, content, tags, noteId));
  };

  useEffect(() => {
    if (note) {
      showToastMsg(`Note Successfully ${note}`)
      dispatch(getNotes);
      onClose();
    }

    if (noteError) {
      setError(noteError);
    }
  }, [note, noteError]);

  const handleAddNote = () => {
    if (!title) {
      setError("Please enter the title");
      return;
    }
    if (!content) {
      setError("Please write the content");
      return;
    }

    setError("");

    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };

  return (
    <div className="relative">
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-100"
        onClick={onClose}
      >
        <MdClose className="text-xl text-slate-400" />
      </button>

      <div className="flex flex-col gap-2">
        <label className="input-label">TITLE</label>
        <input
          type="text"
          className="text-2xl text-slate-950 outline-none"
          placeholder="Go To Gym At 5"
          value={title}
          onChange={({ target }) => {
            setTitle(target.value);
          }}
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label">CONTENT</label>
        <textarea
          type="text"
          className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
          placeholder="Content"
          rows={10}
          value={content}
          onChange={({ target }) => {
            setContent(target.value);
          }}
        />
      </div>

      <div className="mt-3">
        <label className="input-label">TAGS</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

      {error && <p className="text-red-500 text-xs mt-5 p-3">{error}</p>}

      <button
        className="btn-primary font-medium mt-5 p-3"
        onClick={handleAddNote}
      >
        {type === "edit" ? "UPDATE" : "ADD"}
      </button>
    </div>
  );
};

export default AddEditNotes;
