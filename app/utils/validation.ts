import { z } from "zod";

export const feedbackFormSchema = z.object({
  feedback: z
    .string()
    .min(5, "Feedback must be at least 5 characters long")
    .max(1000, "Feedback must be no more than 1000 characters"),

  docker: z
    .number()
    .min(1, "Please rate the Docker session")
    .max(5, "Rating must be between 1 and 5"),

  linux: z
    .number()
    .min(1, "Please rate the Linux session")
    .max(5, "Rating must be between 1 and 5"),
});

export type FeedbackFormData = z.infer<typeof feedbackFormSchema>;
