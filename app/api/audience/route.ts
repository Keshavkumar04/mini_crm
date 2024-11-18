// import prismadb from "@/lib/prismadb";
// import { NextResponse } from "next/server";

// export async function POST(request: Request): Promise<NextResponse> {
//   try {
//     // Log the request data for debugging
//     const { name, conditions } = await request.json();
//     console.log("Received data:", { name, conditions });

//     // Validate and parse the conditions (this may fail if the JSON is not valid)
//     let parsedConditions;
//     try {
//       parsedConditions = JSON.parse(conditions);
//     } catch (e) {
//       throw new Error("Invalid JSON in conditions");
//     }
//     console.log("Parsed conditions:", parsedConditions);

//     // Create a helper function to transform conditions into Prisma query format
//     const buildWhereClause = (conditions: any[]) => {
//       return conditions.reduce((where, condition) => {
//         const { field, operator, value } = condition;
//         switch (operator) {
//           case "gte":
//             where[field] = { gte: value };
//             break;
//           case "lte":
//             where[field] = { lte: value };
//             break;
//           case "eq":
//             where[field] = { equals: value };
//             break;
//           // Add more operators as needed
//           default:
//             break;
//         }
//         return where;
//       }, {});
//     };

//     // Convert conditions to Prisma's where clause format
//     const prismaWhereClause = buildWhereClause(parsedConditions);

//     // Fetch customers based on the conditions
//     const filteredCustomers = await prismadb.customer.findMany({
//       where: prismaWhereClause,
//     });

//     // Create the audience segment
//     const audienceSegment = await prismadb.audienceSegment.create({
//       data: {
//         name,
//         conditions: JSON.stringify(parsedConditions),
//         audienceSize: filteredCustomers.length,
//       },
//     });

//     // Return the audience segment as the response
//     return NextResponse.json(audienceSegment);
//   } catch (error) {
//     console.error("Error creating audience segment:", error.message || error);
//     return NextResponse.json(
//       { error: error.message || "Failed to create audience segment." },
//       { status: 400 }
//     );
//   }
// }

// import prismadb from "@/lib/prismadb";
// import { NextResponse } from "next/server";

// export async function POST(request: Request): Promise<NextResponse> {
//   try {
//     // Log the request data for debugging
//     const { name, conditions } = await request.json();
//     console.log("Received data:", { name, conditions });

//     // Validate and parse the conditions (this may fail if the JSON is not valid)
//     let parsedConditions;
//     try {
//       parsedConditions = JSON.parse(conditions); // Parse the conditions string into an object
//     } catch (e) {
//       throw new Error("Invalid JSON in conditions");
//     }
//     console.log("Parsed conditions:", parsedConditions);

//     // Create a helper function to transform conditions into Prisma query format
//     const buildWhereClause = (conditions: any[]) => {
//       return conditions.reduce((where, condition) => {
//         const { field, operator, value } = condition;
//         switch (operator) {
//           case "gte":
//             where[field] = { gte: value };
//             break;
//           case "lte":
//             where[field] = { lte: value };
//             break;
//           case "eq":
//             where[field] = { equals: value };
//             break;
//           // Add more operators as needed
//           default:
//             break;
//         }
//         return where;
//       }, {});
//     };

//     // Convert conditions to Prisma's where clause format
//     const prismaWhereClause = buildWhereClause(parsedConditions);

//     // Fetch customers based on the conditions
//     const filteredCustomers = await prismadb.customer.findMany({
//       where: prismaWhereClause,
//     });

//     // Create the audience segment
//     const audienceSegment = await prismadb.audienceSegment.create({
//       data: {
//         name,
//         conditions: parsedConditions, // Store the conditions as a JSON object
//         audienceSize: filteredCustomers.length,
//       },
//     });

//     // Return the audience segment as the response
//     return NextResponse.json(audienceSegment);
//   } catch (error) {
//     console.error("Error creating audience segment:", error.message || error);
//     return NextResponse.json(
//       { error: error.message || "Failed to create audience segment." },
//       { status: 400 }
//     );
//   }
// }

import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, minTotalSpending, maxVisitCount, audienceSize } =
      await req.json();

    // Log the incoming data to verify it's coming in as expected
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

    // Check if minTotalSpending and maxVisitCount are valid numbers or set them to null if not provided
    const validMinTotalSpending =
      minTotalSpending !== undefined && minTotalSpending !== null
        ? minTotalSpending
        : null;
    const validMaxVisitCount =
      maxVisitCount !== undefined && maxVisitCount !== null
        ? maxVisitCount
        : null;

    // Create a new audience segment in the database using Prisma
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
