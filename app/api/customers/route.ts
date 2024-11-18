import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const { name, email, totalSpend, visits, lastVisit } = await request.json();

    const customer = await prismadb.customer.create({
      data: {
        name,
        email,
        totalSpend: parseFloat(totalSpend),
        visits: parseInt(visits, 10),
        lastVisit: new Date(lastVisit),
      },
    });

    return NextResponse.json(customer);
  } catch (error) {
    console.error("Error creating customer:", error); // Log the error
    return NextResponse.json(
      { error: error.message || "Failed to create customer." },
      { status: 500 }
    );
  }
}
