import AppLayout from "../../components/layouts/AppLayout";

import { useAuth } from "../../context/AuthContext";


function AdminDashboard() {

  const { user } =
    useAuth();


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
          mb-4
        "
        >
          LMS Dashboard
        </h1>


        <p
          className="
          text-xl
          mb-2
        "
        >
          Welcome:
          {" "}
          {user?.fullName}
        </p>


        <p
          className="
          text-xl
        "
        >
          Role:
          {" "}
          {user?.role}
        </p>

      </div>

    </AppLayout>
  );
}

export default AdminDashboard;