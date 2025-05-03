
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
