"use client";

import { useState } from "react";

// Define the type for the communication log
interface CommunicationLog {
  audienceId: number;
  status: string;
  sentAt: string;
  message: string;
}

export default function SendMessagePage() {
  const [formData, setFormData] = useState({
    audienceId: "",
  });
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [logs, setLogs] = useState<CommunicationLog[]>([]); // Use the CommunicationLog type for logs

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Reset error on new input
  };

  // Validate audience ID
  const validateInput = () => {
    const audienceId = Number(formData.audienceId);
    if (!Number.isInteger(audienceId) || audienceId <= 0) {
      setError("Invalid Audience ID. Please enter a positive number.");
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateInput()) return;

    console.log("Sending audienceId:", formData.audienceId); // Log audienceId before sending
    setLoading(true);
    setResponse("");
    setError("");
    setLogs([]);

    try {
      const res = await fetch("/api/sendMessage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData), // Make sure this is being sent as JSON
      });

      const result = await res.json();
      if (!res.ok) {
        setError(result.error || "Failed to send messages.");
        return;
      }

      setResponse("Messages sent successfully!");
      setLogs(result.communicationLogs);
    } catch (err) {
      setError("An error occurred while sending messages. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Send Messages</h2>

      {/* Form Section */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <div>
          <label>
            Audience ID:
            <input
              type="number"
              name="audienceId"
              placeholder="Enter Audience ID"
              value={formData.audienceId}
              onChange={handleInputChange}
              required
              style={{ marginLeft: "10px", padding: "5px", width: "200px" }}
            />
          </label>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: "10px",
            padding: "10px 20px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Sending..." : "Send Messages"}
        </button>
      </form>

      {/* Response Section */}
      {response && <p style={{ color: "green" }}>{response}</p>}

      {/* Logs Section */}
      {logs.length > 0 && (
        <div>
          <h3>Communication Logs:</h3>
          <table
            style={{
              borderCollapse: "collapse",
              width: "100%",
              border: "1px solid #ddd",
            }}
          >
            <thead>
              <tr>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                  Audience ID
                </th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                  Status
                </th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                  Sent At
                </th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                  Message
                </th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, index) => (
                <tr key={index}>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {log.audienceId}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {log.status}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {new Date(log.sentAt).toLocaleString()}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {log.message || "N/A"}
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
