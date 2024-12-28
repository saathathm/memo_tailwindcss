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

    clearAllOfNotes(state, action) {
      return {
        loading: false,
        notes: false,
        message: "Cleared",
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
        ...state,
        loading: false,
        note: "Added",
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
        ...state,
        loading: false,
        note: "Updated",
      };
    },

    updateNoteFail(state, actions) {
      return {
        ...state,
        loading: false,
        error: actions.payload,
      };
    },

    deleteNoteRequest(state, actions) {
      return {
        ...state,
        loading: true,
      };
    },

    deleteNoteSuccess(state, actions) {
      const newNotes = state.notes.filter((note) => {
        return note._id !== actions.payload;
      });
      return {
        ...state,
        loading: false,
        note: "Deleted",
        notes: newNotes,
      };
    },

    deleteNoteFail(state, actions) {
      return {
        ...state,
        loading: false,
        error: actions.payload,
      };
    },

    updateNotePinRequest(state, actions) {
      return {
        ...state,
        loading: true,
      };
    },

    updateNotePinSuccess(state, actions) {
      return {
        ...state,
        loading: false,
        note: "Pin",
      };
    },

    updateNotePinFail(state, actions) {
      return {
        ...state,
        loading: false,
        error: actions.payload,
      };
    },

    searchNoteRequest(state, actions) {
      return {
        ...state,
        loading: true,
      };
    },

    searchNoteSuccess(state, actions) {
      return {
        ...state,
        loading: false,
        notes: actions.payload,
      };
    },

    searchNoteFail(state, actions) {
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
  searchNoteRequest,
  searchNoteSuccess,
  searchNoteFail,
  updateNotePinRequest,
  updateNotePinSuccess,
  updateNotePinFail,
  deleteNoteRequest,
  deleteNoteSuccess,
  deleteNoteFail,
  getAllNotesRequest,
  getAllNotesSuccess,
  getAllNotesFail,
  clearAllOfNotes,
} = noteSlice.actions;
export default noteSlice.reducer;
