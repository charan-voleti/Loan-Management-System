import axiosInstance
from "./axios";


// =====================================
// LOGIN
// =====================================

export const loginUser =
async (
  email: string,
  password: string
) => {

  const response =
    await axiosInstance.post(
      "/auth/login",
      {
        email,
        password,
      }
    );

  return response.data;
};


// =====================================
// SIGNUP
// =====================================

export const signupUser =
async (
  userData: any
) => {

  const response =
    await axiosInstance.post(
      "/auth/signup",
      userData
    );

  return response.data;
};