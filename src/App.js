import * as React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./Pages/Home";
import { ToastContainer } from "react-toastify";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import GaurdedRoute from "./GaurdedRoute/GaurdedRoute";

export default function App() {
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route
            path="/dashboard"
            element={
              <GaurdedRoute>
                <Dashboard />
              </GaurdedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
