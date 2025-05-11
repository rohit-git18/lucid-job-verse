
// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: "jobseeker" | "employer" | "admin";
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface JobSeeker extends User {
  role: "jobseeker";
  resume?: Resume;
  applications: JobApplication[];
  savedJobs: string[]; // Job IDs
}

export interface Employer extends User {
  role: "employer";
  company?: Company;
  postedJobs: Job[];
}

// Resume Types
export interface Resume {
  userId: string;
  contact: ContactInfo;
  summary: string;
  experience: WorkExperience[];
  education: Education[];
  skills: string[];
  certifications?: Certification[];
  languages?: Language[];
}

export interface ContactInfo {
  phone: string;
  email: string;
  location: string;
  website?: string;
  linkedin?: string;
  github?: string;
}

export interface WorkExperience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
  description?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: Date;
  expiryDate?: Date;
  credentialID?: string;
  credentialURL?: string;
}

export interface Language {
  language: string;
  proficiency: "beginner" | "intermediate" | "fluent" | "native";
}

// Company Types
export interface Company {
  id: string;
  name: string;
  description: string;
  logo?: string;
  website: string;
  industry: string;
  size: string;
  location: string;
  foundedYear?: number;
  ownerId: string;
}

// Job Types
export interface Job {
  id: string;
  title: string;
  company: Company;
  location: string;
  type: "full-time" | "part-time" | "contract" | "internship" | "remote";
  category: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  postedAt: Date;
  deadline?: Date;
  status: "open" | "closed" | "draft";
  skills: string[];
  applications: JobApplication[];
  views: number;
}

export interface JobApplication {
  id: string;
  jobId: string;
  userId: string;
  resumeId?: string;
  coverLetter?: string;
  status: "pending" | "reviewed" | "shortlisted" | "rejected" | "hired";
  appliedAt: Date;
  updatedAt: Date;
}

// Search and Filter
export interface JobSearchFilters {
  query?: string;
  location?: string;
  type?: string[];
  category?: string[];
  salary?: {
    min?: number;
    max?: number;
  };
  skills?: string[];
  postedWithin?: number; // days
  experience?: string[];
}

// Auth Types
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

// Component Prop Types
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface FilterProps {
  filters: JobSearchFilters;
  onFilterChange: (filters: JobSearchFilters) => void;
}
