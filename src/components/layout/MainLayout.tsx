
import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Briefcase, Menu, Search, User } from "lucide-react";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Briefcase className="h-6 w-6 text-jobportal-primary" />
            <span className="text-xl font-semibold text-jobportal-dark">JobFinder</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/jobs"
              className={`text-sm font-medium ${
                location.pathname.includes("/jobs") 
                  ? "text-jobportal-primary" 
                  : "text-gray-600 hover:text-jobportal-primary"
              }`}
            >
              Find Jobs
            </Link>
            {isAuthenticated && user?.role === "employer" && (
              <Link
                to="/employer/dashboard"
                className={`text-sm font-medium ${
                  location.pathname.includes("/employer") 
                    ? "text-jobportal-primary" 
                    : "text-gray-600 hover:text-jobportal-primary"
                }`}
              >
                Employer Dashboard
              </Link>
            )}
            {isAuthenticated && user?.role === "jobseeker" && (
              <Link
                to="/jobseeker/dashboard"
                className={`text-sm font-medium ${
                  location.pathname.includes("/jobseeker") 
                    ? "text-jobportal-primary" 
                    : "text-gray-600 hover:text-jobportal-primary"
                }`}
              >
                Dashboard
              </Link>
            )}
            <Link
              to="/companies"
              className={`text-sm font-medium ${
                location.pathname.includes("/companies") 
                  ? "text-jobportal-primary" 
                  : "text-gray-600 hover:text-jobportal-primary"
              }`}
            >
              Companies
            </Link>
          </nav>

          {/* User actions */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="hidden md:flex"
                >
                  <Bell className="h-5 w-5" />
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className="relative h-8 w-8 rounded-full"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user?.avatar} />
                        <AvatarFallback>
                          {user?.name ? getInitials(user.name) : "U"}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => navigate(`/${user?.role}/profile`)}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    {user?.role === "jobseeker" && (
                      <DropdownMenuItem onClick={() => navigate("/jobseeker/applications")}>
                        <Briefcase className="mr-2 h-4 w-4" />
                        <span>My Applications</span>
                      </DropdownMenuItem>
                    )}
                    {user?.role === "employer" && (
                      <DropdownMenuItem onClick={() => navigate("/employer/post-job")}>
                        <Briefcase className="mr-2 h-4 w-4" />
                        <span>Post a Job</span>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="md:hidden"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="hidden md:inline-block text-sm font-medium text-jobportal-primary hover:text-jobportal-primary/90"
                >
                  Sign In
                </Link>
                <Button 
                  onClick={() => navigate("/register")}
                  variant="default"
                  className="hidden md:inline-flex bg-jobportal-primary hover:bg-jobportal-primary/90"
                >
                  Sign Up
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="md:hidden"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 px-4 bg-white border-t">
            <div className="space-y-3">
              <Link
                to="/jobs"
                className="block text-sm font-medium text-gray-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Find Jobs
              </Link>
              
              {isAuthenticated && user?.role === "employer" && (
                <Link
                  to="/employer/dashboard"
                  className="block text-sm font-medium text-gray-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Employer Dashboard
                </Link>
              )}
              
              {isAuthenticated && user?.role === "jobseeker" && (
                <Link
                  to="/jobseeker/dashboard"
                  className="block text-sm font-medium text-gray-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
              )}
              
              <Link
                to="/companies"
                className="block text-sm font-medium text-gray-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Companies
              </Link>
              
              {!isAuthenticated && (
                <>
                  <Link
                    to="/login"
                    className="block text-sm font-medium text-gray-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="block text-sm font-medium text-gray-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-jobportal-dark text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Briefcase className="h-6 w-6 mr-2" />
                <span className="font-semibold text-lg">JobFinder</span>
              </div>
              <p className="text-gray-400 text-sm">
                Connecting talents with opportunities. Your next career move is just a click away.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">For Job Seekers</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/jobs" className="hover:text-white">Browse Jobs</Link></li>
                <li><Link to="/companies" className="hover:text-white">Browse Companies</Link></li>
                <li><Link to="/jobseeker/dashboard" className="hover:text-white">Dashboard</Link></li>
                <li><Link to="/jobseeker/profile" className="hover:text-white">Profile</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">For Employers</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/employer/post-job" className="hover:text-white">Post a Job</Link></li>
                <li><Link to="/employer/dashboard" className="hover:text-white">Dashboard</Link></li>
                <li><Link to="/employer/profile" className="hover:text-white">Company Profile</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>info@jobfinder.com</li>
                <li>1-800-JOB-FIND</li>
                <li>123 Career Plaza, Suite 101</li>
                <li>San Francisco, CA 94103</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>© {new Date().getFullYear()} JobFinder. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
