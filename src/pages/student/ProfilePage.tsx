
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, User, Mail, School, Calendar, Clock, Save } from "lucide-react";

const ProfilePage = () => {
  const { userData } = useAuth();
  const { toast } = useToast();
  const [name, setName] = useState(userData?.name || "");
  const [email, setEmail] = useState(userData?.email || "");
  const [studentId, setStudentId] = useState(userData?.studentId || "");
  const [phone, setPhone] = useState("555-123-4567"); // Dummy data
  const [address, setAddress] = useState("123 Campus Drive, University City"); // Dummy data
  const [dateOfBirth, setDateOfBirth] = useState("1999-05-15"); // Dummy data
  
  // Emergency contact - Dummy data
  const [emergencyContact, setEmergencyContact] = useState({
    name: "Parent Name",
    relationship: "Parent",
    phone: "555-987-6543",
    email: "parent@example.com"
  });

  // Program details - Dummy data
  const programDetails = {
    program: "Bachelor of Science in Computer Science",
    department: "Department of Computer Science",
    advisor: "Dr. Jane Smith",
    yearOfStudy: "2nd Year",
    enrollmentDate: "September 2023",
    expectedGraduation: "June 2027"
  };

  const handleUpdateProfile = () => {
    // In a real app, this would update the user's profile in the database
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully."
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
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
            Student Profile
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 md:py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column - Profile Overview */}
          <div className="md:col-span-1">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="text-lg">{getInitials(userData?.name || "")}</AvatarFallback>
                  </Avatar>
                  
                  <div className="text-center">
                    <h2 className="text-xl font-bold">{userData?.name}</h2>
                    <p className="text-muted-foreground">{userData?.studentId}</p>
                    <Badge className="mt-2">Active Student</Badge>
                  </div>
                  
                  <Separator />
                  
                  <div className="w-full space-y-3">
                    <div className="flex items-start">
                      <Mail className="h-5 w-5 mr-2 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Email</p>
                        <p className="text-sm text-muted-foreground">{userData?.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <School className="h-5 w-5 mr-2 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Program</p>
                        <p className="text-sm text-muted-foreground">{programDetails.program}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Enrollment Date</p>
                        <p className="text-sm text-muted-foreground">{programDetails.enrollmentDate}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Expected Graduation</p>
                        <p className="text-sm text-muted-foreground">{programDetails.expectedGraduation}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Right Column - Profile Details Tabs */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Profile Details</CardTitle>
                <CardDescription>Manage your personal information and settings</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="personal" className="w-full">
                  <TabsList className="grid grid-cols-3 mb-4">
                    <TabsTrigger value="personal">Personal</TabsTrigger>
                    <TabsTrigger value="academic">Academic</TabsTrigger>
                    <TabsTrigger value="emergency">Emergency</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="personal" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name" 
                          value={name} 
                          onChange={e => setName(e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email"
                          value={email} 
                          onChange={e => setEmail(e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="studentId">Student ID</Label>
                        <Input 
                          id="studentId" 
                          value={studentId}
                          onChange={e => setStudentId(e.target.value)}
                          disabled
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input 
                          id="phone" 
                          value={phone}
                          onChange={e => setPhone(e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="dob">Date of Birth</Label>
                        <Input 
                          id="dob" 
                          type="date"
                          value={dateOfBirth}
                          onChange={e => setDateOfBirth(e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="address">Address</Label>
                        <Input 
                          id="address" 
                          value={address}
                          onChange={e => setAddress(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button onClick={handleUpdateProfile} className="flex items-center gap-2">
                        <Save className="h-4 w-4" />
                        Save Changes
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="academic" className="space-y-4">
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Program</p>
                          <p className="text-muted-foreground">{programDetails.program}</p>
                        </div>
                        
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Department</p>
                          <p className="text-muted-foreground">{programDetails.department}</p>
                        </div>
                        
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Year of Study</p>
                          <p className="text-muted-foreground">{programDetails.yearOfStudy}</p>
                        </div>
                        
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Academic Advisor</p>
                          <p className="text-muted-foreground">{programDetails.advisor}</p>
                        </div>
                        
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Enrollment Date</p>
                          <p className="text-muted-foreground">{programDetails.enrollmentDate}</p>
                        </div>
                        
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Expected Graduation</p>
                          <p className="text-muted-foreground">{programDetails.expectedGraduation}</p>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="text-lg font-medium mb-2">Academic Status</h3>
                        <Card>
                          <CardContent className="p-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm font-medium">Cumulative GPA</p>
                                <p className="text-xl font-bold">3.69</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium">Credits Completed</p>
                                <p className="text-xl font-bold">84</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium">Current Status</p>
                                <p className="text-muted-foreground">Good Standing</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium">Honors</p>
                                <p className="text-muted-foreground">Dean's List (3 semesters)</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="emergency" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="emergency-name">Contact Name</Label>
                        <Input 
                          id="emergency-name" 
                          value={emergencyContact.name}
                          onChange={e => setEmergencyContact({...emergencyContact, name: e.target.value})}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="emergency-relationship">Relationship</Label>
                        <Input 
                          id="emergency-relationship" 
                          value={emergencyContact.relationship}
                          onChange={e => setEmergencyContact({...emergencyContact, relationship: e.target.value})}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="emergency-phone">Phone Number</Label>
                        <Input 
                          id="emergency-phone" 
                          value={emergencyContact.phone}
                          onChange={e => setEmergencyContact({...emergencyContact, phone: e.target.value})}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="emergency-email">Email</Label>
                        <Input 
                          id="emergency-email" 
                          value={emergencyContact.email}
                          onChange={e => setEmergencyContact({...emergencyContact, email: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button onClick={handleUpdateProfile} className="flex items-center gap-2">
                        <Save className="h-4 w-4" />
                        Save Changes
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

// Missing Badge component, let's add it
const Badge = ({ 
  children, 
  className 
}: { 
  children: React.ReactNode; 
  className?: string;
}) => {
  return (
    <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/80 ${className}`}>
      {children}
    </div>
  );
};

export default ProfilePage;
