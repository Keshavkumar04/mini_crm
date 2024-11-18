import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  try {
    const campaigns = await prismadb.communicationLog.findMany({
      orderBy: { sentAt: "desc" },
      include: {
        audience: {
          select: { name: true }, // Fetch only the necessary fields
        },
      },
    });

    if (!campaigns || campaigns.length === 0) {
      return NextResponse.json(
        { error: "No campaigns found." },
        { status: 404 }
      );
    }

    return NextResponse.json(campaigns);
  } catch (error) {
    console.error("Error fetching campaigns:", error); // Add this
    return NextResponse.json(
      { error: "Failed to fetch campaign history." },
      { status: 500 }
    );
  }
}
