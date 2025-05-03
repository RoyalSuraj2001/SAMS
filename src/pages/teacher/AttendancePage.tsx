
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import AttendanceList from "@/components/AttendanceList";
import { ArrowLeft } from "lucide-react";

const AttendancePage = () => {
  const { userData } = useAuth();
  const navigate = useNavigate();

  // Type guard to ensure userData is Teacher
  if (!userData || userData.role !== "teacher") {
    return null;
  }

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
            Attendance Records
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 md:py-8">
        <AttendanceList userData={userData} />
      </main>
    </div>
  );
};

export default AttendancePage;
