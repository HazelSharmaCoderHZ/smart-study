import api from "@/services/api";

export const getTestResults = async (
  token: string
) => {
  const response = await api.get(
    "/api/study/test-results",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};