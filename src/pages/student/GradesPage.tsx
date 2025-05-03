
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
  Cell
} from "recharts";
import { ArrowLeft, BookOpen, CheckCircle, XCircle } from "lucide-react";

// Dummy semester data
const semesters = [
  { id: "current", label: "Current Semester" },
  { id: "sem-1", label: "Fall 2024" },
  { id: "sem-2", label: "Spring 2024" },
  { id: "sem-3", label: "Fall 2023" },
];

// Dummy grades data
const gradesData = {
  "current": [
    { course: "Introduction to Computer Science", code: "CS101", grade: "A", credits: 4, gpa: 4.0, status: "completed" },
    { course: "Advanced Mathematics", code: "MATH201", grade: "B+", credits: 3, gpa: 3.5, status: "completed" },
    { course: "Introduction to Physics", code: "PHYS101", grade: "A-", credits: 4, gpa: 3.7, status: "completed" },
    { course: "English Literature", code: "ENG102", grade: "-", credits: 3, gpa: null, status: "in-progress" }
  ],
  "sem-1": [
    { course: "Programming Fundamentals", code: "CS102", grade: "A", credits: 4, gpa: 4.0, status: "completed" },
    { course: "Calculus I", code: "MATH101", grade: "A-", credits: 3, gpa: 3.7, status: "completed" },
    { course: "Chemistry", code: "CHEM101", grade: "B", credits: 4, gpa: 3.0, status: "completed" }
  ],
  "sem-2": [
    { course: "Data Structures", code: "CS201", grade: "B+", credits: 4, gpa: 3.5, status: "completed" },
    { course: "Linear Algebra", code: "MATH202", grade: "A", credits: 3, gpa: 4.0, status: "completed" },
    { course: "Public Speaking", code: "COMM101", grade: "A-", credits: 2, gpa: 3.7, status: "completed" }
  ],
  "sem-3": [
    { course: "Algorithms", code: "CS301", grade: "A-", credits: 4, gpa: 3.7, status: "completed" },
    { course: "Statistics", code: "MATH301", grade: "B", credits: 3, gpa: 3.0, status: "completed" },
    { course: "Technical Writing", code: "ENG201", grade: "A", credits: 2, gpa: 4.0, status: "completed" }
  ]
};

// GPA Chart data
const gpaChartData = [
  { semester: "Fall 2023", gpa: 3.57 },
  { semester: "Spring 2024", gpa: 3.73 },
  { semester: "Fall 2024", gpa: 3.67 },
  { semester: "Current", gpa: 3.80 }
];

// Bar chart custom colors
const gpaColors = ["#8884d8", "#8884d8", "#8884d8", "#82ca9d"];

const GradesPage = () => {
  const { userData } = useAuth();
  
  const calculateSemesterGPA = (semesterGrades) => {
    const completedCourses = semesterGrades.filter(course => course.status === "completed");
    if (completedCourses.length === 0) return 0;
    
    const totalGpaPoints = completedCourses.reduce((acc, course) => {
      return acc + (course.gpa || 0) * course.credits;
    }, 0);
    
    const totalCredits = completedCourses.reduce((acc, course) => acc + course.credits, 0);
    
    return totalGpaPoints / totalCredits;
  };

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
            Academic Record
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 md:py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left side - GPA Summary */}
          <div className="md:col-span-1 space-y-6">
            {/* GPA Card */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Cumulative GPA</CardTitle>
                <CardDescription>Your overall academic performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-center my-4">3.69</div>
                <div className="text-center text-muted-foreground">84 Credits Completed</div>
                
                <div className="mt-6">
                  <h3 className="text-sm font-medium mb-2">GPA Trend</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={gpaChartData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="semester" fontSize={10} />
                      <YAxis domain={[0, 4]} ticks={[0, 1, 2, 3, 4]} fontSize={10} />
                      <Tooltip />
                      <Bar dataKey="gpa" name="GPA">
                        {gpaChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={gpaColors[index % gpaColors.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right side - Grades by Semester */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Grade Report
                </CardTitle>
                <CardDescription>
                  View your grades by semester
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="current" className="w-full">
                  <TabsList className="mb-4">
                    {semesters.map(semester => (
                      <TabsTrigger key={semester.id} value={semester.id}>
                        {semester.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  
                  {semesters.map(semester => (
                    <TabsContent key={semester.id} value={semester.id} className="space-y-4">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Course</TableHead>
                            <TableHead>Code</TableHead>
                            <TableHead>Grade</TableHead>
                            <TableHead>Credits</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {gradesData[semester.id]?.map((course, idx) => (
                            <TableRow key={idx}>
                              <TableCell className="font-medium">{course.course}</TableCell>
                              <TableCell>{course.code}</TableCell>
                              <TableCell className="text-center font-bold">{course.grade}</TableCell>
                              <TableCell>{course.credits}</TableCell>
                              <TableCell>
                                {course.status === "completed" ? (
                                  <Badge className="flex items-center gap-1">
                                    <CheckCircle className="h-3 w-3" />
                                    <span>Completed</span>
                                  </Badge>
                                ) : (
                                  <Badge variant="secondary" className="flex items-center gap-1">
                                    <XCircle className="h-3 w-3" />
                                    <span>In Progress</span>
                                  </Badge>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                      
                      <div className="bg-muted p-4 rounded-md flex justify-between items-center">
                        <div>
                          <span className="text-sm font-medium">Semester GPA:</span>
                        </div>
                        <div>
                          <span className="text-lg font-bold">
                            {calculateSemesterGPA(gradesData[semester.id] || []).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GradesPage;
