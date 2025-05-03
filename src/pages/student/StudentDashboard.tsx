
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import QRCodeDisplay from "@/components/QRCodeDisplay";
import AttendanceList from "@/components/AttendanceList";
import AttendanceChart from "@/components/AttendanceChart";
import { 
  Loader2,
  LogOut, 
  Calendar, 
  BookOpen, 
  GraduationCap, 
  User,
  ChartBar
} from "lucide-react";
import { Link } from "react-router-dom";

const StudentDashboard = () => {
  const { userData, logout, loading } = useAuth();

  // Type guard to ensure userData is Student
  if (loading || userData?.role !== "student") {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const student = userData;

  // Quick access links
  const quickLinks = [
    { 
      title: "Calendar",
      description: "View your attendance calendar",
      icon: Calendar,
      link: "/student/calendar",
      color: "bg-blue-100"
    },
    { 
      title: "Courses",
      description: "View your courses",
      icon: BookOpen,
      link: "/student/courses",
      color: "bg-purple-100"
    },
    { 
      title: "Grades",
      description: "Check your grades",
      icon: GraduationCap,
      link: "/student/grades",
      color: "bg-green-100"
    },
    { 
      title: "Profile",
      description: "Manage your profile",
      icon: User,
      link: "/student/profile",
      color: "bg-amber-100"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 md:py-6 flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold text-foreground">Student Dashboard</h1>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={logout}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 md:py-8">
        {/* Welcome Banner */}
        <Card className="mb-6 bg-gradient-to-r from-purple-100 to-blue-100 border-none">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Welcome back, {student.name}!</h2>
                <p className="text-muted-foreground">Here's your attendance overview and quick access links</p>
              </div>
              <div className="hidden sm:block">
                <ChartBar className="h-16 w-16 text-primary opacity-75" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Quick Access Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {quickLinks.map((link) => (
            <Link to={link.link} key={link.title} className="block">
              <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                <CardContent className="p-6 flex items-start space-x-4">
                  <div className={`${link.color} p-3 rounded-md`}>
                    <link.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{link.title}</h3>
                    <p className="text-sm text-muted-foreground">{link.description}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-muted-foreground">Classes attended this semester</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">92%</div>
              <p className="text-xs text-muted-foreground">Above required minimum (75%)</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Next Class</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Today</div>
              <p className="text-xs text-muted-foreground">Mathematics at 2:00 PM</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column - Student Info & QR */}
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
                <div className="mt-4">
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/student/profile">View Full Profile</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <QRCodeDisplay student={student} />
            
            {/* Weekly Attendance Chart */}
            <AttendanceChart userData={student} />
          </div>

          {/* Right Column - Attendance History */}
          <div>
            <AttendanceList userData={student} limit={5} />
            <div className="mt-4 flex justify-end">
              <Button variant="outline" asChild>
                <Link to="/student/calendar">View Full Attendance History</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
