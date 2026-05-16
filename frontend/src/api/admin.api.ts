import axios from "axios";


const API =
  "http://localhost:5000/api";


export const getAppliedLoans =
async () => {

  const token =
    localStorage.getItem("token");


  const response =
    await axios.get(

      `${API}/loans/applied`,

      {
        headers: {

          Authorization:
            `Bearer ${token}`,
        },
      }
    );

  return response.data;
};

export const disburseLoan =
async (
  loanId: string
) => {

  const token =
    localStorage.getItem("token");


  const response =
    await axios.patch(

      `${API}/loans/disburse/${loanId}`,

      {},

      {
        headers: {

          Authorization:
            `Bearer ${token}`,
        },
      }
    );

  return response.data;
};



export const sanctionLoan =
async (
  loanId: string
) => {

  const token =
    localStorage.getItem("token");


  const response =
    await axios.patch(

      `${API}/loans/sanction/${loanId}`,

      {},

      {
        headers: {

          Authorization:
            `Bearer ${token}`,
        },
      }
    );

  return response.data;
};