import { z } from "zod";

export const quoteRequestSchema = z.object({
  name: z.string().min(2, "Enter your full name"),
  company: z.string().optional(),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(7, "Enter a valid phone number"),
  service: z.enum(["ict", "renewable-energy", "both"], {
    errorMap: () => ({ message: "Select a service area" }),
  }),
  budget: z.string().optional(),
  message: z.string().min(20, "Give us at least a couple of sentences on the project"),
  // honeypot — bots fill hidden fields, humans never see this one
  website: z.string().max(0).optional(),
});
export type QuoteRequestInput = z.infer<typeof quoteRequestSchema>;

export const contactMessageSchema = z.object({
  name: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email"),
  subject: z.string().min(3, "Enter a subject"),
  message: z.string().min(10, "Message is too short"),
  website: z.string().max(0).optional(),
});
export type ContactMessageInput = z.infer<typeof contactMessageSchema>;

export const jobApplicationSchema = z.object({
  fullName: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(7, "Enter a valid phone number"),
  linkedin: z.string().url("Enter a valid URL").optional().or(z.literal("")),
  coverNote: z.string().min(20, "Tell us briefly why you're a fit").max(1000),
  website: z.string().max(0).optional(),
});
export type JobApplicationInput = z.infer<typeof jobApplicationSchema>;
