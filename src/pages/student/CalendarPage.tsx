
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { addDays } from "date-fns";

const CalendarPage = () => {
  const { userData } = useAuth();
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Mock attendance dates
  const attendanceDates = [
    new Date(), 
    addDays(new Date(), -2),
    addDays(new Date(), -5),
    addDays(new Date(), -7)
  ];
  
  // Render only if student
  if (userData?.role !== "student") {
    return null;
  }
  
  // Function to check if a date is in the attendance list
  const isAttendanceDay = (date: Date) => {
    return attendanceDates.some(
      attendanceDate => 
        attendanceDate.getDate() === date.getDate() && 
        attendanceDate.getMonth() === date.getMonth() && 
        attendanceDate.getFullYear() === date.getFullYear()
    );
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
            Attendance Calendar
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 md:py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
                modifiers={{
                  attended: (date) => isAttendanceDay(date),
                }}
                modifiersStyles={{
                  attended: { backgroundColor: '#8B5CF6', color: 'white' },
                }}
              />
              <div className="mt-4 flex items-center">
                <div className="w-4 h-4 bg-[#8B5CF6] rounded-sm mr-2"></div>
                <span className="text-sm text-muted-foreground">Days you were present</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{date ? date.toLocaleDateString() : 'Select a Date'}</CardTitle>
            </CardHeader>
            <CardContent>
              {date && isAttendanceDay(date) ? (
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                    <p className="text-green-700 font-medium">You were present on this day</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Class:</span>
                      <span>Mathematics</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Time:</span>
                      <span>09:00 AM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Marked by:</span>
                      <span>Prof. Johnson</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-md">
                  <p className="text-gray-500">No attendance record for this date</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default CalendarPage;
