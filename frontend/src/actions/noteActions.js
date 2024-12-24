import {
  getAllNotesFail,
  getAllNotesRequest,
  getAllNotesSuccess,
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
