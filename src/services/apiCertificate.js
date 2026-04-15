import axiosInstance from './axiosInstance';

export const getCertificate = async (course) => {
  const { data } = await axiosInstance.get(`/certificates/me?course=${course}`);
  return data;
};

export const downloadCertificatePdf = async (course) => {
  const response = await axiosInstance.get(`/certificates/me/pdf?course=${course}`, {
    responseType: "blob",
  });
  return response.data;
};