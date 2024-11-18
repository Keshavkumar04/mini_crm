"use client";

import { useState, useEffect } from "react";

export default function OrderPage() {
  const [formData, setFormData] = useState({
    customerId: "",
    orderDate: "",
    amount: "",
  });
  const [response, setResponse] = useState("");
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true); // Ensure hydration before rendering
  }, []);

  if (!isHydrated) return null; // Prevent rendering during SSR

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]:
        name === "customerId" || name === "amount"
          ? value.replace(/\D/g, "")
          : value,
    }));
  };

  const validateForm = () => {
    if (!formData.customerId || parseInt(formData.customerId, 10) <= 0) {
      return "Customer ID must be a positive number.";
    }
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      return "Amount must be greater than zero.";
    }
    if (
      !formData.orderDate ||
      new Date(formData.orderDate).getTime() > Date.now()
    ) {
      return "Order date cannot be in the future.";
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const error = validateForm();
    if (error) {
      setResponse(error);
      return;
    }

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          customerId: parseInt(formData.customerId, 10),
          amount: parseFloat(formData.amount),
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setResponse(`Error: ${errorData.error || "Failed to create order."}`);
        return;
      }

      const result = await res.json();
      setResponse(JSON.stringify(result, null, 2));
    } catch (err) {
      setResponse("Network error: Unable to reach the server.");
    }
  };

  return (
    <div
      style={{
        padding: "30px",
        maxWidth: "600px",
        margin: "auto",
        backgroundColor: "#f9f9f9",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2 style={{ color: "#333", fontFamily: "'Roboto', sans-serif" }}>
        Add Order
      </h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <input
          type="text"
          name="customerId"
          placeholder="Customer ID"
          value={formData.customerId}
          onChange={handleInputChange}
          required
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ddd",
            fontSize: "16px",
            transition: "border-color 0.3s",
          }}
        />
        <input
          type="date"
          name="orderDate"
          value={formData.orderDate}
          onChange={handleInputChange}
          required
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ddd",
            fontSize: "16px",
            transition: "border-color 0.3s",
          }}
        />
        <input
          type="text"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleInputChange}
          required
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ddd",
            fontSize: "16px",
            transition: "border-color 0.3s",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "12px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#0056b3")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#007bff")
          }
        >
          Add Order
        </button>
      </form>
      <pre
        style={{
          marginTop: "20px",
          backgroundColor: "#f4f4f4",
          padding: "15px",
          borderRadius: "5px",
          fontFamily: "'Courier New', monospace",
          fontSize: "14px",
          whiteSpace: "pre-wrap",
          wordWrap: "break-word",
          border: "1px solid #ddd",
        }}
      >
        {response}
      </pre>
    </div>
  );
}
