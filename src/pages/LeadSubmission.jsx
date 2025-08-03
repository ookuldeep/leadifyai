import React, { useState } from "react";
import axios from "axios";
import "../App.css"; // make sure this import is here

export default function SubmitLead() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await axios.post("http://localhost:5000/api/leads", form);
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <div className="container">
      <h1>LeadifyAI 🚀</h1>
      <p>Submit your inquiry below.</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <textarea
          placeholder="Your message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          required
        />
        <button type="submit">Submit</button>
        {status === "success" && <p style={{ color: "green" }}>✔ Submitted!</p>}
        {status === "error" && <p style={{ color: "red" }}>❌ Error submitting</p>}
      </form>
    </div>
  );
}
