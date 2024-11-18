// "use client";

// import { useState } from "react";

// export default function OrderPage() {
//   const [formData, setFormData] = useState({
//     customerId: "",
//     orderDate: "",
//     amount: "",
//   });
//   const [response, setResponse] = useState("");

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value =
//       e.target.name === "customerId" || e.target.name === "amount"
//         ? parseInt(e.target.value, 10)
//         : e.target.value;
//     setFormData({ ...formData, [e.target.name]: value });
//   };

//   const validateForm = () => {
//     if (!formData.customerId || +formData.customerId <= 0) {
//       return "Customer ID must be a positive number.";
//     }
//     if (!formData.amount || +formData.amount <= 0) {
//       return "Amount must be greater than zero.";
//     }
//     if (!formData.orderDate || new Date(formData.orderDate) > new Date()) {
//       return "Order date cannot be in the future.";
//     }
//     return null;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const error = validateForm();
//     if (error) {
//       setResponse(error);
//       return;
//     }

//     try {
//       const res = await fetch("/api/orders", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       if (!res.ok) {
//         const errorData = await res.json();
//         setResponse(`Error: ${errorData.error || "Failed to create order."}`);
//         return;
//       }

//       const result = await res.json();
//       setResponse(JSON.stringify(result, null, 2));
//     } catch (err) {
//       setResponse("Network error: Unable to reach the server.");
//     }
//   };

//   return (
//     <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
//       <h2>Add Order</h2>
//       <form
//         onSubmit={handleSubmit}
//         style={{ display: "flex", flexDirection: "column", gap: "10px" }}
//       >
//         <input
//           type="number"
//           name="customerId"
//           placeholder="Customer ID"
//           value={formData.customerId}
//           onChange={handleInputChange}
//           required
//         />
//         <input
//           type="date"
//           name="orderDate"
//           value={formData.orderDate}
//           onChange={handleInputChange}
//           required
//         />
//         <input
//           type="number"
//           name="amount"
//           placeholder="Amount"
//           value={formData.amount}
//           onChange={handleInputChange}
//           required
//         />
//         <button
//           type="submit"
//           style={{ padding: "10px", background: "blue", color: "white" }}
//         >
//           Add Order
//         </button>
//       </form>
//       <pre
//         style={{
//           marginTop: "20px",
//           background: "#f4f4f4",
//           padding: "10px",
//           borderRadius: "5px",
//         }}
//       >
//         {response}
//       </pre>
//     </div>
//   );
// }

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
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>Add Order</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <input
          type="text"
          name="customerId"
          placeholder="Customer ID"
          value={formData.customerId}
          onChange={handleInputChange}
          required
        />
        <input
          type="date"
          name="orderDate"
          value={formData.orderDate}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleInputChange}
          required
        />
        <button
          type="submit"
          style={{ padding: "10px", background: "blue", color: "white" }}
        >
          Add Order
        </button>
      </form>
      <pre
        style={{
          marginTop: "20px",
          background: "#f4f4f4",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        {response}
      </pre>
    </div>
  );
}
