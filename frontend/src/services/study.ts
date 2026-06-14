import api from "./api";

export const generateNotes = async (
  topic: string,
  token: string
) => {
  const response = await api.post(
    "/api/study/generate-notes",
    { topic },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const generateQuiz = async (
  topic: string,
  token: string
) => {
  const response = await api.post(
    "/api/study/generate-quiz",
    { topic },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};


export const getNotes = async (
  token: string
) => {
  const response = await api.get(
    "/api/study/notes",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};


export const getQuizzes = async (
  token: string
) => {
  const response = await api.get(
    "/api/study/quizzes",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const generateMockTest = async (
  topic: string,
  token: string
) => {
  const response = await api.post(
    "/api/study/generate-mock-test",
    { topic },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const saveTestResult = async (
  data: {
    topic: string;
    score: number;
    total: number;
    percentage: number;
  },
  token: string
) => {
  const response = await api.post(
    "/api/study/save-test-result",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};