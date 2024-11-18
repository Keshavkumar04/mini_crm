import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const { audienceId } = await request.json();

    console.log("Received audienceId:", audienceId); // Log the audienceId

    // Fetch the audience segment by ID
    const audience = await prismadb.audienceSegment.findUnique({
      where: { id: audienceId },
    });

    console.log("Audience fetched:", audience); // Check if audience is found

    if (!audience) {
      console.log(`Audience with ID ${audienceId} not found.`);
      return NextResponse.json(
        { error: "Audience not found." },
        { status: 404 }
      );
    }

    // Ensure conditions are parsed correctly
    const conditions = audience.conditions as Record<string, any>;
    console.log("Conditions parsed:", conditions); // Log the parsed conditions

    if (!conditions || Object.keys(conditions).length === 0) {
      console.log("Conditions are empty or malformed.");
      return NextResponse.json(
        { error: "Invalid or empty conditions for audience." },
        { status: 400 }
      );
    }

    // Fetch customers based on the parsed conditions
    const customers = await prismadb.customer.findMany({
      where: conditions, // Directly use the conditions object
    });

    console.log("Customers fetched:", customers); // Log the fetched customers

    // Simulate message sending for each customer
    const communications = customers.map((customer) => ({
      audienceId,
      status: Math.random() < 0.9 ? "SENT" : "FAILED", // Simulate 90% success rate
      sentAt: new Date(),
      message: `Hi ${customer.name}, here’s 10% off on your next order!`, // Sample message
    }));

    console.log("Simulated communications:", communications); // Log simulated communications

    // Log communication entries
    const logEntries = await prismadb.communicationLog.createMany({
      data: communications,
    });

    console.log("Log entries created:", logEntries); // Log created entries

    return NextResponse.json(logEntries);
  } catch (error) {
    console.error("Error in sending messages:", error); // Log the error
    return NextResponse.json(
      { error: "Failed to send messages." },
      { status: 500 }
    );
  }
}
