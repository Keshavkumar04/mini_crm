import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const { audienceId } = await request.json();

    console.log("Received audienceId:", audienceId);

    const audience = await prismadb.audienceSegment.findUnique({
      where: { id: audienceId },
    });

    console.log("Audience fetched:", audience);

    if (!audience) {
      console.log(`Audience with ID ${audienceId} not found.`);
      return NextResponse.json(
        { error: "Audience not found." },
        { status: 404 }
      );
    }

    const conditions = audience.conditions as Record<string, any>;
    console.log("Conditions parsed:", conditions);

    if (!conditions || Object.keys(conditions).length === 0) {
      console.log("Conditions are empty or malformed.");
      return NextResponse.json(
        { error: "Invalid or empty conditions for audience." },
        { status: 400 }
      );
    }

    const customers = await prismadb.customer.findMany({
      where: conditions,
    });

    console.log("Customers fetched:", customers); // Log the fetched customers

    const communications = customers.map((customer) => ({
      audienceId,
      status: Math.random() < 0.9 ? "SENT" : "FAILED",
      sentAt: new Date(),
      message: `Hi ${customer.name}, here’s 10% off on your next order!`,
    }));

    console.log("Simulated communications:", communications);

    // Log communication entries
    const logEntries = await prismadb.communicationLog.createMany({
      data: communications,
    });

    console.log("Log entries created:", logEntries);

    return NextResponse.json(logEntries);
  } catch (error) {
    console.error("Error in sending messages:", error);
    return NextResponse.json(
      { error: "Failed to send messages." },
      { status: 500 }
    );
  }
}
