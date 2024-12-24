import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";

const reducer = combineReducers({
  authState: authReducer,
});

const store = configureStore({
  reducer,
});

export default store;
