import { z } from "zod";

export type DateErrors = {
  startDate: string;
  endDate: string;
};

export const createTaskSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().max(500),
  status: z.string(),
  priority: z.string(),
  tags: z.string().max(200).optional(),
  assignedUserIds: z
    .array(z.string())
    .min(1, "At least one user must be assigned")
    .max(10, "Cannot assign more than 10 users"),
});

export type CreateFormData = z.infer<typeof createTaskSchema>;

export const modalTaskDefaultValues = {
  title: "",
  description: "",
  status: "",
  priority: "",
  tags: "",
  assignedUserIds: [],
  startDate: new Date(),
  endDate: new Date(),
};
