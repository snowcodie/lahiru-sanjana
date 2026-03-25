// Shared domain types used across pages, API routes, and lib

export interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  imageUrl: string | null;
  technologies: string[];
  githubUrl: string | null;
  liveUrl: string | null;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  coverImageUrl: string | null;
  published: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Experience {
  id: number;
  company: string;
  position: string;
  startDate: string;
  endDate: string | null;
  description: string | null;
  orderIndex: number;
  createdAt: string;
}

export interface ContactInfo {
  id: number;
  key: string;
  value: string;
}

export interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  ipAddress: string | null;
  spamScore: number;
  createdAt: string;
}

export interface ApiSuccess<T> {
  data: T;
  message?: string;
}

export interface ApiError {
  error: string;
  details?: Record<string, string[]>;
}
