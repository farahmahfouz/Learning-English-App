import axiosInstance from "./axiosInstance";

export const submitQuiz = async ({ levelId, answers }) => {
  const response = await axiosInstance.post("/progress/submit-quiz", {
    levelId,
    answers,
  });
  return response.data.data;
};

export const getProgress = async () => {
  const response = await axiosInstance.get("/progress/me");
  return response.data.data.progress;
};