import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    isAuthenticated: false,
    notAllow: true,
  },

  reducers: {
    registerRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },

    registerSuccess(state, action) {
      return {
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    },

    registerFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },

    loginRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },

    loginSuccess(state, action) {
      return {
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    },

    loginFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },

    getUserRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    getUserSuccess(state, action) {
      return {
        loading: false,
        isAuthenticated: true,
        notAllow: false,
        user: action.payload,
      };
    },
    getUserFail(state, action) {
      return {
        ...state,
        notAllow: false,
        loading: false,
        errorLoadUser: action.payload,
      };
    },
    clearGetUser(state, action) {
      return {
        loading: false,
        error: null,
        user: {},
        isAuthenticated: false,
      };
    },
  },
});

export const {
  registerRequest,
  registerSuccess,
  registerFail,
  loginRequest,
  loginSuccess,
  loginFail,
  getUserRequest,
  getUserSuccess,
  getUserFail,
  clearGetUser,
} = authSlice.actions;
export default authSlice.reducer;
