
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { 
  User as FirebaseUser, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { UserData } from "@/types/user";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

interface AuthContextType {
  currentUser: FirebaseUser | null;
  userData: UserData | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, userData: Omit<UserData, "uid">) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  async function signup(email: string, password: string, userData: Omit<UserData, "uid">) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Create the user document in Firestore
      if (userData.role === "student") {
        await setDoc(doc(db, "students", user.uid), {
          ...userData,
          email,
          uid: user.uid,
        });
      } else {
        await setDoc(doc(db, "teachers", user.uid), {
          ...userData, 
          email,
          uid: user.uid,
        });
      }
      
      toast({
        title: "Account created",
        description: "You've successfully signed up!",
      });
      
      // Redirect based on role
      if (userData.role === "student") {
        navigate("/student/dashboard");
      } else {
        navigate("/teacher/dashboard");
      }
    } catch (error: any) {
      console.error("Error signing up:", error);
      toast({
        variant: "destructive",
        title: "Error creating account",
        description: error.message || "Something went wrong",
      });
    }
  }

  async function login(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "Welcome back",
        description: "You've successfully logged in!",
      });
    } catch (error: any) {
      console.error("Error logging in:", error);
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error.message || "Invalid email or password",
      });
      throw error;
    }
  }

  async function logout() {
    try {
      await signOut(auth);
      navigate("/login");
      toast({
        title: "Logged out",
        description: "You've been successfully logged out.",
      });
    } catch (error) {
      console.error("Error logging out:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to log out",
      });
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        try {
          // Try checking students collection first
          const studentDoc = await getDoc(doc(db, "students", user.uid));
          
          if (studentDoc.exists()) {
            setUserData(studentDoc.data() as UserData);
          } else {
            // If not a student, check teachers collection
            const teacherDoc = await getDoc(doc(db, "teachers", user.uid));
            
            if (teacherDoc.exists()) {
              setUserData(teacherDoc.data() as UserData);
            } else {
              // No user data found in either collection
              setUserData(null);
              console.error("No user data found for:", user.uid);
            }
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUserData(null);
        }
      } else {
        setUserData(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    currentUser,
    userData,
    loading,
    login,
    signup,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
