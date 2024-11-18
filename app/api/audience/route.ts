import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, minTotalSpending, maxVisitCount, audienceSize } =
      await req.json();

    console.log("Received data:", {
      name,
      minTotalSpending,
      maxVisitCount,
      audienceSize,
    });

    // Check if name and audienceSize are provided, they are mandatory fields
    if (!name || audienceSize === undefined || audienceSize === null) {
      return NextResponse.json(
        { error: "Name and Audience Size are required." },
        { status: 400 }
      );
    }

    const validMinTotalSpending =
      minTotalSpending !== undefined && minTotalSpending !== null
        ? minTotalSpending
        : null;
    const validMaxVisitCount =
      maxVisitCount !== undefined && maxVisitCount !== null
        ? maxVisitCount
        : null;

    const audienceSegment = await prismadb.audienceSegment.create({
      data: {
        name,
        minTotalSpending: validMinTotalSpending,
        maxVisitCount: validMaxVisitCount,
        audienceSize: audienceSize, // Ensure it's a valid number
      },
    });

    return NextResponse.json(audienceSegment, { status: 200 });
  } catch (error) {
    console.error("Error creating audience segment:", error);
    return NextResponse.json(
      { error: "Failed to create audience segment" },
      { status: 500 }
    );
  }
}
