import React, { useEffect } from "react";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./actions/userActions";
import ProtectedRoute from "./components/Route/ProtectedRoute.jsx";

const App = () => {
  const dispatch = useDispatch();
  
  const { notAllow, isAuthenticated } = useSelector((state) => state.authState);

  useEffect(() => {
    dispatch(getUser);
  }, [dispatch]);
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route
            path="/dashboard"
            exact
            element={
              // <ProtectedRoute>
                notAllow ? (
                        // <Loader />
                        <div className="text-center mt-5">WaitPLease</div>
                      ) : !isAuthenticated ? (
                        <Navigate to={"/login"} />
                      ) : (
                        <Home/>
                      )
              // </ProtectedRoute>
            }
          />
          <Route path="/login" exact element={<Login />} />
          <Route path="/signup" exact element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
