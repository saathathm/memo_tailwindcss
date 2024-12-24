import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../Layout/Loader.jsx";

export default function ProtectedRoute({ children }) {
  const { notAllow, isAuthenticated } = useSelector((state) => state.authState);

  return (
    <div>
      {notAllow ? (
        <Loader />
      ) : !isAuthenticated ? (
        <Navigate to={"/login"} />
      ) : (
        children
      )}
    </div>
  );
}
