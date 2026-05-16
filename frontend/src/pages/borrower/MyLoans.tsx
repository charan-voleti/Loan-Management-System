import {
  useEffect,
  useState,
} from "react";

import AppLayout from "../../components/layouts/AppLayout";

import {
  getMyLoans,
} from "../../api/loan.api";

import {
  uploadSalarySlip,
} from "../../api/upload.api";


function MyLoans() {

  const [loans, setLoans] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);


  useEffect(() => {

    fetchLoans();

  }, []);


  const fetchLoans =
    async () => {

      try {

        const data =
          await getMyLoans();

        console.log(data);

        setLoans(data.loans);

      } catch (error) {

        console.log(
          "Fetch Loans Error:",
          error
        );

      } finally {

        setLoading(false);
      }
    };


  const handleUpload =
    async (
      loanId: string,
      file: File | null
    ) => {

      if (!file) {

        alert(
          "Select a file"
        );

        return;
      }

      try {

        await uploadSalarySlip(
          loanId,
          file
        );

        alert(
          "Salary Slip Uploaded"
        );

      } catch (error) {

        console.log(error);

        alert(
          "Upload Failed"
        );
      }
    };


  if (loading) {

    return (

      <div
        className="
        text-center
        mt-20
        text-2xl
      "
      >
        Loading...
      </div>
    );
  }


  return (

    <AppLayout>

      <div
        className="
        p-10
        min-h-screen
        bg-gray-100
      "
      >

        <h1
          className="
          text-4xl
          font-bold
          mb-8
        "
        >
          My Loans
        </h1>


        <div
          className="
          overflow-x-auto
        "
        >

          <table
            className="
            w-full
            bg-white
            shadow
            rounded-lg
          "
          >

            <thead
              className="
              bg-blue-500
              text-white
            "
            >

              <tr>

                <th className="p-4">
                  Loan Amount
                </th>

                <th className="p-4">
                  Salary
                </th>

                <th className="p-4">
                  Tenure
                </th>

                <th className="p-4">
                  Status
                </th>

                <th className="p-4">
                  Employment
                </th>

                <th className="p-4">
                  Salary Slip
                </th>

              </tr>

            </thead>


            <tbody>

              {
                loans.length === 0 ? (

                  <tr>

                    <td
                      colSpan={6}
                      className="
                      p-10
                      text-center
                      text-gray-500
                    "
                    >
                      No Loans Found
                    </td>

                  </tr>

                ) : (

                  loans.map((loan) => (

                    <tr
                      key={loan._id}
                      className="
                      text-center
                      border-b
                    "
                    >

                      <td className="p-4">
                        ₹{loan.loanAmount}
                      </td>

                      <td className="p-4">
                        ₹{loan.monthlySalary}
                      </td>

                      <td className="p-4">
                        {loan.tenureDays} Days
                      </td>

                      <td className="p-4">

                        <span
                          className={`
                            px-4
                            py-1
                            rounded

                            ${

                              loan.status ===
                              "APPLIED"

                                ? "bg-yellow-200"

                                : loan.status ===
                                  "SANCTIONED"

                                ? "bg-green-200"

                                : loan.status ===
                                  "REJECTED"

                                ? "bg-red-200"

                                : "bg-gray-200"
                            }
                          `}
                        >
                          {loan.status}
                        </span>

                      </td>

                      <td className="p-4">
                        {loan.employmentStatus}
                      </td>


                      <td className="p-4">

                        <input
                          type="file"
                          accept=".pdf,.jpg,.png"
                          onChange={(e) =>

                            handleUpload(

                              loan._id,

                              e.target.files
                                ? e.target.files[0]
                                : null
                            )
                          }
                        />

                      </td>

                    </tr>
                  ))
                )
              }

            </tbody>

          </table>

        </div>

      </div>

    </AppLayout>
  );
}

export default MyLoans;