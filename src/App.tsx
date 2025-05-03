
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Auth Pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// Student Pages
import StudentDashboard from "./pages/student/StudentDashboard";

// Teacher Pages
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import QRScanPage from "./pages/teacher/QRScanPage";
import AttendancePage from "./pages/teacher/AttendancePage";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppRoutes = () => (
  <Routes>
    {/* Public routes */}
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    
    {/* Student routes */}
    <Route path="/student/dashboard" element={
      <ProtectedRoute allowedRole="student">
        <StudentDashboard />
      </ProtectedRoute>
    } />
    
    {/* Teacher routes */}
    <Route path="/teacher/dashboard" element={
      <ProtectedRoute allowedRole="teacher">
        <TeacherDashboard />
      </ProtectedRoute>
    } />
    <Route path="/teacher/scan" element={
      <ProtectedRoute allowedRole="teacher">
        <QRScanPage />
      </ProtectedRoute>
    } />
    <Route path="/teacher/attendance" element={
      <ProtectedRoute allowedRole="teacher">
        <AttendancePage />
      </ProtectedRoute>
    } />
    
    {/* Redirect root to login */}
    <Route path="/" element={<Login />} />
    
    {/* Catch all route */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <TooltipProvider>
          <AppRoutes />
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
