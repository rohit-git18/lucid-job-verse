
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { JobProvider } from "@/contexts/JobContext";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import JobsPage from "./pages/jobs/JobsPage";
import JobDetailPage from "./pages/jobs/JobDetailPage";
import JobSeekerDashboard from "./pages/jobseeker/JobSeekerDashboard";
import EmployerDashboard from "./pages/employer/EmployerDashboard";
import PrivateRoute from "./components/auth/PrivateRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <JobProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/jobs" element={<JobsPage />} />
              <Route path="/jobs/:id" element={<JobDetailPage />} />

              {/* Protected Job Seeker Routes */}
              <Route 
                path="/jobseeker/dashboard" 
                element={
                  <PrivateRoute role="jobseeker">
                    <JobSeekerDashboard />
                  </PrivateRoute>
                } 
              />
              
              {/* Protected Employer Routes */}
              <Route 
                path="/employer/dashboard" 
                element={
                  <PrivateRoute role="employer">
                    <EmployerDashboard />
                  </PrivateRoute>
                } 
              />

              {/* Redirect routes */}
              <Route 
                path="/dashboard" 
                element={<Navigate to="/jobseeker/dashboard" replace />} 
              />

              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </JobProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
