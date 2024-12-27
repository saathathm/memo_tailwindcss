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
import { useDispatch } from "react-redux";
import { getUser } from "./actions/userActions";
import ValidateRoute from "./components/Routes/ValidateRoute";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser);
  }, [dispatch]);
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/memo_tailwindcss/dashboard" />} />
          <Route
            path="/memo_tailwindcss/dashboard"
            exact
            element={
              <ValidateRoute>
                <Home />
              </ValidateRoute>
            }
          />
          <Route path="/memo_tailwindcss/login" exact element={<Login />} />
          <Route path="/memo_tailwindcss/signup" exact element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
