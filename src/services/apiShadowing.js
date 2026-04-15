import axiosInstance from "./axiosInstance";


export const getStories = async () => {
  const res  = await axiosInstance.get(`/shadowing/stories`);
  return res.data.data.stories;
};

export const submitShadowing = async ({ storyId, selfEvaluation }) => {
  const res = await axiosInstance.post(
    `/shadowing/submit`,
    { storyId, selfEvaluation },
  );
  return res.data.data.session;
};