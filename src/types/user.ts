
export type UserRole = "student" | "teacher";

export interface User {
  uid: string;
  email: string;
  name: string;
  role: UserRole;
}

export interface Student extends User {
  role: "student";
  studentId: string;
}

export interface Teacher extends User {
  role: "teacher";
  teacherId: string;
}

export type UserData = Student | Teacher;
