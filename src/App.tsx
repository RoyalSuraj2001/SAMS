
import React from "react";
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
import CalendarPage from "./pages/student/CalendarPage";
import CoursesPage from "./pages/student/CoursesPage";
import GradesPage from "./pages/student/GradesPage";
import ProfilePage from "./pages/student/ProfilePage";

// Teacher Pages
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import QRScanPage from "./pages/teacher/QRScanPage";
import AttendancePage from "./pages/teacher/AttendancePage";
import ReportsPage from "./pages/teacher/ReportsPage";
import TeacherCalendarPage from "./pages/teacher/TeacherCalendarPage";

import NotFound from "./pages/NotFound";

// Create a new QueryClient instance with optimized configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

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
    <Route path="/student/calendar" element={
      <ProtectedRoute allowedRole="student">
        <CalendarPage />
      </ProtectedRoute>
    } />
    <Route path="/student/courses" element={
      <ProtectedRoute allowedRole="student">
        <CoursesPage />
      </ProtectedRoute>
    } />
    <Route path="/student/grades" element={
      <ProtectedRoute allowedRole="student">
        <GradesPage />
      </ProtectedRoute>
    } />
    <Route path="/student/profile" element={
      <ProtectedRoute allowedRole="student">
        <ProfilePage />
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
    <Route path="/teacher/reports" element={
      <ProtectedRoute allowedRole="teacher">
        <ReportsPage />
      </ProtectedRoute>
    } />
    <Route path="/teacher/calendar" element={
      <ProtectedRoute allowedRole="teacher">
        <TeacherCalendarPage />
      </ProtectedRoute>
    } />
    
    {/* Redirect root to login */}
    <Route path="/" element={<Login />} />
    
    {/* Catch all route */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

// Main App component
const App = () => {
  return (
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
};

export default App;
