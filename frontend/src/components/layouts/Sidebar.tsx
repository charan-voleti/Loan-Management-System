import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../../context/AuthContext";


function Sidebar() {

  const {
    user,
    logout,
  } = useAuth();

  const navigate =
    useNavigate();


  const handleLogout = () => {

    logout();

    navigate("/");
  };


  return (

    <div
      className="
      w-64
      min-h-screen
      bg-gray-900
      text-white
      p-6
    "
    >

      <h1
        className="
        text-3xl
        font-bold
        mb-10
      "
      >
        LMS
      </h1>


      <div
        className="
        mb-8
      "
      >

        <p
          className="
          text-lg
          font-semibold
        "
        >
          {user?.fullName}
        </p>

        <p
          className="
          text-sm
          text-gray-300
        "
        >
          {user?.role}
        </p>

      </div>


      <nav
        className="
        flex
        flex-col
        gap-4
      "
      >

        {
          user?.role ===
          "BORROWER" && (

            <>

              <Link
                to="/dashboard"
                className="
                hover:text-blue-400
              "
              >
                Dashboard
              </Link>


              <Link
                to="/apply-loan"
                className="
                hover:text-blue-400
              "
              >
                Apply Loan
              </Link>


              <Link
                to="/my-loans"
                className="
                hover:text-blue-400
              "
              >
                My Loans
              </Link>

            </>
          )
        }


        {
          (
            user?.role === "ADMIN" ||

            user?.role === "SANCTION"
          ) && (

            <>

              <Link
                to="/dashboard"
                className="
                hover:text-blue-400
              "
              >
                Dashboard
              </Link>


              <Link
                to="/pending-loans"
                className="
                hover:text-blue-400
              "
              >
                Pending Loans
              </Link>


              <Link
                to="/disbursement"
                className="
                hover:text-blue-400
              "
              >
                Disbursement
              </Link>

            </>
          )
        }


        <button
          onClick={handleLogout}
          className="
          mt-10
          bg-red-500
          p-2
          rounded
          hover:bg-red-600
        "
        >
          Logout
        </button>

      </nav>

    </div>
  );
}

export default Sidebar;