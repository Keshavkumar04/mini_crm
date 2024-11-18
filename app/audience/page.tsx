// "use client";

// import { useState } from "react";

// export default function AudiencePage() {
//   const [formData, setFormData] = useState({
//     name: "",
//     conditions: "",
//   });
//   const [response, setResponse] = useState("");

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const res = await fetch("/api/audience", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(formData),
//     });
//     const result = await res.json();
//     setResponse(JSON.stringify(result, null, 2));
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Create Audience</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="name"
//           placeholder="Segment Name"
//           onChange={handleInputChange}
//           required
//         />
//         <textarea
//           name="conditions"
//           placeholder='{"totalSpend": { "gte": 10000 }, "visits": { "lte": 3 }}'
//           onChange={handleInputChange}
//           required
//         />
//         <button type="submit">Create Audience</button>
//       </form>
//       <pre>{response}</pre>
//     </div>
//   );
// }

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

  // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;

  //   // Check if the field is "name" (which should be treated as a string) or a number field
  //   if (name === "name") {
  //     // If it's the "name" field, keep it as a string
  //     setFormData({
  //       ...formData,
  //       [name]: value,
  //     });
  //   } else {
  //     // For number fields, check if the value is empty or a valid number
  //     setFormData({
  //       ...formData,
  //       [name]:
  //         value === ""
  //           ? ""
  //           : !isNaN(Number(value))
  //           ? Number(value)
  //           : formData[name],
  //     });
  //   }
  // };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Ensure 'name' is one of the keys of FormData
    if (name === "name") {
      // If it's the "name" field, treat it as a string
      setFormData({
        ...formData,
        [name]: value,
      });
    } else {
      // For number fields, check if the value is empty or a valid number
      setFormData({
        ...formData,
        // Cast `name` to a key of `FormData`
        [name as keyof FormData]:
          value === ""
            ? ""
            : !isNaN(Number(value))
            ? Number(value)
            : formData[name as keyof FormData], // Safe access using keyof FormData
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
    <div>
      <h1>Create Audience Segment</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Minimum Total Spending (INR)</label>
          <input
            type="number"
            name="minTotalSpending"
            value={
              formData.minTotalSpending !== "" ? formData.minTotalSpending : ""
            }
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Maximum Visit Count</label>
          <input
            type="number"
            name="maxVisitCount"
            value={formData.maxVisitCount !== "" ? formData.maxVisitCount : ""}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Audience Size</label>
          <input
            type="number"
            name="audienceSize"
            value={formData.audienceSize !== "" ? formData.audienceSize : ""}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Create Audience</button>
      </form>
    </div>
  );
};

export default CreateAudience;
