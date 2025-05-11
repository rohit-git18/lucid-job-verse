
import { toast } from "sonner";
import { 
  User, 
  Job, 
  Company, 
  Resume, 
  JobApplication, 
  JobSearchFilters 
} from "../types";

// Mock data service for development/demo
// In a real project, this would connect to your backend API

// Sample users
const users: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "jobseeker",
    avatar: "https://i.pravatar.cc/150?img=1",
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2023-01-15")
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "jobseeker",
    avatar: "https://i.pravatar.cc/150?img=5",
    createdAt: new Date("2023-02-20"),
    updatedAt: new Date("2023-02-20")
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@techcorp.com",
    role: "employer",
    avatar: "https://i.pravatar.cc/150?img=3",
    createdAt: new Date("2023-01-10"),
    updatedAt: new Date("2023-01-10")
  }
];

// Sample companies
const companies: Company[] = [
  {
    id: "1",
    name: "Tech Corp",
    description: "Leading technology company focused on innovation",
    logo: "https://logo.clearbit.com/google.com",
    website: "https://techcorp.com",
    industry: "Technology",
    size: "1000+",
    location: "San Francisco, CA",
    foundedYear: 2000,
    ownerId: "3"
  },
  {
    id: "2",
    name: "Finance Pro",
    description: "Financial solutions for modern businesses",
    logo: "https://logo.clearbit.com/jpmorgan.com",
    website: "https://financepro.com",
    industry: "Finance",
    size: "500-1000",
    location: "New York, NY",
    foundedYear: 1995,
    ownerId: "4"
  },
  {
    id: "3",
    name: "Health Plus",
    description: "Innovative healthcare solutions",
    logo: "https://logo.clearbit.com/unitedhealth.com",
    website: "https://healthplus.com",
    industry: "Healthcare",
    size: "201-500",
    location: "Boston, MA",
    foundedYear: 2010,
    ownerId: "5"
  }
];

// Sample jobs
const jobs: Job[] = [
  {
    id: "1",
    title: "Frontend Developer",
    company: companies[0],
    location: "San Francisco, CA",
    type: "full-time",
    category: "Development",
    description: "We're looking for a frontend developer with React experience to join our team.",
    requirements: [
      "3+ years of experience with React",
      "Strong TypeScript skills",
      "Experience with state management libraries",
      "CSS/SCSS proficiency"
    ],
    responsibilities: [
      "Develop new user-facing features",
      "Build reusable components",
      "Optimize applications for maximum speed and scalability",
      "Collaborate with designers and backend developers"
    ],
    salary: {
      min: 90000,
      max: 120000,
      currency: "USD"
    },
    postedAt: new Date("2023-04-01"),
    deadline: new Date("2023-05-01"),
    status: "open",
    skills: ["React", "TypeScript", "CSS", "HTML"],
    applications: [],
    views: 145
  },
  {
    id: "2",
    title: "Backend Engineer",
    company: companies[0],
    location: "San Francisco, CA",
    type: "full-time",
    category: "Development",
    description: "Backend engineer with Node.js and database experience needed for our growing team.",
    requirements: [
      "4+ years of backend development experience",
      "Strong Node.js skills",
      "Experience with MongoDB and SQL databases",
      "Understanding of server-side rendering"
    ],
    responsibilities: [
      "Design and implement APIs",
      "Optimize database queries",
      "Ensure high performance and reliability",
      "Write clean, maintainable code"
    ],
    salary: {
      min: 100000,
      max: 130000,
      currency: "USD"
    },
    postedAt: new Date("2023-03-25"),
    deadline: new Date("2023-04-25"),
    status: "open",
    skills: ["Node.js", "MongoDB", "Express", "SQL"],
    applications: [],
    views: 98
  },
  {
    id: "3",
    title: "Financial Analyst",
    company: companies[1],
    location: "New York, NY",
    type: "full-time",
    category: "Finance",
    description: "Seeking a financial analyst to join our team and help with financial modeling and reporting.",
    requirements: [
      "Bachelor's degree in Finance or related field",
      "2+ years of experience in financial analysis",
      "Excel proficiency",
      "Knowledge of financial reporting"
    ],
    responsibilities: [
      "Prepare financial reports and forecasts",
      "Analyze financial data",
      "Support budgeting processes",
      "Identify trends and opportunities"
    ],
    salary: {
      min: 75000,
      max: 95000,
      currency: "USD"
    },
    postedAt: new Date("2023-04-05"),
    deadline: new Date("2023-05-05"),
    status: "open",
    skills: ["Financial Modeling", "Excel", "Data Analysis", "Reporting"],
    applications: [],
    views: 67
  },
  {
    id: "4",
    title: "UX/UI Designer",
    company: companies[0],
    location: "Remote",
    type: "full-time",
    category: "Design",
    description: "Creative UX/UI designer needed to craft beautiful and functional interfaces.",
    requirements: [
      "3+ years of UX/UI design experience",
      "Proficiency with Figma and Adobe Creative Suite",
      "Portfolio demonstrating UI design skills",
      "User-centered design experience"
    ],
    responsibilities: [
      "Create wireframes, prototypes, and mock-ups",
      "Conduct user research and testing",
      "Collaborate with product and engineering teams",
      "Define and implement visual design guidelines"
    ],
    salary: {
      min: 85000,
      max: 110000,
      currency: "USD"
    },
    postedAt: new Date("2023-04-10"),
    deadline: new Date("2023-05-10"),
    status: "open",
    skills: ["Figma", "UI Design", "UX Research", "Prototyping"],
    applications: [],
    views: 112
  },
  {
    id: "5",
    title: "Healthcare Administrator",
    company: companies[2],
    location: "Boston, MA",
    type: "full-time",
    category: "Healthcare",
    description: "Healthcare administrator needed to oversee daily operations and improve efficiency.",
    requirements: [
      "Bachelor's degree in Healthcare Administration or related field",
      "3+ years of experience in healthcare management",
      "Knowledge of healthcare regulations",
      "Strong organizational skills"
    ],
    responsibilities: [
      "Oversee daily operations",
      "Manage staff and resources",
      "Ensure compliance with regulations",
      "Improve efficiency and patient care"
    ],
    salary: {
      min: 70000,
      max: 90000,
      currency: "USD"
    },
    postedAt: new Date("2023-04-08"),
    deadline: new Date("2023-05-08"),
    status: "open",
    skills: ["Healthcare Management", "Regulatory Compliance", "Staff Management", "Budget Planning"],
    applications: [],
    views: 43
  },
  {
    id: "6",
    title: "DevOps Engineer",
    company: companies[0],
    location: "San Francisco, CA",
    type: "full-time",
    category: "Development",
    description: "DevOps engineer needed to streamline our development and deployment processes.",
    requirements: [
      "3+ years of DevOps experience",
      "Expertise with AWS or Azure",
      "Experience with Docker and Kubernetes",
      "CI/CD pipeline implementation"
    ],
    responsibilities: [
      "Automate deployment processes",
      "Manage cloud infrastructure",
      "Implement monitoring and logging solutions",
      "Collaborate with development teams to improve workflows"
    ],
    salary: {
      min: 110000,
      max: 140000,
      currency: "USD"
    },
    postedAt: new Date("2023-04-03"),
    deadline: new Date("2023-05-03"),
    status: "open",
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform"],
    applications: [],
    views: 78
  }
];

// Sample job applications
const applications: JobApplication[] = [
  {
    id: "1",
    jobId: "1",
    userId: "1",
    resumeId: "1",
    coverLetter: "I am excited to apply for this position...",
    status: "pending",
    appliedAt: new Date("2023-04-02"),
    updatedAt: new Date("2023-04-02")
  },
  {
    id: "2",
    jobId: "3",
    userId: "1",
    resumeId: "1",
    coverLetter: "I believe my financial background makes me a great fit...",
    status: "reviewed",
    appliedAt: new Date("2023-04-06"),
    updatedAt: new Date("2023-04-08")
  }
];

// Sample resumes
const resumes: Resume[] = [
  {
    userId: "1",
    contact: {
      phone: "555-123-4567",
      email: "john@example.com",
      location: "San Francisco, CA",
      linkedin: "linkedin.com/in/johndoe"
    },
    summary: "Frontend developer with 4 years of experience specializing in React and TypeScript.",
    experience: [
      {
        id: "1",
        title: "Frontend Developer",
        company: "Web Solutions Inc.",
        location: "San Francisco, CA",
        startDate: new Date("2020-01-01"),
        current: true,
        description: "Developed responsive web applications using React and TypeScript."
      },
      {
        id: "2",
        title: "Junior Developer",
        company: "Tech Startup",
        location: "San Francisco, CA",
        startDate: new Date("2018-06-01"),
        endDate: new Date("2019-12-31"),
        current: false,
        description: "Worked on frontend features and fixed bugs for a SaaS platform."
      }
    ],
    education: [
      {
        id: "1",
        degree: "Bachelor of Science in Computer Science",
        institution: "University of California",
        location: "Berkeley, CA",
        startDate: new Date("2014-09-01"),
        endDate: new Date("2018-05-30"),
        current: false
      }
    ],
    skills: ["React", "TypeScript", "JavaScript", "HTML", "CSS", "Redux", "Git"]
  }
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// API functions
export const api = {
  // Auth
  login: async (email: string, password: string) => {
    try {
      await delay(800);
      const user = users.find(u => u.email === email);
      
      if (!user) {
        throw new Error("User not found");
      }
      
      if (password !== "password") {
        throw new Error("Invalid password");
      }
      
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error: any) {
      toast.error(error.message || "Login failed");
      throw error;
    }
  },
  
  register: async (name: string, email: string, password: string, role: "jobseeker" | "employer") => {
    try {
      await delay(800);
      if (users.some(u => u.email === email)) {
        throw new Error("Email already in use");
      }
      
      const newUser: User = {
        id: (users.length + 1).toString(),
        name,
        email,
        role,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      users.push(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      return newUser;
    } catch (error: any) {
      toast.error(error.message || "Registration failed");
      throw error;
    }
  },
  
  logout: async () => {
    await delay(300);
    localStorage.removeItem("user");
    return true;
  },
  
  getCurrentUser: () => {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  },
  
  // Jobs
  getJobs: async (filters?: JobSearchFilters, page = 1, limit = 10) => {
    await delay(500);
    let filteredJobs = [...jobs];
    
    if (filters) {
      if (filters.query) {
        const query = filters.query.toLowerCase();
        filteredJobs = filteredJobs.filter(job => 
          job.title.toLowerCase().includes(query) || 
          job.description.toLowerCase().includes(query) ||
          job.company.name.toLowerCase().includes(query)
        );
      }
      
      if (filters.location) {
        const location = filters.location.toLowerCase();
        filteredJobs = filteredJobs.filter(job => 
          job.location.toLowerCase().includes(location)
        );
      }
      
      if (filters.type && filters.type.length > 0) {
        filteredJobs = filteredJobs.filter(job => 
          filters.type!.includes(job.type)
        );
      }
      
      if (filters.category && filters.category.length > 0) {
        filteredJobs = filteredJobs.filter(job => 
          filters.category!.includes(job.category)
        );
      }
      
      if (filters.skills && filters.skills.length > 0) {
        filteredJobs = filteredJobs.filter(job => 
          filters.skills!.some(skill => job.skills.includes(skill))
        );
      }
      
      if (filters.salary) {
        if (filters.salary.min !== undefined) {
          filteredJobs = filteredJobs.filter(job => 
            job.salary && job.salary.min >= (filters.salary!.min || 0)
          );
        }
        
        if (filters.salary.max !== undefined) {
          filteredJobs = filteredJobs.filter(job => 
            job.salary && job.salary.max <= (filters.salary!.max || Infinity)
          );
        }
      }
      
      if (filters.postedWithin) {
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - filters.postedWithin);
        filteredJobs = filteredJobs.filter(job => 
          job.postedAt >= cutoffDate
        );
      }
    }
    
    // Pagination
    const totalItems = filteredJobs.length;
    const totalPages = Math.ceil(totalItems / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedJobs = filteredJobs.slice(startIndex, endIndex);
    
    return {
      jobs: paginatedJobs,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems
      }
    };
  },
  
  getJobById: async (id: string) => {
    await delay(400);
    const job = jobs.find(j => j.id === id);
    if (!job) {
      throw new Error("Job not found");
    }
    return job;
  },
  
  createJob: async (jobData: Partial<Job>) => {
    try {
      await delay(800);
      const user = api.getCurrentUser();
      if (!user || user.role !== "employer") {
        throw new Error("Only employers can post jobs");
      }
      
      const company = companies.find(c => c.ownerId === user.id);
      if (!company) {
        throw new Error("Company not found");
      }
      
      const newJob: Job = {
        id: (jobs.length + 1).toString(),
        company,
        applications: [],
        views: 0,
        postedAt: new Date(),
        status: "open",
        ...jobData
      } as Job;
      
      jobs.push(newJob);
      toast.success("Job posted successfully");
      return newJob;
    } catch (error: any) {
      toast.error(error.message || "Failed to create job");
      throw error;
    }
  },
  
  updateJob: async (id: string, jobData: Partial<Job>) => {
    try {
      await delay(800);
      const index = jobs.findIndex(j => j.id === id);
      if (index === -1) {
        throw new Error("Job not found");
      }
      
      const user = api.getCurrentUser();
      if (!user || (user.role !== "employer" && jobs[index].company.ownerId !== user.id)) {
        throw new Error("Not authorized to update this job");
      }
      
      jobs[index] = { ...jobs[index], ...jobData, updatedAt: new Date() };
      toast.success("Job updated successfully");
      return jobs[index];
    } catch (error: any) {
      toast.error(error.message || "Failed to update job");
      throw error;
    }
  },
  
  deleteJob: async (id: string) => {
    try {
      await delay(800);
      const index = jobs.findIndex(j => j.id === id);
      if (index === -1) {
        throw new Error("Job not found");
      }
      
      const user = api.getCurrentUser();
      if (!user || (user.role !== "employer" && jobs[index].company.ownerId !== user.id)) {
        throw new Error("Not authorized to delete this job");
      }
      
      jobs.splice(index, 1);
      toast.success("Job deleted successfully");
      return true;
    } catch (error: any) {
      toast.error(error.message || "Failed to delete job");
      throw error;
    }
  },
  
  // Applications
  getApplicationsForUser: async (userId: string) => {
    await delay(500);
    return applications.filter(app => app.userId === userId);
  },
  
  getApplicationsForJob: async (jobId: string) => {
    await delay(500);
    const user = api.getCurrentUser();
    const job = jobs.find(j => j.id === jobId);
    
    if (!user || !job || (user.role === "employer" && job.company.ownerId !== user.id)) {
      throw new Error("Not authorized to view these applications");
    }
    
    return applications.filter(app => app.jobId === jobId);
  },
  
  applyForJob: async (jobId: string, application: Partial<JobApplication>) => {
    try {
      await delay(800);
      const user = api.getCurrentUser();
      if (!user || user.role !== "jobseeker") {
        throw new Error("Only job seekers can apply for jobs");
      }
      
      const job = jobs.find(j => j.id === jobId);
      if (!job) {
        throw new Error("Job not found");
      }
      
      if (job.status !== "open") {
        throw new Error("This job is no longer accepting applications");
      }
      
      const existingApplication = applications.find(
        app => app.jobId === jobId && app.userId === user.id
      );
      
      if (existingApplication) {
        throw new Error("You've already applied for this job");
      }
      
      const newApplication: JobApplication = {
        id: (applications.length + 1).toString(),
        jobId,
        userId: user.id,
        status: "pending",
        appliedAt: new Date(),
        updatedAt: new Date(),
        ...application
      };
      
      applications.push(newApplication);
      toast.success("Application submitted successfully");
      return newApplication;
    } catch (error: any) {
      toast.error(error.message || "Failed to submit application");
      throw error;
    }
  },
  
  updateApplicationStatus: async (applicationId: string, status: JobApplication["status"]) => {
    try {
      await delay(600);
      const index = applications.findIndex(a => a.id === applicationId);
      if (index === -1) {
        throw new Error("Application not found");
      }
      
      const user = api.getCurrentUser();
      const job = jobs.find(j => j.id === applications[index].jobId);
      
      if (!user || !job || (user.role === "employer" && job.company.ownerId !== user.id)) {
        throw new Error("Not authorized to update this application");
      }
      
      applications[index] = { 
        ...applications[index], 
        status, 
        updatedAt: new Date() 
      };
      
      toast.success("Application status updated");
      return applications[index];
    } catch (error: any) {
      toast.error(error.message || "Failed to update application status");
      throw error;
    }
  },
  
  // Resume
  getResume: async (userId: string) => {
    await delay(500);
    const user = api.getCurrentUser();
    if (!user || (user.id !== userId && user.role !== "employer")) {
      throw new Error("Not authorized to view this resume");
    }
    
    return resumes.find(r => r.userId === userId);
  },
  
  updateResume: async (userId: string, resumeData: Partial<Resume>) => {
    try {
      await delay(800);
      const user = api.getCurrentUser();
      if (!user || user.id !== userId) {
        throw new Error("Not authorized to update this resume");
      }
      
      let resume = resumes.find(r => r.userId === userId);
      
      if (resume) {
        const index = resumes.findIndex(r => r.userId === userId);
        resumes[index] = { ...resume, ...resumeData };
        toast.success("Resume updated successfully");
        return resumes[index];
      } else {
        const newResume: Resume = {
          userId,
          contact: {
            phone: "",
            email: user.email,
            location: ""
          },
          summary: "",
          experience: [],
          education: [],
          skills: [],
          ...resumeData
        };
        
        resumes.push(newResume);
        toast.success("Resume created successfully");
        return newResume;
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to update resume");
      throw error;
    }
  },
  
  // Company
  getCompany: async (companyId: string) => {
    await delay(500);
    const company = companies.find(c => c.id === companyId);
    if (!company) {
      throw new Error("Company not found");
    }
    return company;
  },
  
  getCompanyByOwner: async (userId: string) => {
    await delay(500);
    return companies.find(c => c.ownerId === userId);
  },
  
  updateCompany: async (companyId: string, companyData: Partial<Company>) => {
    try {
      await delay(800);
      const user = api.getCurrentUser();
      const index = companies.findIndex(c => c.id === companyId);
      
      if (index === -1) {
        throw new Error("Company not found");
      }
      
      if (!user || (user.role !== "employer" && companies[index].ownerId !== user.id)) {
        throw new Error("Not authorized to update this company");
      }
      
      companies[index] = { ...companies[index], ...companyData };
      toast.success("Company updated successfully");
      return companies[index];
    } catch (error: any) {
      toast.error(error.message || "Failed to update company");
      throw error;
    }
  },
  
  createCompany: async (companyData: Partial<Company>) => {
    try {
      await delay(800);
      const user = api.getCurrentUser();
      if (!user || user.role !== "employer") {
        throw new Error("Only employers can create companies");
      }
      
      const existingCompany = companies.find(c => c.ownerId === user.id);
      if (existingCompany) {
        throw new Error("You already have a company");
      }
      
      const newCompany: Company = {
        id: (companies.length + 1).toString(),
        name: "",
        description: "",
        website: "",
        industry: "",
        size: "",
        location: "",
        ownerId: user.id,
        ...companyData
      };
      
      companies.push(newCompany);
      toast.success("Company created successfully");
      return newCompany;
    } catch (error: any) {
      toast.error(error.message || "Failed to create company");
      throw error;
    }
  }
};
