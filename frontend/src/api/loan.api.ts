import axiosInstance
from "./axios";


// =====================================
// APPLY LOAN
// =====================================

export const applyLoan =
async (
  loanData: any
) => {

  const response =
    await axiosInstance.post(
      "/loans/apply",
      loanData
    );

  return response.data;
};


// =====================================
// GET MY LOANS
// =====================================

export const getMyLoans =
async () => {

  const response =
    await axiosInstance.get(
      "/loans/my-loans"
    );

  return response.data;
};