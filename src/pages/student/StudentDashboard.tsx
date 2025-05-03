
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import QRCodeDisplay from "@/components/QRCodeDisplay";
import AttendanceList from "@/components/AttendanceList";
import { Loader2, LogOut } from "lucide-react";

const StudentDashboard = () => {
  const { userData, logout, loading } = useAuth();
  const navigate = useNavigate();

  // Type guard to ensure userData is Student
  if (userData?.role !== "student") {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const student = userData;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 md:py-6 flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold text-foreground">Student Dashboard</h1>
          <Button variant="ghost" size="sm" onClick={logout}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 md:py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column - Student Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Student Profile</CardTitle>
                <CardDescription>Your personal information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Name:</span>
                    <span className="font-medium">{student.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email:</span>
                    <span className="font-medium">{student.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Student ID:</span>
                    <span className="font-medium">{student.studentId}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <QRCodeDisplay student={student} />
          </div>

          {/* Right Column - Attendance History */}
          <div>
            <AttendanceList userData={student} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
