
export interface BaseUserData {
  uid: string;
  name: string;
  email: string;
  role: "student" | "teacher";
}

export interface StudentData extends BaseUserData {
  role: "student";
  studentId: string;
}

export interface TeacherData extends BaseUserData {
  role: "teacher";
  teacherId: string;
}

export type UserData = StudentData | TeacherData;
export type UserRole = "student" | "teacher";

// For backwards compatibility with existing components
export type Student = StudentData;
