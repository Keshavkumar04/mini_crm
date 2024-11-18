"use client";

import { useState } from "react";

export default function CustomerPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    totalSpend: "",
    visits: "",
    lastVisit: "",
  });
  const [response, setResponse] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const rawText = await res.text(); // Get raw response
      console.log("Raw response:", rawText);
      const result = JSON.parse(rawText); // Parse manually
      setResponse(JSON.stringify(result, null, 2));
    } catch (error) {
      console.error("Error during submission:", error);
      setResponse("Failed to submit customer.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add Customer</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="totalSpend"
          placeholder="Total Spend"
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="visits"
          placeholder="Visits"
          onChange={handleInputChange}
          required
        />
        <input
          type="date"
          name="lastVisit"
          onChange={handleInputChange}
          required
        />
        <button type="submit">Add Customer</button>
      </form>
      <pre>{response}</pre>
    </div>
  );
}
