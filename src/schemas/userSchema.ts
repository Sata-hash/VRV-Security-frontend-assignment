import { z } from "zod";

export const userSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must not exceed 50 characters"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  role: z.enum(["user", "admin"], {
    errorMap: () => ({ message: "Please select a valid role" }),
  }),
  status: z.enum(["active", "inactive"], {
    errorMap: () => ({ message: "Please select a valid status" }),
  }),
});

export type UserFormData = z.infer<typeof userSchema>;
