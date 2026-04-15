import axiosInstance from "./axiosInstance";

export const login = async (credientials) => {
  const response = await axiosInstance.post("/users/login", credientials);
  return response.data.data.user;
};

export const signup = async (credientials) => {
  const response = await axiosInstance.post("/users/register", credientials);
  return response.data.data.user;
};

export const getCurrentUser = async (credientials) => {
  const response = await axiosInstance.get("/users/me", credientials);
  return response.data.data.user;
};
