// src/pages/AdminLogin.jsx
import React, { useState } from "react";
import "./AdminDashboard.css"; // Reuse same CSS for layout

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const ADMIN_PASSWORD = "admin123"; // Change if needed

    if (password === ADMIN_PASSWORD) {
      localStorage.setItem("adminLoggedIn", "true");
      window.location.href = "/admin";
    } else {
      setError("Incorrect password. Try again.");
    }
  };

  return (
    <div className="admin-container">
      <h1>Admin Login 🔐</h1>
      <form onSubmit={handleLogin}>
        <input
          type="password"
          placeholder="Enter admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      </form>
    </div>
  );
}
