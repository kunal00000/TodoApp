import { z } from "zod";

export const TodoSchema = z
  .object({
    id: z.number(),
    title: z
      .string()
      .min(1, { message: "Must be 1 or more characters long" })
      .max(30, { message: "Must be 30 or fewer characters long" }),
    description: z.string().optional(),
    status: z.enum(["Completed", "Pending"]),
    updatedAt: z.date(),
  })
  .strict();

export type Todo = z.infer<typeof TodoSchema>;
