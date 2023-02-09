import * as React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import GaurdedRoute from "./GaurdedRoute/GaurdedRoute";

export default function App() {
  return (
    <div>
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
