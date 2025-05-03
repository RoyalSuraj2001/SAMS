
import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { StudentData } from "@/types/user";
import { useToast } from "@/components/ui/use-toast";

interface QRCodeDisplayProps {
  student: StudentData;
}

const QRCodeDisplay = ({ student }: QRCodeDisplayProps) => {
  const [size, setSize] = useState(200);
  const { toast } = useToast();

  // Set size based on screen width
  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      if (width < 400) {
        setSize(200);
      } else if (width < 768) {
        setSize(250);
      } else {
        setSize(300);
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const handleDownload = () => {
    try {
      const canvas = document.querySelector("#student-qrcode-svgroot")?.parentElement;
      if (canvas) {
        // Convert SVG to canvas for download
        const svgData = new XMLSerializer().serializeToString(canvas);
        const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
        const url = URL.createObjectURL(svgBlob);
        
        const link = document.createElement("a");
        link.href = url;
        link.download = `qrcode-${student.studentId}.svg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        toast({
          title: "QR Code Downloaded",
          description: "Your QR code has been downloaded successfully.",
        });
      }
    } catch (error) {
      console.error("Error downloading QR code:", error);
      toast({
        variant: "destructive",
        title: "Download Failed",
        description: "There was an error downloading your QR code.",
      });
    }
  };

  return (
    <Card className="w-full bg-white">
      <CardContent className="flex flex-col items-center justify-center p-6 space-y-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <QRCodeSVG
            id="student-qrcode"
            value={student.studentId}
            size={size}
            level="H"
            includeMargin={true}
            className="mx-auto"
          />
        </div>
        <div className="text-center">
          <p className="text-lg font-medium">Student ID: {student.studentId}</p>
          <p className="text-sm text-muted-foreground">
            Show this QR code to your teacher to mark your attendance
          </p>
        </div>
        <Button 
          onClick={handleDownload} 
          size="sm" 
          variant="outline"
          className="mt-2"
        >
          Download QR Code
        </Button>
      </CardContent>
    </Card>
  );
};

export default QRCodeDisplay;
