import {
  getUserFail,
  getUserRequest,
  getUserSuccess,
  loginFail,
  loginRequest,
  loginSuccess,
  clearGetUser as clearAuth,
  registerRequest,
  registerSuccess,
  registerFail,
} from "../slices/authSlice";
import axiosInstance from "../utils/axiosInstance";

export const register = (fullName, email, password) => async (dispatch) => {
  try {
    dispatch(registerRequest());

    const { data } = await axiosInstance.post("/api/v1/auth/register", {
      fullName,
      email,
      password,
    });
    dispatch(registerSuccess(data));
  } catch (error) {
    dispatch(registerFail(error.response.data.message));
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(loginRequest());

    const { data } = await axiosInstance.post("/api/v1/auth/login", {
      email,
      password,
    });
    dispatch(loginSuccess(data));
  } catch (error) {
    dispatch(loginFail(error.response.data.message));
  }
};

export const getUser = async (dispatch) => {
  try {
    dispatch(getUserRequest());

    const { data } = await axiosInstance.get("/api/v1/user/");
    dispatch(getUserSuccess(data));
  } catch (error) {
    dispatch(getUserFail(error.message));
  }
};

export const clearGetUser = async (dispatch) => {
  dispatch(clearAuth());
};
