
import { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy, DocumentData, where, limit as firestoreLimit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { format } from "date-fns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserData } from "@/types/user";
import { Loader2 } from "lucide-react";

interface AttendanceRecord {
  id: string;
  timestamp: Date;
  teacherId: string;
  teacherName?: string;
  studentId: string;
  studentName: string;
}

interface AttendanceListProps {
  userData: UserData;
  limit?: number;
}

const AttendanceList = ({ userData, limit }: AttendanceListProps) => {
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let collectionPath = "";
    let queryRef;

    if (userData.role === "student") {
      collectionPath = `students/${userData.uid}/attendance`;
      const collectionRef = collection(db, collectionPath);
      queryRef = limit 
        ? query(collectionRef, orderBy("timestamp", "desc"), firestoreLimit(limit))
        : query(collectionRef, orderBy("timestamp", "desc"));
    } else {
      collectionPath = `teachers/${userData.uid}/scanned_attendance`;
      const collectionRef = collection(db, collectionPath);
      queryRef = limit 
        ? query(collectionRef, orderBy("timestamp", "desc"), firestoreLimit(limit))
        : query(collectionRef, orderBy("timestamp", "desc"));
    }

    const unsubscribe = onSnapshot(
      queryRef,
      (snapshot) => {
        const attendanceData: AttendanceRecord[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          attendanceData.push({
            id: doc.id,
            timestamp: data.timestamp?.toDate() || new Date(),
            teacherId: data.teacherId,
            teacherName: data.teacherName,
            studentId: data.studentId,
            studentName: data.studentName,
          });
        });
        setAttendance(attendanceData);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching attendance:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [userData, limit]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Attendance History</CardTitle>
        <CardDescription>
          {userData.role === "student"
            ? "Your attendance records"
            : "Students you've marked present"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center p-4">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : attendance.length > 0 ? (
          <div className="relative overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  {userData.role === "student" ? (
                    <TableHead>Marked By</TableHead>
                  ) : (
                    <TableHead>Student</TableHead>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendance.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>
                      {format(record.timestamp, "MMM dd, yyyy")}
                    </TableCell>
                    <TableCell>
                      {format(record.timestamp, "h:mm a")}
                    </TableCell>
                    {userData.role === "student" ? (
                      <TableCell>{record.teacherId}</TableCell>
                    ) : (
                      <TableCell>
                        {record.studentName} ({record.studentId})
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            No attendance records found.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AttendanceList;
