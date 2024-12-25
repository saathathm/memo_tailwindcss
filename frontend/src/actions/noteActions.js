import {
  createNoteFail,
  createNoteRequest,
  createNoteSuccess,
  getAllNotesFail,
  getAllNotesRequest,
  getAllNotesSuccess,
  updateNoteFail,
  updateNoteRequest,
  updateNoteSuccess,
} from "../slices/noteSlice";
import axiosInstance from "../utils/axiosinstance";

export const getNotes = async (dispatch) => {
  try {
    dispatch(getAllNotesRequest());
    const { data } = await axiosInstance.get("/api/v1/note/");
    dispatch(getAllNotesSuccess(data.notes));
  } catch (error) {
    console.log(error.message);
    dispatch(getAllNotesFail(error.message));
  }
};

export const addNewNote = (title, content, tags) => async (dispatch) => {
  try {
    dispatch(createNoteRequest());
    const { data } = await axiosInstance.post("/api/v1/note/add", {
      title,
      content,
      tags,
    });

    dispatch(createNoteSuccess(data.note));
  } catch (error) {
    dispatch(createNoteFail(error.message));
  }
};

export const editNote = (title, content, tags, noteId) => async (dispatch) => {
  try {
    dispatch(updateNoteRequest());
    const { data } = await axiosInstance.put("/api/v1/note/update/" + noteId, {
      title,
      content,
      tags,
    });

    dispatch(updateNoteSuccess(data.note));
  } catch (error) {
    dispatch(updateNoteFail(error.message));
  }
};
