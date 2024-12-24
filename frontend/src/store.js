import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";
import noteReducer from "./slices/noteSlice.js";

const reducer = combineReducers({
  authState: authReducer,
  noteState: noteReducer,
});

const store = configureStore({
  reducer,
});

export default store;
