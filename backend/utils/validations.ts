import * as z from "zod";

export const createCustomerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  totalSpend: z.number().nonnegative(),
  visits: z.number().int().nonnegative(),
  lastVisit: z.string(), // Optionally, validate date format
});

export const createAudienceSchema = z.object({
  name: z.string().min(1, "Audience name is required"),
  conditions: z.any(), // You can refine this further
});
