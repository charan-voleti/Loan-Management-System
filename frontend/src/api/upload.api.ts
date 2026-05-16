import axios from "axios";


const API =
  "http://localhost:5000/api";


export const uploadSalarySlip =
async (
  loanId: string,
  file: File
) => {

  const token =
    localStorage.getItem("token");


  const formData =
    new FormData();

  formData.append(
    "salarySlip",
    file
  );


  const response =
    await axios.post(

      `${API}/uploads/salary-slip/${loanId}`,

      formData,

      {
        headers: {

          Authorization:
            `Bearer ${token}`,

          "Content-Type":
            "multipart/form-data",
        },
      }
    );

  return response.data;
};