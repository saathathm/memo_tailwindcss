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

    createNoteRequest(state, actions) {
      return {
        ...state,
        loading: true,
      };
    },

    createNoteSuccess(state, actions) {
      return {
        loading: false,
        note: actions.payload,
      };
    },

    createNoteFail(state, actions) {
      return {
        ...state,
        loading: false,
        error: actions.payload,
      };
    },

    updateNoteRequest(state, actions) {
      return {
        ...state,
        loading: true,
      };
    },

    updateNoteSuccess(state, actions) {
      return {
        loading: false,
        note: actions.payload,
      };
    },

    updateNoteFail(state, actions) {
      return {
        ...state,
        loading: false,
        error: actions.payload,
      };
    },
  },
});

export const {
  createNoteRequest,
  createNoteSuccess,
  createNoteFail,
  updateNoteRequest,
  updateNoteSuccess,
  updateNoteFail,
  getAllNotesRequest,
  getAllNotesSuccess,
  getAllNotesFail,
} = noteSlice.actions;
export default noteSlice.reducer;
