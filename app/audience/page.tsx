// "use client";

// import { useState, ChangeEvent, FormEvent } from "react";

// // Define the structure of the form data with types
// interface FormData {
//   name: string;
//   minTotalSpending: number | ""; // Allow empty string to handle empty input
//   maxVisitCount: number | ""; // Allow empty string to handle empty input
//   audienceSize: number | ""; // Allow empty string to handle empty input
// }

// const CreateAudience = () => {
//   const [formData, setFormData] = useState<FormData>({
//     name: "",
//     minTotalSpending: "",
//     maxVisitCount: "",
//     audienceSize: "",
//   });

//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;

//     // Check if the field is "name" (which should be treated as a string) or a number field
//     if (name === "name") {
//       // If it's the "name" field, keep it as a string
//       setFormData({
//         ...formData,
//         [name]: value,
//       });
//     } else {
//       // For number fields, check if the value is empty or a valid number
//       setFormData({
//         ...formData,
//         [name]:
//           value === ""
//             ? ""
//             : !isNaN(Number(value))
//             ? Number(value)
//             : formData[name],
//       });
//     }
//   };

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     // Prepare the data for submission
//     const audienceData = {
//       name: formData.name,
//       minTotalSpending:
//         formData.minTotalSpending !== "" ? formData.minTotalSpending : null, // Convert to null if empty
//       maxVisitCount:
//         formData.maxVisitCount !== "" ? formData.maxVisitCount : null, // Convert to null if empty
//       audienceSize: formData.audienceSize !== "" ? formData.audienceSize : 0,
//     };

//     try {
//       // Send data to the backend API (POST request to /api/audience)
//       const response = await fetch("/api/audience", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(audienceData),
//       });
//       console.log(audienceData);

//       if (response.ok) {
//         console.log("ok");
//       } else {
//         // Handle error
//         alert("Failed to create audience");
//       }
//     } catch (error) {
//       console.error("Error creating audience:", error);
//       alert("An error occurred while creating the audience");
//     }
//   };

//   return (
//     <div>
//       <h1>Create Audience Segment</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Name</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div>
//           <label>Minimum Total Spending (INR)</label>
//           <input
//             type="number"
//             name="minTotalSpending"
//             value={
//               formData.minTotalSpending !== "" ? formData.minTotalSpending : ""
//             }
//             onChange={handleChange}
//           />
//         </div>

//         <div>
//           <label>Maximum Visit Count</label>
//           <input
//             type="number"
//             name="maxVisitCount"
//             value={formData.maxVisitCount !== "" ? formData.maxVisitCount : ""}
//             onChange={handleChange}
//           />
//         </div>

//         <div>
//           <label>Audience Size</label>
//           <input
//             type="number"
//             name="audienceSize"
//             value={formData.audienceSize !== "" ? formData.audienceSize : ""}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <button type="submit">Create Audience</button>
//       </form>
//     </div>
//   );
// };

// export default CreateAudience;

"use client";

import { useState, ChangeEvent, FormEvent } from "react";

// Define the structure of the form data with types
interface FormData {
  name: string;
  minTotalSpending: number | ""; // Allow empty string to handle empty input
  maxVisitCount: number | ""; // Allow empty string to handle empty input
  audienceSize: number | ""; // Allow empty string to handle empty input
}

const CreateAudience = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    minTotalSpending: "",
    maxVisitCount: "",
    audienceSize: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Check if the field is "name" (which should be treated as a string) or a number field
    if (name === "name") {
      // If it's the "name" field, keep it as a string
      setFormData({
        ...formData,
        [name]: value,
      });
    } else {
      // For number fields, check if the value is empty or a valid number
      setFormData({
        ...formData,
        [name]:
          value === ""
            ? ""
            : !isNaN(Number(value))
            ? Number(value)
            : formData[name],
      });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Prepare the data for submission
    const audienceData = {
      name: formData.name,
      minTotalSpending:
        formData.minTotalSpending !== "" ? formData.minTotalSpending : null, // Convert to null if empty
      maxVisitCount:
        formData.maxVisitCount !== "" ? formData.maxVisitCount : null, // Convert to null if empty
      audienceSize: formData.audienceSize !== "" ? formData.audienceSize : 0, // Default to 0 if empty
    };

    try {
      // Send data to the backend API (POST request to /api/audience)
      const response = await fetch("/api/audience", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(audienceData),
      });
      console.log(audienceData);

      if (response.ok) {
        console.log("ok");
      } else {
        // Handle error
        alert("Failed to create audience");
      }
    } catch (error) {
      console.error("Error creating audience:", error);
      alert("An error occurred while creating the audience");
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#333" }}>
        Create Audience Segment
      </h1>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ marginBottom: "5px", color: "#555" }}>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{
              padding: "10px",
              fontSize: "14px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              outline: "none",
              transition: "border-color 0.3s ease",
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ marginBottom: "5px", color: "#555" }}>
            Minimum Total Spending (INR)
          </label>
          <input
            type="number"
            name="minTotalSpending"
            value={
              formData.minTotalSpending !== "" ? formData.minTotalSpending : ""
            }
            onChange={handleChange}
            style={{
              padding: "10px",
              fontSize: "14px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              outline: "none",
              transition: "border-color 0.3s ease",
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ marginBottom: "5px", color: "#555" }}>
            Maximum Visit Count
          </label>
          <input
            type="number"
            name="maxVisitCount"
            value={formData.maxVisitCount !== "" ? formData.maxVisitCount : ""}
            onChange={handleChange}
            style={{
              padding: "10px",
              fontSize: "14px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              outline: "none",
              transition: "border-color 0.3s ease",
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ marginBottom: "5px", color: "#555" }}>
            Audience Size
          </label>
          <input
            type="number"
            name="audienceSize"
            value={formData.audienceSize !== "" ? formData.audienceSize : ""}
            onChange={handleChange}
            required
            style={{
              padding: "10px",
              fontSize: "14px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              outline: "none",
              transition: "border-color 0.3s ease",
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "12px 20px",
            fontSize: "16px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
        >
          Create Audience
        </button>
      </form>
    </div>
  );
};

export default CreateAudience;
