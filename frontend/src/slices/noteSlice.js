import { createSlice } from "@reduxjs/toolkit";

const noteSlice = createSlice({
  name: "note",
  initialState: {
    loading: true,
  },

  reducers: {
    getAllNotesRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },

    getAllNotesSuccess(state, action) {
      return {
        loading: false,
        notes: action.payload,
      };
    },

    getAllNotesFail(state, action) {
      return {
        loading: false,
        error: action.payload,
      };
    },
  },
});

export const { getAllNotesRequest, getAllNotesSuccess, getAllNotesFail } =
  noteSlice.actions;
export default noteSlice.reducer;
