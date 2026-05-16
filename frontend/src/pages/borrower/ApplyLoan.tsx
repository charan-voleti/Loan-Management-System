import { useState } from "react";

import AppLayout from "../../components/layouts/AppLayout";
import { applyLoan } from "../../api/loan.api";

function ApplyLoan() {

  const [formData, setFormData] =
    useState({

      fullName: "",

      panNumber: "",

      dateOfBirth: "",

      monthlySalary: "",

      employmentStatus:
        "SALARIED",

      loanAmount: "",

      tenureDays: "",
    });


  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLSelectElement
    >
  ) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };


  const handleSubmit =
    async (
      e: React.FormEvent
    ) => {

      e.preventDefault();

      try {

        const response =
          await applyLoan({

            ...formData,

            monthlySalary:
              Number(formData.monthlySalary),

            loanAmount:
              Number(formData.loanAmount),

            tenureDays:
              Number(formData.tenureDays),
          });

        console.log(response);

        alert(
          "Loan Applied Successfully"
        );

      } catch (error: any) {

        console.log(
          "Loan Error:",
          error.response?.data
        );

        alert(

          error.response?.data?.message ||

          "Loan Application Failed"
        );
      }
    };


 return (

  <AppLayout>

    <div
      className="
      max-w-2xl
      mx-auto
      mt-10
      bg-white
      p-8
      rounded-lg
      shadow
    "
    >

      <h1
        className="
        text-3xl
        font-bold
        mb-6
      "
      >
        Apply Loan
      </h1>


      <form
        onSubmit={handleSubmit}
        className="
        space-y-4
      "
      >

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          onChange={handleChange}
          className="
          w-full
          border
          p-3
          rounded
        "
        />


        <input
          type="text"
          name="panNumber"
          placeholder="PAN Number"
          onChange={handleChange}
          className="
          w-full
          border
          p-3
          rounded
        "
        />


        <input
          type="date"
          name="dateOfBirth"
          onChange={handleChange}
          className="
          w-full
          border
          p-3
          rounded
        "
        />


        <input
          type="number"
          name="monthlySalary"
          placeholder="Monthly Salary"
          onChange={handleChange}
          className="
          w-full
          border
          p-3
          rounded
        "
        />


        <select
          name="employmentStatus"
          onChange={handleChange}
          className="
          w-full
          border
          p-3
          rounded
        "
        >

          <option value="SALARIED">
            SALARIED
          </option>

          <option value="SELF_EMPLOYED">
            SELF EMPLOYED
          </option>

        </select>


        <input
          type="number"
          name="loanAmount"
          placeholder="Loan Amount"
          onChange={handleChange}
          className="
          w-full
          border
          p-3
          rounded
        "
        />


        <input
          type="number"
          name="tenureDays"
          placeholder="Tenure Days"
          onChange={handleChange}
          className="
          w-full
          border
          p-3
          rounded
        "
        />


        <button
          type="submit"
          className="
          w-full
          bg-blue-500
          text-white
          p-3
          rounded
          hover:bg-blue-600
        "
        >
          Apply Loan
        </button>

      </form>

        </div>

  </AppLayout>
);
}

export default ApplyLoan;