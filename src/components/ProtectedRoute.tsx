
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types/user";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRole?: UserRole;
}

export const ProtectedRoute = ({ 
  children, 
  allowedRole 
}: ProtectedRouteProps) => {
  const { currentUser, userData, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && userData?.role !== allowedRole) {
    // Redirect to appropriate dashboard if authenticated but wrong role
    if (userData?.role === "student") {
      return <Navigate to="/student/dashboard" replace />;
    } else if (userData?.role === "teacher") {
      return <Navigate to="/teacher/dashboard" replace />;
    } else {
      // Fallback if role is unknown
      return <Navigate to="/login" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
