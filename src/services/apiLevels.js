import axiosInstance from "./axiosInstance";

export const getLevels = async () => {
  const response = await axiosInstance.get("/levels");
  return response.data.data.levels;
};

export const getLevelById = async (levelId) => {
  const response = await axiosInstance.get(`/levels/${levelId}`);
  return response.data.data.level;
};
