import api from "./api";

export const signupUser = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const response = await api.post(
    "/auth/signup",
    data
  );

  return response.data;
};

export const verifyOtp = async (
  email: string,
  otp: string
) => {
  const response = await api.post(
    "/auth/verify-otp",
    {
      email,
      otp,
    }
  );

  return response.data;
};

export const loginUser = async (
  email: string,
  password: string
) => {
  const response = await api.post(
    "/auth/login",
    {
      email,
      password,
    }
  );

  return response.data;
};