import {
  Navigate,
} from "react-router-dom";

import type {
  ReactNode,
} from "react";

import { useAuth }
from "../../context/AuthContext";


interface ProtectedProps {

  children: ReactNode;

  allowedRoles?: string[];
}


function ProtectedRoute({

  children,

  allowedRoles,

}: ProtectedProps) {

  const { user } =
    useAuth();


  // not logged in
  if (!user) {

    return <Navigate to="/" />;
  }


  // role restriction
  if (
    allowedRoles &&
    !allowedRoles.includes(
      user.role
    )
  ) {

    return (
      <div
        className="
        text-center
        mt-20
        text-red-500
        text-2xl
      "
      >

        Access Denied

      </div>
    );
  }

  return children;
}

export default ProtectedRoute;