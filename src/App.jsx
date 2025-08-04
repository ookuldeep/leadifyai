// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import LeadSubmission from "./pages/LeadSubmission";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LeadSubmission />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
}
