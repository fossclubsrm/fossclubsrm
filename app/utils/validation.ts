import { z } from "zod";

export const feedbackFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters long")
    .max(50, "Name must be no more than 50 characters"),

  email: z
    .string()
    .email("Please enter a valid email address")
    .refine(
      (email) => email.endsWith("@srmist.edu.in"),
      "Email must be a valid SRM email address ending with @srmist.edu.in"
    ),

  registerNumber: z
    .string()
    .regex(
      /^RA\d{13}$/,
      "Register number must be in format RA followed by 13 digits (e.g., RA2211003010123)"
    ),

  feedback: z
    .string()
    .min(10, "Feedback must be at least 10 characters long")
    .max(1000, "Feedback must be no more than 1000 characters"),

  session1Rating: z
    .number()
    .min(1, "Please rate Session 1")
    .max(5, "Rating must be between 1 and 5"),

  session2Rating: z
    .number()
    .min(1, "Please rate Session 2")
    .max(5, "Rating must be between 1 and 5"),
});

export type FeedbackFormData = z.infer<typeof feedbackFormSchema>;
