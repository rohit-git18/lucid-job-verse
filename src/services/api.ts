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

// Updated list of companies including international MNCs and Indian IT companies
const companies: Company[] = [
  {
    id: "1",
    name: "Google",
    description: "Leading technology company focused on search and cloud technologies",
    logo: "https://logo.clearbit.com/google.com",
    website: "https://google.com",
    industry: "Technology",
    size: "10000+",
    location: "Mountain View, CA",
    foundedYear: 1998,
    ownerId: "3"
  },
  {
    id: "2",
    name: "JP Morgan Chase",
    description: "Global financial services and investment banking",
    logo: "https://logo.clearbit.com/jpmorganchase.com",
    website: "https://jpmorganchase.com",
    industry: "Finance",
    size: "250000+",
    location: "New York, NY",
    foundedYear: 1799,
    ownerId: "4"
  },
  {
    id: "3",
    name: "UnitedHealth Group",
    description: "Healthcare and insurance provider",
    logo: "https://logo.clearbit.com/unitedhealthgroup.com",
    website: "https://unitedhealthgroup.com",
    industry: "Healthcare",
    size: "350000+",
    location: "Minnetonka, MN",
    foundedYear: 1977,
    ownerId: "5"
  },
  {
    id: "4",
    name: "Adobe",
    description: "Creative and document software solutions",
    logo: "https://logo.clearbit.com/adobe.com",
    website: "https://adobe.com",
    industry: "Technology",
    size: "25000+",
    location: "San Jose, CA",
    foundedYear: 1982,
    ownerId: "6"
  },
  {
    id: "5",
    name: "Coursera",
    description: "Online learning platform with university partnerships",
    logo: "https://logo.clearbit.com/coursera.org",
    website: "https://coursera.org",
    industry: "Education",
    size: "1000+",
    location: "Mountain View, CA",
    foundedYear: 2012,
    ownerId: "7"
  },
  {
    id: "6",
    name: "Tesla",
    description: "Electric vehicles and clean energy solutions",
    logo: "https://logo.clearbit.com/tesla.com",
    website: "https://tesla.com",
    industry: "Automotive/Energy",
    size: "100000+",
    location: "Austin, TX",
    foundedYear: 2003,
    ownerId: "8"
  },
  {
    id: "7",
    name: "FedEx",
    description: "Global shipping and logistics services",
    logo: "https://logo.clearbit.com/fedex.com",
    website: "https://fedex.com",
    industry: "Logistics",
    size: "450000+",
    location: "Memphis, TN",
    foundedYear: 1971,
    ownerId: "9"
  },
  {
    id: "8",
    name: "DoorDash",
    description: "Food delivery platform",
    logo: "https://logo.clearbit.com/doordash.com",
    website: "https://doordash.com",
    industry: "Food & Delivery",
    size: "8000+",
    location: "San Francisco, CA",
    foundedYear: 2013,
    ownerId: "10"
  },
  {
    id: "9",
    name: "Tata Consultancy Services",
    description: "Indian multinational IT services and consulting company",
    logo: "https://logo.clearbit.com/tcs.com",
    website: "https://www.tcs.com",
    industry: "IT Services",
    size: "500000+",
    location: "Mumbai, India",
    foundedYear: 1968,
    ownerId: "11"
  },
  {
    id: "10",
    name: "Infosys",
    description: "Indian multinational IT company providing business consulting, technology, and outsourcing services",
    logo: "https://logo.clearbit.com/infosys.com",
    website: "https://www.infosys.com",
    industry: "IT Services",
    size: "300000+",
    location: "Bangalore, India",
    foundedYear: 1981,
    ownerId: "12"
  },
  {
    id: "11",
    name: "Wipro",
    description: "Leading global information technology company",
    logo: "https://logo.clearbit.com/wipro.com",
    website: "https://www.wipro.com",
    industry: "IT Services",
    size: "250000+",
    location: "Bangalore, India",
    foundedYear: 1945,
    ownerId: "13"
  },
  {
    id: "12",
    name: "HCL Technologies",
    description: "Global technology company helping enterprises reimagine their businesses",
    logo: "https://logo.clearbit.com/hcltech.com",
    website: "https://www.hcltech.com",
    industry: "IT Services",
    size: "200000+",
    location: "Noida, India",
    foundedYear: 1976,
    ownerId: "14"
  },
  {
    id: "13",
    name: "Microsoft",
    description: "Global technology company providing software, devices, and cloud services",
    logo: "https://logo.clearbit.com/microsoft.com",
    website: "https://www.microsoft.com",
    industry: "Technology",
    size: "180000+",
    location: "Redmond, WA",
    foundedYear: 1975,
    ownerId: "15"
  },
  {
    id: "14",
    name: "Amazon",
    description: "E-commerce, cloud computing, digital streaming, and AI company",
    logo: "https://logo.clearbit.com/amazon.com",
    website: "https://www.amazon.com",
    industry: "Technology/Retail",
    size: "1400000+",
    location: "Seattle, WA",
    foundedYear: 1994,
    ownerId: "16"
  },
  {
    id: "15",
    name: "IBM",
    description: "Technology and consulting company with expertise in AI and cloud computing",
    logo: "https://logo.clearbit.com/ibm.com",
    website: "https://www.ibm.com",
    industry: "Technology",
    size: "280000+",
    location: "Armonk, NY",
    foundedYear: 1911,
    ownerId: "17"
  },
  {
    id: "16",
    name: "Samsung Electronics",
    description: "Multinational electronics company",
    logo: "https://logo.clearbit.com/samsung.com",
    website: "https://www.samsung.com",
    industry: "Electronics",
    size: "287000+",
    location: "Suwon, South Korea",
    foundedYear: 1969,
    ownerId: "18"
  },
  {
    id: "17",
    name: "Tech Mahindra",
    description: "Indian multinational provider of information technology and networking technology solutions",
    logo: "https://logo.clearbit.com/techmahindra.com",
    website: "https://www.techmahindra.com",
    industry: "IT Services",
    size: "125000+",
    location: "Pune, India",
    foundedYear: 1986,
    ownerId: "19"
  },
  {
    id: "18",
    name: "Cognizant",
    description: "American multinational IT services and consulting company with significant operations in India",
    logo: "https://logo.clearbit.com/cognizant.com",
    website: "https://www.cognizant.com",
    industry: "IT Services",
    size: "300000+",
    location: "Teaneck, NJ",
    foundedYear: 1994,
    ownerId: "20"
  },
  {
    id: "19",
    name: "L&T Infotech",
    description: "Global technology consulting and digital solutions company",
    logo: "https://logo.clearbit.com/lntinfotech.com",
    website: "https://www.lntinfotech.com",
    industry: "IT Services",
    size: "30000+",
    location: "Mumbai, India",
    foundedYear: 1997,
    ownerId: "21"
  },
  {
    id: "20",
    name: "Accenture",
    description: "Global professional services company with leading capabilities in digital, cloud and security",
    logo: "https://logo.clearbit.com/accenture.com",
    website: "https://www.accenture.com",
    industry: "Consulting",
    size: "500000+",
    location: "Dublin, Ireland",
    foundedYear: 1989,
    ownerId: "22"
  }
];

// Sample jobs with updated dates (more recent)
const jobs: Job[] = [
  {
    id: "1",
    title: "Frontend Developer",
    company: companies[0],
    location: "Mountain View, CA",
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
    postedAt: new Date("2025-04-15"),
    updatedAt: new Date("2025-04-15"),
    deadline: new Date("2025-05-15"),
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
    updatedAt: new Date("2023-03-25"),
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
    updatedAt: new Date("2023-04-05"),
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
    updatedAt: new Date("2023-04-10"),
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
    updatedAt: new Date("2023-04-08"),
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
    updatedAt: new Date("2023-04-03"),
    deadline: new Date("2023-05-03"),
    status: "open",
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform"],
    applications: [],
    views: 78
  },
  {
    id: "7",
    title: "UI/UX Designer",
    company: companies[3],
    location: "Los Angeles, CA",
    type: "full-time",
    category: "Design",
    description: "Join our creative team to design beautiful and intuitive user interfaces for web and mobile applications.",
    requirements: [
      "3+ years of UI/UX design experience",
      "Proficient with Figma and Adobe Creative Suite",
      "Experience with user research and testing",
      "Strong portfolio showcasing previous work"
    ],
    responsibilities: [
      "Create wireframes and prototypes",
      "Design user-centered interfaces",
      "Collaborate with developers to implement designs",
      "Conduct usability testing"
    ],
    salary: {
      min: 80000,
      max: 110000,
      currency: "USD"
    },
    postedAt: new Date("2023-03-29"),
    updatedAt: new Date("2023-03-29"),
    deadline: new Date("2023-04-29"),
    status: "open",
    skills: ["Figma", "Adobe XD", "UI Design", "UX Research"],
    applications: [],
    views: 67
  },
  {
    id: "8",
    title: "Data Scientist",
    company: companies[0],
    location: "Remote",
    type: "full-time",
    category: "Data Science",
    description: "Looking for an experienced data scientist to help us extract insights from our large datasets.",
    requirements: [
      "Master's or PhD in Data Science, Statistics, or related field",
      "3+ years of experience with machine learning",
      "Proficient in Python and data visualization tools",
      "Experience with big data technologies"
    ],
    responsibilities: [
      "Develop predictive models",
      "Analyze large datasets",
      "Create data visualizations",
      "Present findings to stakeholders"
    ],
    salary: {
      min: 115000,
      max: 160000,
      currency: "USD"
    },
    postedAt: new Date("2023-03-22"),
    updatedAt: new Date("2023-03-22"),
    deadline: new Date("2023-04-22"),
    status: "open",
    skills: ["Python", "Machine Learning", "SQL", "Data Visualization", "Statistics"],
    applications: [],
    views: 123
  },
  {
    id: "9",
    title: "Product Manager",
    company: companies[3],
    location: "Los Angeles, CA",
    type: "full-time",
    category: "Product",
    description: "We're seeking a product manager to lead the development of our digital products.",
    requirements: [
      "5+ years of product management experience",
      "Experience with agile methodologies",
      "Strong analytical skills",
      "Excellent communication abilities"
    ],
    responsibilities: [
      "Define product strategy and roadmap",
      "Work with designers and developers",
      "Conduct market research",
      "Prioritize features based on business value"
    ],
    salary: {
      min: 100000,
      max: 150000,
      currency: "USD"
    },
    postedAt: new Date("2023-03-20"),
    updatedAt: new Date("2023-03-20"),
    deadline: new Date("2023-04-20"),
    status: "open",
    skills: ["Product Development", "Agile", "User Stories", "Roadmapping"],
    applications: [],
    views: 89
  },
  {
    id: "10",
    title: "Marketing Specialist",
    company: companies[4],
    location: "Austin, TX",
    type: "full-time",
    category: "Marketing",
    description: "Join our marketing team to help promote our educational technology solutions.",
    requirements: [
      "3+ years in digital marketing",
      "Experience with content creation",
      "Knowledge of SEO and SEM",
      "Data-driven mindset"
    ],
    responsibilities: [
      "Create marketing campaigns",
      "Manage social media accounts",
      "Analyze marketing metrics",
      "Develop content strategy"
    ],
    salary: {
      min: 65000,
      max: 85000,
      currency: "USD"
    },
    postedAt: new Date("2023-03-25"),
    updatedAt: new Date("2023-03-25"),
    deadline: new Date("2023-04-25"),
    status: "open",
    skills: ["Digital Marketing", "SEO", "Content Creation", "Analytics"],
    applications: [],
    views: 56
  },
  {
    id: "11",
    title: "Full Stack Developer",
    company: companies[5],
    location: "Remote",
    type: "full-time",
    category: "Development",
    description: "Looking for a full stack developer to work on our renewable energy software platform.",
    requirements: [
      "4+ years of full stack development",
      "Experience with React and Node.js",
      "Database design experience",
      "Understanding of cloud services (AWS/Azure)"
    ],
    responsibilities: [
      "Build end-to-end features",
      "Optimize application performance",
      "Design database schemas",
      "Deploy applications to cloud environments"
    ],
    salary: {
      min: 90000,
      max: 130000,
      currency: "USD"
    },
    postedAt: new Date("2023-03-18"),
    updatedAt: new Date("2023-03-18"),
    deadline: new Date("2023-04-18"),
    status: "open",
    skills: ["React", "Node.js", "MongoDB", "AWS", "Full Stack"],
    applications: [],
    views: 112
  },
  {
    id: "12",
    title: "Operations Manager",
    company: companies[6],
    location: "Chicago, IL",
    type: "full-time",
    category: "Operations",
    description: "We're looking for an operations manager to oversee our logistics processes.",
    requirements: [
      "5+ years in logistics or operations",
      "Experience managing teams",
      "Knowledge of supply chain management",
      "Strong problem-solving skills"
    ],
    responsibilities: [
      "Oversee daily operations",
      "Optimize logistics processes",
      "Manage inventory and resources",
      "Lead a team of logistics coordinators"
    ],
    salary: {
      min: 85000,
      max: 110000,
      currency: "USD"
    },
    postedAt: new Date("2023-03-15"),
    updatedAt: new Date("2023-03-15"),
    deadline: new Date("2023-04-15"),
    status: "open",
    skills: ["Operations Management", "Logistics", "Supply Chain", "Team Management"],
    applications: [],
    views: 78
  },
  {
    id: "13",
    title: "Mobile App Developer",
    company: companies[7],
    location: "Seattle, WA",
    type: "full-time",
    category: "Development",
    description: "Join our mobile development team to build our food delivery applications.",
    requirements: [
      "3+ years of mobile app development",
      "Experience with React Native or Flutter",
      "Knowledge of iOS and Android platforms",
      "Understanding of app store publishing processes"
    ],
    responsibilities: [
      "Develop cross-platform mobile applications",
      "Implement UI/UX designs",
      "Optimize app performance",
      "Fix bugs and technical issues"
    ],
    salary: {
      min: 85000,
      max: 120000,
      currency: "USD"
    },
    postedAt: new Date("2023-03-22"),
    updatedAt: new Date("2023-03-22"),
    deadline: new Date("2023-04-22"),
    status: "open",
    skills: ["React Native", "Flutter", "Mobile Development", "JavaScript", "Dart"],
    applications: [],
    views: 95
  },
  {
    id: "14",
    title: "Finance Analyst",
    company: companies[1],
    location: "New York, NY",
    type: "full-time",
    category: "Finance",
    description: "Seeking a financial analyst to join our corporate finance team.",
    requirements: [
      "Bachelor's degree in Finance or related field",
      "2+ years of financial analysis experience",
      "Proficient in Excel and financial modeling",
      "Knowledge of financial reporting standards"
    ],
    responsibilities: [
      "Prepare financial reports and forecasts",
      "Conduct financial analysis",
      "Support budgeting processes",
      "Assist with investor relations"
    ],
    salary: {
      min: 70000,
      max: 90000,
      currency: "USD"
    },
    postedAt: new Date("2023-03-25"),
    updatedAt: new Date("2023-03-25"),
    deadline: new Date("2023-04-25"),
    status: "open",
    skills: ["Financial Analysis", "Excel", "Budgeting", "Forecasting"],
    applications: [],
    views: 63
  },
  {
    id: "15",
    title: "Customer Support Specialist",
    company: companies[4],
    location: "Remote",
    type: "full-time",
    category: "Customer Service",
    description: "Join our support team to help customers make the most of our educational platform.",
    requirements: [
      "2+ years in customer support",
      "Excellent communication skills",
      "Problem-solving abilities",
      "Experience with help desk software"
    ],
    responsibilities: [
      "Respond to customer inquiries",
      "Troubleshoot technical issues",
      "Document common problems",
      "Provide feedback to product team"
    ],
    salary: {
      min: 45000,
      max: 60000,
      currency: "USD"
    },
    postedAt: new Date("2023-03-29"),
    updatedAt: new Date("2023-03-29"),
    deadline: new Date("2023-04-29"),
    status: "open",
    skills: ["Customer Service", "Communication", "Troubleshooting", "Zendesk"],
    applications: [],
    views: 42
  },
  {
    id: "16",
    title: "Content Marketing Manager",
    company: companies[7],
    location: "Seattle, WA",
    type: "full-time",
    category: "Marketing",
    description: "Looking for a content marketing manager to drive our content strategy.",
    requirements: [
      "4+ years in content marketing",
      "Experience managing a content calendar",
      "Strong writing and editing skills",
      "SEO knowledge"
    ],
    responsibilities: [
      "Create content marketing strategy",
      "Produce blog posts and articles",
      "Oversee social media content",
      "Analyze content performance"
    ],
    salary: {
      min: 75000,
      max: 95000,
      currency: "USD"
    },
    postedAt: new Date("2023-03-20"),
    updatedAt: new Date("2023-03-20"),
    deadline: new Date("2023-04-20"),
    status: "open",
    skills: ["Content Marketing", "SEO", "Copywriting", "Editorial Planning"],
    applications: [],
    views: 51
  },
  {
    id: "17",
    title: "IT Support Technician",
    company: companies[0],
    location: "San Francisco, CA",
    type: "full-time",
    category: "IT",
    description: "Join our IT team to provide technical support to our employees.",
    requirements: [
      "2+ years in IT support",
      "Knowledge of Windows and Mac operating systems",
      "Experience with network troubleshooting",
      "Familiarity with IT security best practices"
    ],
    responsibilities: [
      "Resolve technical issues",
      "Set up new employee workstations",
      "Maintain IT documentation",
      "Assist with software installations"
    ],
    salary: {
      min: 55000,
      max: 70000,
      currency: "USD"
    },
    postedAt: new Date("2023-03-27"),
    updatedAt: new Date("2023-03-27"),
    deadline: new Date("2023-04-27"),
    status: "open",
    skills: ["IT Support", "Troubleshooting", "Hardware", "Networking", "Windows", "macOS"],
    applications: [],
    views: 38
  },
  {
    id: "18",
    title: "HR Coordinator",
    company: companies[5],
    location: "Denver, CO",
    type: "full-time",
    category: "Human Resources",
    description: "Seeking an HR Coordinator to support our human resources department.",
    requirements: [
      "2+ years in HR administration",
      "Knowledge of HR policies and procedures",
      "Experience with HRIS systems",
      "Strong organizational skills"
    ],
    responsibilities: [
      "Assist with recruitment process",
      "Maintain employee records",
      "Coordinate onboarding activities",
      "Support HR initiatives"
    ],
    salary: {
      min: 50000,
      max: 65000,
      currency: "USD"
    },
    postedAt: new Date("2023-03-18"),
    updatedAt: new Date("2023-03-18"),
    deadline: new Date("2023-04-18"),
    status: "open",
    skills: ["HR Administration", "Recruitment", "Onboarding", "HRIS"],
    applications: [],
    views: 45
  },
  {
    id: "19",
    title: "Social Media Manager",
    company: companies[3],
    location: "Los Angeles, CA",
    type: "full-time",
    category: "Marketing",
    description: "We're looking for a social media manager to grow our online presence.",
    requirements: [
      "3+ years managing social media accounts",
      "Experience with social media analytics",
      "Content creation skills",
      "Knowledge of social media trends"
    ],
    responsibilities: [
      "Manage company social media accounts",
      "Create engaging content",
      "Analyze social media performance",
      "Develop social media strategy"
    ],
    salary: {
      min: 60000,
      max: 80000,
      currency: "USD"
    },
    postedAt: new Date("2023-03-22"),
    updatedAt: new Date("2023-03-22"),
    deadline: new Date("2023-04-22"),
    status: "open",
    skills: ["Social Media Marketing", "Content Creation", "Analytics", "Community Management"],
    applications: [],
    views: 72
  },
  {
    id: "20",
    title: "Software Engineer Intern",
    company: companies[0],
    location: "San Francisco, CA",
    type: "internship",
    category: "Development",
    description: "Summer internship opportunity for aspiring software engineers.",
    requirements: [
      "Currently pursuing a Computer Science degree",
      "Knowledge of at least one programming language",
      "Eager to learn and grow",
      "Good problem-solving skills"
    ],
    responsibilities: [
      "Assist with development tasks",
      "Learn software development practices",
      "Participate in code reviews",
      "Work on assigned projects"
    ],
    salary: {
      min: 25000,
      max: 35000,
      currency: "USD"
    },
    postedAt: new Date("2023-03-28"),
    updatedAt: new Date("2023-03-28"),
    deadline: new Date("2023-04-28"),
    status: "open",
    skills: ["Programming", "Software Development", "Learning Mindset"],
    applications: [],
    views: 105
  },
  {
    id: "21",
    title: "Project Manager",
    company: companies[2],
    location: "Boston, MA",
    type: "full-time",
    category: "Management",
    description: "Looking for a project manager to oversee our healthcare technology projects.",
    requirements: [
      "5+ years of project management experience",
      "PMP certification preferred",
      "Experience in healthcare industry",
      "Strong leadership skills"
    ],
    responsibilities: [
      "Lead project teams",
      "Develop project plans",
      "Manage timelines and budgets",
      "Report on project status"
    ],
    salary: {
      min: 90000,
      max: 120000,
      currency: "USD"
    },
    postedAt: new Date("2023-03-24"),
    updatedAt: new Date("2023-03-24"),
    deadline: new Date("2023-04-24"),
    status: "open",
    skills: ["Project Management", "Agile", "Budgeting", "Leadership", "Healthcare"],
    applications: [],
    views: 62
  },
  {
    id: "22",
    title: "Data Entry Specialist",
    company: companies[1],
    location: "Remote",
    type: "part-time",
    category: "Administrative",
    description: "Part-time position for accurate data entry and management.",
    requirements: [
      "1+ years of data entry experience",
      "Fast typing speed",
      "Attention to detail",
      "Basic Excel skills"
    ],
    responsibilities: [
      "Enter data into company systems",
      "Verify data accuracy",
      "Maintain digital records",
      "Perform basic data analysis"
    ],
    salary: {
      min: 18,
      max: 22,
      currency: "USD"
    },
    postedAt: new Date("2023-03-29"),
    updatedAt: new Date("2023-03-29"),
    deadline: new Date("2023-04-29"),
    status: "open",
    skills: ["Data Entry", "Excel", "Accuracy", "Organization"],
    applications: [],
    views: 39
  },
  {
    id: "23",
    title: "Content Writer",
    company: companies[4],
    location: "Austin, TX",
    type: "contract",
    category: "Content",
    description: "Contract position for creating educational content for our platform.",
    requirements: [
      "3+ years of content writing experience",
      "SEO knowledge",
      "Experience in education industry preferred",
      "Portfolio of previous work"
    ],
    responsibilities: [
      "Create engaging educational content",
      "Optimize content for SEO",
      "Follow brand guidelines",
      "Meet content deadlines"
    ],
    salary: {
      min: 40,
      max: 60,
      currency: "USD"
    },
    postedAt: new Date("2023-03-26"),
    updatedAt: new Date("2023-03-26"),
    deadline: new Date("2023-04-26"),
    status: "open",
    skills: ["Content Writing", "SEO", "Education", "Copywriting"],
    applications: [],
    views: 48
  }
];

// Update all job dates to be recent (within past month)
for (let job of jobs) {
  if (job.id !== "1") { // Skip the first one we already updated manually
    // Random date in the last month
    const daysAgo = Math.floor(Math.random() * 30);
    const postedDate = new Date();
    postedDate.setDate(postedDate.getDate() - daysAgo);
    
    job.postedAt = postedDate;
    job.updatedAt = postedDate;
    
    // Set deadline to be 30 days after posting
    const deadline = new Date(postedDate);
    deadline.setDate(deadline.getDate() + 30);
    job.deadline = deadline;
  }
}

// Fallback logo for any company if the clearbit logo fails
const getCompanyLogo = (company: Company): string => {
  if (!company.logo || company.logo.includes('clearbit')) {
    // Return a backup logo from a reliable source
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(company.name)}&background=random&color=fff&size=128`;
  }
  return company.logo;
};

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
    
    // Add company logo fallbacks before returning
    for (const job of paginatedJobs) {
      job.company.logo = getCompanyLogo(job.company);
    }
    
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
    
    // Add logo fallback
    job.company.logo = getCompanyLogo(job.company);
    
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
      
      // Add updatedAt to jobData
      const updatedJobData = { 
        ...jobData, 
        updatedAt: new Date() 
      };
      
      jobs[index] = { ...jobs[index], ...updatedJobData };
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
    
    // Add logo fallback
    company.logo = getCompanyLogo(company);
    
    return company;
  },
  
  getCompanyByOwner: async (userId: string) => {
    await delay(500);
    const company = companies.find(c => c.ownerId === userId);
    
    if (company) {
      // Add logo fallback
      company.logo = getCompanyLogo(company);
    }
    
    return company;
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
  },
  
  // Add jobs and companies properties for direct access
  jobs,
  companies
};
