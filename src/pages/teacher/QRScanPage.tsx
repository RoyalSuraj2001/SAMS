
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import QRScanner from "@/components/QRScanner";
import { doc, getDoc, addDoc, collection, serverTimestamp, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { v4 as uuidv4 } from "uuid";
import { useToast } from "@/components/ui/use-toast";
import { AlertCircle, ArrowLeft, CheckCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const QRScanPage = () => {
  const [isScanComplete, setIsScanComplete] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [scanResult, setScanResult] = useState<{
    success: boolean;
    studentId?: string;
    studentName?: string;
    message: string;
  } | null>(null);
  
  const { userData } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Type guard to ensure userData is Teacher
  if (!userData || userData.role !== "teacher") {
    return null;
  }

  const teacher = userData;

  const handleSuccessfulScan = async (studentId: string) => {
    try {
      setIsProcessing(true);

      // First try by document ID
      const studentDocRef = doc(db, "students", studentId);
      const studentDoc = await getDoc(studentDocRef);
      
      if (studentDoc.exists()) {
        const studentData = studentDoc.data();
        await processAttendance(studentData, studentId);
        return;
      }
      
      // If not found by ID, try querying by studentId field
      const studentsQuery = query(
        collection(db, "students"),
        where("studentId", "==", studentId)
      );
      
      const querySnapshot = await getDocs(studentsQuery);
      
      if (querySnapshot.empty) {
        setScanResult({
          success: false,
          studentId,
          message: "No student found with this ID.",
        });
        setIsScanComplete(true);
        setIsProcessing(false);
        return;
      }
      
      // Get the first matching student
      const studentData = querySnapshot.docs[0].data();
      const actualStudentId = querySnapshot.docs[0].id;
      
      await processAttendance(studentData, actualStudentId);
      
    } catch (error) {
      console.error("Error marking attendance:", error);
      setScanResult({
        success: false,
        studentId,
        message: "Failed to mark attendance. Please try again.",
      });
      
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to mark attendance. Please try again.",
      });
      setIsScanComplete(true);
      setIsProcessing(false);
    }
  };

  const processAttendance = async (studentData: any, studentId: string) => {
    if (!studentData) {
      setScanResult({
        success: false,
        studentId,
        message: "Failed to retrieve student information.",
      });
      setIsScanComplete(true);
      setIsProcessing(false);
      return;
    }

    const studentName = studentData.name;
    const recordId = uuidv4();
    const timestamp = serverTimestamp();

    // Add attendance record to student's collection
    await addDoc(collection(db, `students/${studentId}/attendance`), {
      id: recordId,
      timestamp,
      teacherId: teacher.teacherId,
      teacherName: teacher.name,
      studentId: studentData.studentId,
      studentName,
    });

    // Add attendance record to teacher's collection
    await addDoc(collection(db, `teachers/${teacher.uid}/scanned_attendance`), {
      id: recordId,
      timestamp,
      teacherId: teacher.teacherId,
      teacherName: teacher.name,
      studentId: studentData.studentId,
      studentName,
    });

    // Update scan result
    setScanResult({
      success: true,
      studentId: studentData.studentId,
      studentName,
      message: "Attendance marked successfully!",
    });
    
    toast({
      title: "Attendance Marked",
      description: `${studentName} has been marked present.`,
    });
    
    setIsScanComplete(true);
    setIsProcessing(false);
  };

  const handleReset = () => {
    setScanResult(null);
    setIsScanComplete(false);
  };

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
          <h1 className="text-xl md:text-2xl font-bold text-foreground">Scan QR Code</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 md:py-8">
        <Card>
          <CardHeader>
            <CardTitle>Student Attendance Scanner</CardTitle>
            <CardDescription>
              Scan a student's QR code to mark their attendance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isScanComplete && scanResult ? (
              <div className="space-y-4">
                <Alert variant={scanResult.success ? "default" : "destructive"}>
                  {scanResult.success ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <AlertCircle className="h-4 w-4" />
                  )}
                  <AlertTitle>
                    {scanResult.success ? "Success" : "Error"}
                  </AlertTitle>
                  <AlertDescription>
                    {scanResult.message}
                    {scanResult.success && scanResult.studentName && (
                      <p className="font-medium mt-1">
                        Student: {scanResult.studentName} ({scanResult.studentId})
                      </p>
                    )}
                  </AlertDescription>
                </Alert>

                <div className="flex justify-center">
                  <Button onClick={handleReset}>
                    Scan Another QR Code
                  </Button>
                </div>
              </div>
            ) : (
              <QRScanner onSuccessfulScan={handleSuccessfulScan} />
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default QRScanPage;
