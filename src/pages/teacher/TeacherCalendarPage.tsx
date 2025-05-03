
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { ArrowLeft } from "lucide-react";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { addDays } from "date-fns";

const TeacherCalendarPage = () => {
  const { userData } = useAuth();
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Mock attendance dates with number of students
  const classDates = [
    { date: new Date(), students: 42, total: 45 },
    { date: addDays(new Date(), -2), students: 40, total: 45 },
    { date: addDays(new Date(), -5), students: 38, total: 45 },
    { date: addDays(new Date(), -7), students: 41, total: 45 }
  ];
  
  // Mock student data for selected date
  const mockStudents = [
    { id: "S1001", name: "Alice Johnson", status: "Present", time: "09:05 AM" },
    { id: "S1002", name: "Bob Smith", status: "Present", time: "08:55 AM" },
    { id: "S1003", name: "Carol Williams", status: "Present", time: "09:02 AM" },
    { id: "S1004", name: "David Brown", status: "Absent", time: "-" },
    { id: "S1005", name: "Eve Davis", status: "Present", time: "09:10 AM" },
  ];
  
  // Type guard to ensure userData is Teacher
  if (userData?.role !== "teacher") {
    return null;
  }
  
  // Function to check if a date is a class day
  const isClassDay = (date: Date) => {
    return classDates.some(
      classDate => 
        classDate.date.getDate() === date.getDate() && 
        classDate.date.getMonth() === date.getMonth() && 
        classDate.date.getFullYear() === date.getFullYear()
    );
  };

  // Get attendance data for selected date
  const getAttendanceForDate = (date: Date | undefined) => {
    if (!date) return null;
    
    return classDates.find(
      classDate => 
        classDate.date.getDate() === date.getDate() && 
        classDate.date.getMonth() === date.getMonth() && 
        classDate.date.getFullYear() === date.getFullYear()
    );
  };
  
  const selectedDateAttendance = getAttendanceForDate(date);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 md:py-6 flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/teacher/dashboard")}
            className="mr-2"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-xl md:text-2xl font-bold text-foreground">
            Class Calendar
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 md:py-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-5">
            <Card>
              <CardHeader>
                <CardTitle>Class Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                  modifiers={{
                    class: (date) => isClassDay(date),
                  }}
                  modifiersStyles={{
                    class: { backgroundColor: '#8B5CF6', color: 'white' },
                  }}
                />
                <div className="mt-4 flex items-center">
                  <div className="w-4 h-4 bg-[#8B5CF6] rounded-sm mr-2"></div>
                  <span className="text-sm text-muted-foreground">Class days</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-7">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>
                  {date ? date.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'Select a Date'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {date && selectedDateAttendance ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">Students Present</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">{selectedDateAttendance.students}</div>
                          <p className="text-xs text-muted-foreground">
                            {Math.round((selectedDateAttendance.students / selectedDateAttendance.total) * 100)}% attendance rate
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">{selectedDateAttendance.total}</div>
                          <p className="text-xs text-muted-foreground">
                            {selectedDateAttendance.total - selectedDateAttendance.students} absent
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Student Attendance</h3>
                      <div className="border rounded-md">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>ID</TableHead>
                              <TableHead>Name</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Time</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {mockStudents.map((student) => (
                              <TableRow key={student.id}>
                                <TableCell>{student.id}</TableCell>
                                <TableCell>{student.name}</TableCell>
                                <TableCell>
                                  <span
                                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                                      student.status === "Present"
                                        ? "bg-green-100 text-green-800"
                                        : "bg-red-100 text-red-800"
                                    }`}
                                  >
                                    {student.status}
                                  </span>
                                </TableCell>
                                <TableCell>{student.time}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-gray-50 border border-gray-200 rounded-md text-center">
                    <p className="text-gray-500">
                      {date ? "No class was scheduled for this date" : "Please select a date to view attendance"}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeacherCalendarPage;
