import axiosInstance from "./axiosInstance";

export const submitQuiz = async ({ levelId, answers }) => {
  const response = await axiosInstance.post("/progress/submit-quiz", {
    levelId,
    answers,
  });
  return response.data.data;
};