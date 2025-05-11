
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: React.ReactNode;
  role?: "jobseeker" | "employer" | "admin";
}

const PrivateRoute = ({ children, role }: PrivateRouteProps) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    // You might want to show a loading spinner here
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role && user?.role !== role) {
    // If a specific role is required and user doesn't have it
    if (user?.role === "jobseeker") {
      return <Navigate to="/jobseeker/dashboard" replace />;
    }
    if (user?.role === "employer") {
      return <Navigate to="/employer/dashboard" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
