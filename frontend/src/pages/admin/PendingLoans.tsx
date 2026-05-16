import {
  useEffect,
  useState,
} from "react";

import AppLayout
from "../../components/layouts/AppLayout";

import {
  getAppliedLoans,
  sanctionLoan,
} from "../../api/admin.api";


function PendingLoans() {

  const [loans, setLoans] =
    useState<any[]>([]);


  useEffect(() => {

    fetchLoans();

  }, []);


  const fetchLoans =
    async () => {

      try {

        const data =
          await getAppliedLoans();

        setLoans(data.loans);

      } catch (error) {

        console.log(error);
      }
    };


  const handleSanction =
    async (
      loanId: string
    ) => {

      try {

        await sanctionLoan(
          loanId
        );

        alert(
          "Loan Sanctioned"
        );

        fetchLoans();

      } catch (error) {

        console.log(error);

        alert(
          "Failed"
        );
      }
    };


  return (

    <AppLayout>

      <div
        className="
        p-10
      "
      >

        <h1
          className="
          text-4xl
          font-bold
          mb-8
        "
        >
          Pending Loans
        </h1>


        <table
          className="
          w-full
          bg-white
          shadow
        "
        >

          <thead
            className="
            bg-black
            text-white
          "
          >

            <tr>

              <th className="p-4">
                Name
              </th>

              <th className="p-4">
                Loan
              </th>

              <th className="p-4">
                Salary
              </th>

              <th className="p-4">
                Action
              </th>

            </tr>

          </thead>


          <tbody>

            {
              loans.map((loan) => (

                <tr
                  key={loan._id}
                  className="
                  text-center
                  border-b
                "
                >

                  <td className="p-4">
                    {loan.fullName}
                  </td>

                  <td className="p-4">
                    ₹{loan.loanAmount}
                  </td>

                  <td className="p-4">
                    ₹{loan.monthlySalary}
                  </td>

                  <td className="p-4">

                    <button
                      onClick={() =>
                        handleSanction(
                          loan._id
                        )
                      }
                      className="
                      bg-green-500
                      text-white
                      px-4
                      py-2
                      rounded
                    "
                    >
                      Sanction
                    </button>

                  </td>

                </tr>
              ))
            }

          </tbody>

        </table>

      </div>

    </AppLayout>
  );
}

export default PendingLoans;