
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AttendanceList from "@/components/AttendanceList";
import { Camera, LogOut, User } from "lucide-react";

const TeacherDashboard = () => {
  const { userData, logout } = useAuth();
  
  // Type guard to ensure userData is Teacher
  if (userData?.role !== "teacher") {
    return null;
  }

  const teacher = userData;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 md:py-6 flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold text-foreground">Teacher Dashboard</h1>
          <Button variant="ghost" size="sm" onClick={logout}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 md:py-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left Column - Teacher Info */}
          <div className="md:col-span-4 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Teacher Profile</CardTitle>
                <CardDescription>Your personal information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Name:</span>
                    <span className="font-medium">{teacher.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email:</span>
                    <span className="font-medium">{teacher.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Teacher ID:</span>
                    <span className="font-medium">{teacher.teacherId}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Manage attendance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link to="/teacher/scan" className="block">
                  <Button className="w-full">
                    <Camera className="h-4 w-4 mr-2" />
                    Scan QR Code
                  </Button>
                </Link>
                <Link to="/teacher/attendance" className="block">
                  <Button variant="outline" className="w-full">
                    <User className="h-4 w-4 mr-2" />
                    View All Attendance
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Recent Attendance */}
          <div className="md:col-span-8">
            <AttendanceList userData={teacher} limit={10} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeacherDashboard;
