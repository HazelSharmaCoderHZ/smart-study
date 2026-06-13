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

export const getMyPdfs = async (
  token: string
) => {
  const response = await api.get(
    "/api/pdf/my-pdfs",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};


export const deletePdf = async (
  filename: string,
  token: string
) => {
  const response = await api.delete(
    `/api/pdf/delete-pdf/${filename}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};