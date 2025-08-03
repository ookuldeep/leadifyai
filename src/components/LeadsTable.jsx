// src/components/LeadsTable.jsx
import React, { useEffect, useState } from "react";

export default function LeadsTable() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/leads")
      .then((res) => res.json())
      .then((data) => {
        setLeads(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Failed to fetch leads:", err.message);
        setLoading(false);
      });
  }, []);

  const badgeStyle = (score) => {
    switch (score) {
      case "Hot":
        return "bg-red-100 text-red-600";
      case "Warm":
        return "bg-yellow-100 text-yellow-700";
      case "Cold":
        return "bg-blue-100 text-blue-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-12 px-4">
      <h2 className="text-2xl font-bold text-center mb-6">🚀 All Leads</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading leads...</p>
      ) : leads.length === 0 ? (
        <p className="text-center text-gray-400">No leads submitted yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-xl shadow overflow-hidden">
            <thead className="bg-gray-100 text-left text-sm text-gray-600">
              <tr>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Message</th>
                <th className="py-3 px-4">Score</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-t hover:bg-gray-50 text-sm">
                  <td className="py-3 px-4 font-medium">{lead.name}</td>
                  <td className="py-3 px-4">{lead.email}</td>
                  <td className="py-3 px-4 text-gray-700">{lead.message}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${badgeStyle(
                        lead.score
                      )}`}
                    >
                      {lead.score || "Unknown"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
