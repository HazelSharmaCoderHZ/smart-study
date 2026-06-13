import api from "./api";

export const askQuestion = async (
  question: string,
  token: string
) => {

  console.log("TOKEN:", token);

  const response = await api.post(
    "/api/chat/ask",
    { question },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getHistory = async (
  token: string
) => {
  const response = await api.get(
    "/api/chat/history",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};


export const getChatHistory = async (
  token: string
) => {
  const response = await api.get(
    "/api/chat/history",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};