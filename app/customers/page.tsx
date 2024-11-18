// "use client";

// import { useState } from "react";

// export default function CustomerPage() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     totalSpend: "",
//     visits: "",
//     lastVisit: "",
//   });
//   const [response, setResponse] = useState("");

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const res = await fetch("/api/customers", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });
//       const rawText = await res.text(); // Get raw response
//       console.log("Raw response:", rawText);
//       const result = JSON.parse(rawText); // Parse manually
//       setResponse(JSON.stringify(result, null, 2));
//     } catch (error) {
//       console.error("Error during submission:", error);
//       setResponse("Failed to submit customer.");
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Add Customer</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="name"
//           placeholder="Name"
//           onChange={handleInputChange}
//           required
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           onChange={handleInputChange}
//           required
//         />
//         <input
//           type="number"
//           name="totalSpend"
//           placeholder="Total Spend"
//           onChange={handleInputChange}
//           required
//         />
//         <input
//           type="number"
//           name="visits"
//           placeholder="Visits"
//           onChange={handleInputChange}
//           required
//         />
//         <input
//           type="date"
//           name="lastVisit"
//           onChange={handleInputChange}
//           required
//         />
//         <button type="submit">Add Customer</button>
//       </form>
//       <pre>{response}</pre>
//     </div>
//   );
// }

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
    <div
      style={{
        padding: "30px",
        backgroundColor: "#f4f7fc",
        borderRadius: "10px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        maxWidth: "500px",
        margin: "auto",
      }}
    >
      <h2 style={{ textAlign: "center", color: "#333", marginBottom: "20px" }}>
        Add Customer
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
          name="name"
          placeholder="Name"
          onChange={handleInputChange}
          required
          style={{
            padding: "12px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            fontSize: "16px",
            backgroundColor: "#fff",
            color: "#333",
            outline: "none",
            transition: "border-color 0.3s ease",
          }}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleInputChange}
          required
          style={{
            padding: "12px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            fontSize: "16px",
            backgroundColor: "#fff",
            color: "#333",
            outline: "none",
            transition: "border-color 0.3s ease",
          }}
        />
        <input
          type="number"
          name="totalSpend"
          placeholder="Total Spend"
          onChange={handleInputChange}
          required
          style={{
            padding: "12px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            fontSize: "16px",
            backgroundColor: "#fff",
            color: "#333",
            outline: "none",
            transition: "border-color 0.3s ease",
          }}
        />
        <input
          type="number"
          name="visits"
          placeholder="Visits"
          onChange={handleInputChange}
          required
          style={{
            padding: "12px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            fontSize: "16px",
            backgroundColor: "#fff",
            color: "#333",
            outline: "none",
            transition: "border-color 0.3s ease",
          }}
        />
        <input
          type="date"
          name="lastVisit"
          onChange={handleInputChange}
          required
          style={{
            padding: "12px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            fontSize: "16px",
            backgroundColor: "#fff",
            color: "#333",
            outline: "none",
            transition: "border-color 0.3s ease",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "12px",
            backgroundColor: "#007BFF",
            color: "#fff",
            fontSize: "16px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
        >
          Add Customer
        </button>
      </form>
      <pre
        style={{
          marginTop: "20px",
          backgroundColor: "#f1f1f1",
          padding: "10px",
          borderRadius: "5px",
          fontFamily: "monospace",
          fontSize: "14px",
          color: "#333",
          whiteSpace: "pre-wrap",
        }}
      >
        {response}
      </pre>
    </div>
  );
}
