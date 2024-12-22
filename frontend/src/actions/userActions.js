import axiosInstance from "../utils/axiosinstance";

export const register = async () => {};

export const login = async (email, password) => {
  try {
    const response = await axiosInstance.post("/auth/login", {
      email,
      password,
    });

    return response;
  } catch (error) {
    return error;
  }
};
