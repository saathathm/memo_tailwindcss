import {
  createNoteFail,
  createNoteRequest,
  createNoteSuccess,
  deleteNoteFail,
  deleteNoteRequest,
  deleteNoteSuccess,
  getAllNotesFail,
  getAllNotesRequest,
  getAllNotesSuccess,
  searchNoteFail,
  searchNoteRequest,
  searchNoteSuccess,
  updateNoteFail,
  updateNotePinFail,
  updateNotePinRequest,
  updateNotePinSuccess,
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

export const PinSelectedNote = (noteId) => async (dispatch) => {
  try {
    dispatch(updateNotePinRequest());
    const { data } = await axiosInstance.put(
      "/api/v1/note/update_ispinned/" + noteId
    );

    dispatch(updateNotePinSuccess(data.note));
  } catch (error) {
    dispatch(updateNotePinFail(error.message));
  }
};

export const deleteSelectedNote = (noteId) => async (dispatch) => {
  try {
    dispatch(deleteNoteRequest());
    const { data } = await axiosInstance.delete("/api/v1/note/" + noteId);

    dispatch(deleteNoteSuccess(data.id));
  } catch (error) {
    dispatch(deleteNoteFail(error.note));
  }
};

export const searchQueryNote = (query) => async (dispatch) => {
  try {
    dispatch(searchNoteRequest());
    const { data } = await axiosInstance.get(
      "/api/v1/note/search?query=" + query
    );

    dispatch(searchNoteSuccess(data.notes));
  } catch (error) {
    dispatch(searchNoteFail(error.message));
  }
};
