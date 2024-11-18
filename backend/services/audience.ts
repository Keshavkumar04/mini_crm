import prismadb from "@/lib/prismadb";

export async function createAudienceSegment(data: {
  name: string;
  conditions: object; // Adjust the type for conditions if needed
}) {
  const customers = await prismadb.customer.findMany({
    where: data.conditions, // Apply conditions dynamically
  });

  return await prismadb.audienceSegment.create({
    data: {
      name: data.name,
      conditions: JSON.stringify(data.conditions),
      audienceSize: customers.length,
    },
  });
}

export async function getAudienceSegments() {
  return await prismadb.audienceSegment.findMany();
}
