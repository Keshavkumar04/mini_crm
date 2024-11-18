"use client";

import { useEffect, useState } from "react";

interface Campaign {
  id: number;
  audience: { name: string } | null; // Audience relation
  status: string;
  sentAt: string; // New field to display timestamp
}

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCampaigns() {
      try {
        const res = await fetch("/api/campaigns");
        if (!res.ok) {
          throw new Error("Failed to fetch campaigns.");
        }
        const data: Campaign[] = await res.json();
        setCampaigns(data);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchCampaigns();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (campaigns.length === 0) {
    return <div>No campaigns found.</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Campaign History</h2>
      <table
        style={{
          width: "100%",
          border: "1px solid black",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th style={{ border: "1px solid black", padding: "10px" }}>ID</th>
            <th style={{ border: "1px solid black", padding: "10px" }}>
              Audience
            </th>
            <th style={{ border: "1px solid black", padding: "10px" }}>
              Status
            </th>
            <th style={{ border: "1px solid black", padding: "10px" }}>
              Sent At
            </th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((campaign) => (
            <tr key={campaign.id}>
              <td style={{ border: "1px solid black", padding: "10px" }}>
                {campaign.id}
              </td>
              <td style={{ border: "1px solid black", padding: "10px" }}>
                {campaign.audience?.name || "N/A"}
              </td>
              <td style={{ border: "1px solid black", padding: "10px" }}>
                {campaign.status}
              </td>
              <td style={{ border: "1px solid black", padding: "10px" }}>
                {new Date(campaign.sentAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
