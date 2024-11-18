import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const { customerId, orderDate, amount } = await request.json();

    // Input validation
    if (!customerId || customerId <= 0 || !Number.isInteger(customerId)) {
      return NextResponse.json(
        { error: "Invalid customer ID." },
        { status: 400 }
      );
    }
    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: "Amount must be greater than zero." },
        { status: 400 }
      );
    }
    if (!orderDate || isNaN(new Date(orderDate).getTime())) {
      return NextResponse.json(
        { error: "Invalid order date." },
        { status: 400 }
      );
    }

    // Check if customer exists
    const customer = await prismadb.customer.findUnique({
      where: { id: customerId },
    });

    if (!customer) {
      return NextResponse.json(
        { error: `Customer with ID ${customerId} does not exist.` },
        { status: 404 }
      );
    }

    // Create the order
    const order = await prismadb.order.create({
      data: {
        customerId,
        orderDate: new Date(orderDate),
        amount,
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error("Error creating order:", error.stack || error);
    return NextResponse.json(
      { error: "Failed to create order. Please try again later." },
      { status: 500 }
    );
  }
}
