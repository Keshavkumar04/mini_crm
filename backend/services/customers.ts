import prismadb from "@/lib/prismadb";

export async function createCustomer(data: {
  name: string;
  email: string;
  totalSpend: number;
  visits: number;
  lastVisit: string;
}) {
  return await prismadb.customer.create({
    data: {
      name: data.name,
      email: data.email,
      totalSpend: data.totalSpend,
      visits: data.visits,
      lastVisit: new Date(data.lastVisit),
    },
  });
}

export async function getAllCustomers() {
  return await prismadb.customer.findMany();
}
