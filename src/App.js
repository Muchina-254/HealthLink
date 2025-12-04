// dashboard/src/App.js
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Overview from "./components/Overview";
import Patients from "./components/Patients";
import Login from "./components/Login";

function Protected({ children }) {
  const token = localStorage.getItem("hl_token");
  return token ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login page (no layout wrapper) */}
        <Route path="/login" element={<Login />} />

        {/* Dashboard routes wrapped in layout and protected */}
        <Route
          path="/"
          element={
            <Protected>
              <Layout>
                <Overview />
              </Layout>
            </Protected>
          }
        />

        <Route
          path="/patients"
          element={
            <Protected>
              <Layout>
                <Patients />
              </Layout>
            </Protected>
          }
        />

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
