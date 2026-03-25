import { z } from "zod";

export const ContactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().max(200).optional(),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(5000),
  // Honeypot: must be empty (bots fill this in)
  website: z.string().max(0, "Invalid submission").optional(),
});

export const ProjectSchema = z.object({
  title: z.string().min(1).max(255),
  slug: z
    .string()
    .min(1)
    .max(255)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be kebab-case"),
  description: z.string().min(1),
  imageUrl: z.string().url().optional().nullable(),
  technologies: z.array(z.string().min(1)).min(1),
  githubUrl: z.string().url().optional().nullable(),
  liveUrl: z.string().url().optional().nullable(),
  published: z.boolean().default(true),
});

export const BlogPostSchema = z.object({
  title: z.string().min(1).max(255),
  slug: z
    .string()
    .min(1)
    .max(255)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be kebab-case"),
  excerpt: z.string().max(500).optional().nullable(),
  content: z.string().min(1),
  coverImageUrl: z.string().url().optional().nullable(),
  published: z.boolean().default(false),
});

export const AdminOtpRequestSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export const AdminOtpVerifySchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  code: z.string().regex(/^\d{6}$/, "OTP must be a 6-digit code"),
});

export const ExperienceSchema = z.object({
  company: z.string().min(1).max(255),
  position: z.string().min(1).max(255),
  startDate: z.string().datetime({ offset: true }).or(z.string().date()),
  endDate: z
    .string()
    .datetime({ offset: true })
    .or(z.string().date())
    .optional()
    .nullable(),
  description: z.string().optional().nullable(),
  orderIndex: z.number().int().default(0),
});

export type ContactFormInput = z.infer<typeof ContactFormSchema>;
export type ProjectInput = z.infer<typeof ProjectSchema>;
export type BlogPostInput = z.infer<typeof BlogPostSchema>;
export type ExperienceInput = z.infer<typeof ExperienceSchema>;
export type AdminOtpRequestInput = z.infer<typeof AdminOtpRequestSchema>;
export type AdminOtpVerifyInput = z.infer<typeof AdminOtpVerifySchema>;
