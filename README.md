
# JobFinder - Full Stack MERN Job Portal 

JobFinder is a comprehensive job portal web application built with the MERN stack (MongoDB, Express, React, and Node.js). It connects job seekers with employers, providing a seamless platform for job hunting and talent recruitment.

## Features

### For Job Seekers
- User authentication and profile management
- Create and manage detailed resumes
- Search and filter jobs based on various criteria
- Apply to jobs with personalized cover letters
- Track application status
- Receive job recommendations based on skills and experience

### For Employers
- Company profile management
- Post and manage job listings
- Review and manage applications
- Track job performance metrics
- Connect with qualified candidates

## Tech Stack

### Frontend
- React (with TypeScript)
- React Router for navigation
- React Query for data fetching
- Tailwind CSS for styling
- Shadcn UI components
- Lucide React for icons

### Backend (Mock Implementation)
- Mock API service for demonstration
- In a production environment, this would be replaced with:
  - Node.js/Express.js
  - MongoDB for database
  - JSON Web Tokens for authentication

## Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── auth/          # Authentication related components
│   ├── jobs/          # Job listing related components
│   ├── layout/        # Layout components
│   └── ui/            # Shadcn UI components
├── contexts/          # React context providers
├── hooks/             # Custom React hooks
├── pages/             # Main page components
│   ├── auth/          # Authentication pages
│   ├── employer/      # Employer-specific pages
│   ├── jobseeker/     # Job seeker-specific pages
│   └── jobs/          # Job listing pages
├── services/          # API services
└── types/             # TypeScript type definitions
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone https://github.com/your-username/jobfinder.git
   cd jobfinder
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Start the development server
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:8080`

## Demo Accounts

For demonstration purposes, you can use the following accounts:

### Job Seeker
- Email: john@example.com
- Password: password

### Employer
- Email: bob@techcorp.com
- Password: password

## Environment Variables

For a production environment, create a `.env` file in the root directory with the following variables:

```
# MongoDB connection string
MONGODB_URI=your_mongodb_connection_string

# JWT secret for authentication
JWT_SECRET=your_jwt_secret

# Port for the server (default: 5000)
PORT=5000

# Node environment (development, production)
NODE_ENV=development
```

## Deployment

This application can be deployed to various platforms:

- Frontend: Vercel, Netlify, or any static hosting service
- Backend: Heroku, AWS, Digital Ocean, or any Node.js hosting platform

## Future Enhancements

- Real-time notifications for application updates
- Advanced search with AI-powered job matching
- Integrated messaging system between employers and candidates
- Social media integration for profile enrichment
- Interview scheduling functionality
- Resume analysis and improvement suggestions

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Design inspiration from leading job platforms
- Icons provided by Lucide React
- UI components from Shadcn UI

---

Created as a final year college project demonstration.
