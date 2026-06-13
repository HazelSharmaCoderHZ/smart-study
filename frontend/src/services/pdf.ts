import api from "./api";

export const uploadPdf = async (
  file: File,
  token: string
) => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post(
  "/api/pdf/upload-pdf",
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};