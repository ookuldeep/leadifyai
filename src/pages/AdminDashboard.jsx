// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Papa from "papaparse";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [leads, setLeads] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scoreFilter, setScoreFilter] = useState("All");

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("adminLoggedIn");
    if (isLoggedIn === "true") {
      setLoggedIn(true);
    } else {
      window.location.href = "/admin-login";
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      fetchLeads();
    }
  }, [loggedIn]);

  const fetchLeads = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/leads");
      setLeads(res.data);
    } catch {
      alert("Failed to load leads");
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this lead?");
    if (!confirmed) return;

    try {
      await axios.delete(`http://localhost:5000/api/leads/${id}`);
      setLeads(leads.filter((lead) => lead.id !== id));
    } catch {
      alert("Failed to delete lead");
    }
  };

  const handleExportCSV = () => {
    const csv = Papa.unparse(leads);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "leads.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredLeads = leads
    .filter((lead) => {
      const search = searchQuery.toLowerCase();
      return (
        lead.name.toLowerCase().includes(search) ||
        lead.email.toLowerCase().includes(search) ||
        lead.message.toLowerCase().includes(search)
      );
    })
    .filter((lead) => {
      if (scoreFilter === "All") return true;
      return lead.score === scoreFilter;
    });

  if (!loggedIn) return null;

  return (
    <div className="admin-container">
      <header>
        <h1>Admin Dashboard 🧠</h1>
        <p>Leads received via LeadifyAI</p>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            className="logout-btn"
            onClick={() => {
              localStorage.removeItem("adminLoggedIn");
              window.location.href = "/admin-login";
            }}
          >
            🚪 Logout
          </button>
          <button className="export-btn" onClick={handleExportCSV}>
            📤 Export CSV
          </button>
        </div>
        <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
          <input
            type="text"
            placeholder="Search by name/email/message"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ padding: "8px", width: "300px" }}
          />
          <select
            value={scoreFilter}
            onChange={(e) => setScoreFilter(e.target.value)}
            style={{ padding: "8px" }}
          >
            <option value="All">All</option>
            <option value="Hot">🔥 Hot</option>
            <option value="Warm">🌤 Warm</option>
            <option value="Cold">❄ Cold</option>
          </select>
        </div>
      </header>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>Score</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredLeads.map((lead, index) => (
            <tr key={lead.id}>
              <td>{index + 1}</td>
              <td>{lead.name}</td>
              <td>{lead.email}</td>
              <td>{lead.message}</td>
              <td className={`score ${lead.score?.toLowerCase() || "unknown"}`}>
                {lead.score}
              </td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(lead.id)}
                  title="Delete lead"
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
