
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, BookOpen, GraduationCap } from "lucide-react";

// Dummy course data
const courses = [
  {
    id: "course-1",
    title: "Introduction to Computer Science",
    code: "CS101",
    instructor: "Dr. John Smith",
    schedule: "Mon, Wed 10:00 AM - 11:30 AM",
    attendanceRate: 92,
    location: "Computer Lab 1",
    status: "active",
    description: "An introductory course to computer science principles and programming.",
  },
  {
    id: "course-2",
    title: "Advanced Mathematics",
    code: "MATH201",
    instructor: "Prof. Sarah Williams",
    schedule: "Tue, Thu 1:00 PM - 2:30 PM",
    attendanceRate: 87,
    location: "Science Building, Room 305",
    status: "active",
    description: "Coverage of advanced mathematical concepts and their applications.",
  },
  {
    id: "course-3",
    title: "Introduction to Physics",
    code: "PHYS101",
    instructor: "Dr. Michael Brown",
    schedule: "Wed, Fri 9:00 AM - 10:30 AM",
    attendanceRate: 95,
    location: "Physics Lab 2",
    status: "active",
    description: "Fundamentals of physics with laboratory experiments.",
  },
  {
    id: "course-4",
    title: "English Literature",
    code: "ENG102",
    instructor: "Prof. Emily Johnson",
    schedule: "Mon, Thu 2:00 PM - 3:30 PM",
    attendanceRate: 78,
    location: "Arts Building, Room 201",
    status: "inactive",
    description: "Analysis and discussion of important literary works.",
  }
];

const CoursesPage = () => {
  const { userData } = useAuth();
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  
  const selectedCourse = courses.find(course => course.id === selectedCourseId);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 md:py-6 flex items-center">
          <Link to="/student/dashboard">
            <Button variant="ghost" size="sm" className="mr-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-xl md:text-2xl font-bold text-foreground">
            My Courses
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Courses List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="mr-2 h-5 w-5" /> 
                  Enrolled Courses
                </CardTitle>
                <CardDescription>
                  {userData?.name}'s course schedule and attendance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Course</TableHead>
                        <TableHead>Schedule</TableHead>
                        <TableHead>Attendance</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {courses.map(course => (
                        <TableRow 
                          key={course.id}
                          className={`cursor-pointer ${selectedCourseId === course.id ? 'bg-muted' : ''}`}
                          onClick={() => setSelectedCourseId(course.id)}
                        >
                          <TableCell className="font-medium">
                            <div>
                              <div className="font-medium">{course.title}</div>
                              <div className="text-sm text-muted-foreground">{course.code}</div>
                            </div>
                          </TableCell>
                          <TableCell>{course.schedule}</TableCell>
                          <TableCell>
                            <div className="flex flex-col space-y-1">
                              <Progress value={course.attendanceRate} className="h-2" />
                              <span className="text-xs text-muted-foreground">{course.attendanceRate}%</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={course.status === 'active' ? 'default' : 'secondary'}>
                              {course.status === 'active' ? 'Active' : 'Completed'}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Course Details */}
          <div>
            {selectedCourse ? (
              <Card>
                <CardHeader>
                  <CardTitle>{selectedCourse.title}</CardTitle>
                  <CardDescription>Course Code: {selectedCourse.code}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-medium flex items-center">
                      <GraduationCap className="mr-2 h-4 w-4" />
                      Instructor
                    </h3>
                    <p className="text-muted-foreground">{selectedCourse.instructor}</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Schedule</h3>
                    <p className="text-muted-foreground">{selectedCourse.schedule}</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Location</h3>
                    <p className="text-muted-foreground">{selectedCourse.location}</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Description</h3>
                    <p className="text-muted-foreground">{selectedCourse.description}</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Attendance Rate</h3>
                    <div className="flex items-center gap-2">
                      <Progress value={selectedCourse.attendanceRate} className="h-2 flex-1" />
                      <span className="text-sm font-medium">{selectedCourse.attendanceRate}%</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">View Details</Button>
                </CardFooter>
              </Card>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center h-80">
                  <BookOpen className="h-12 w-12 text-muted-foreground/50" />
                  <p className="mt-4 text-muted-foreground text-center">
                    Select a course to view details
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CoursesPage;
