import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import MyLoans from "../pages/borrower/MyLoans";
import Login from "../pages/auth/Login";
import ApplyLoan from "../pages/borrower/ApplyLoan";
import PendingLoans from "../pages/admin/PendingLoans";

import AdminDashboard
from "../pages/admin/AdminDashboard";

import ProtectedRoute
from "../components/common/ProtectedRoute";


function AppRoutes() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route

  path="/my-loans"

  element={

    <ProtectedRoute>

      <MyLoans />

    </ProtectedRoute>
  }
/>



        <Route

          path="/dashboard"

          element={

            <ProtectedRoute>

              <AdminDashboard />

            </ProtectedRoute>
          }
        />

        <Route

  path="/pending-loans"

  element={

    <ProtectedRoute
      allowedRoles={[
        "ADMIN",
        "SANCTION"
      ]}
    >

      <PendingLoans />

    </ProtectedRoute>
  }
/>




        <Route

  path="/apply-loan"

  element={

    <ProtectedRoute>

      <ApplyLoan />

    </ProtectedRoute>
  }
/>

      </Routes>

    </BrowserRouter>
  );
}

export default AppRoutes;