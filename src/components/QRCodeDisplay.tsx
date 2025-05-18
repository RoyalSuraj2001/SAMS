// import { useEffect, useState } from "react";
// import { QRCodeSVG } from "qrcode.react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { StudentData } from "@/types/user";
// import { useToast } from "@/components/ui/use-toast";

// interface QRCodeDisplayProps {
//   student: StudentData;
// }

// const QRCodeDisplay = ({ student }: QRCodeDisplayProps) => {
//   const [size, setSize] = useState(200);
//   const { toast } = useToast();

//   // Set size based on screen width
//   useEffect(() => {
//     const updateSize = () => {
//       const width = window.innerWidth;
//       if (width < 400) {
//         setSize(200);
//       } else if (width < 768) {
//         setSize(250);
//       } else {
//         setSize(300);
//       }
//     };

//     updateSize();
//     window.addEventListener("resize", updateSize);
//     return () => window.removeEventListener("resize", updateSize);
//   }, []);

//   const handleDownload = () => {
//     try {
//       const canvas = document.querySelector("#student-qrcode-svgroot")?.parentElement;
//       if (canvas) {
//         // Convert SVG to canvas for download
//         const svgData = new XMLSerializer().serializeToString(canvas);
//         const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
//         const url = URL.createObjectURL(svgBlob);
        
//         const link = document.createElement("a");
//         link.href = url;
//         link.download = `qrcode-${student.studentId}.svg`;
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
        
//         toast({
//           title: "QR Code Downloaded",
//           description: "Your QR code has been downloaded successfully.",
//         });
//       }
//     } catch (error) {
//       console.error("Error downloading QR code:", error);
//       toast({
//         variant: "destructive",
//         title: "Download Failed",
//         description: "There was an error downloading your QR code.",
//       });
//     }
//   };

//   return (
//     <Card className="w-full bg-white">
//       <CardContent className="flex flex-col items-center justify-center p-6 space-y-4">
//         <div className="bg-white p-4 rounded-lg shadow-sm border">
//           <QRCodeSVG
//             id="student-qrcode"
//             value={student.studentId}
//             size={size}
//             level="H"
//             includeMargin={true}
//             className="mx-auto"
//           />
//         </div>
//         <div className="text-center">
//           <p className="text-lg font-medium">Student ID: {student.studentId}</p>
//           <p className="text-sm text-muted-foreground">
//             Show this QR code to your teacher to mark your attendance
//           </p>
//         </div>
//         <Button 
//           onClick={handleDownload} 
//           size="sm" 
//           variant="outline"
//           className="mt-2"
//         >
//           Download QR Code
//         </Button>
//       </CardContent>
//     </Card>
//   );
// };

// export default QRCodeDisplay;


// import { useEffect, useState, useRef, createElement } from "react";
// import { QRCodeSVG } from "qrcode.react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { StudentData } from "@/types/user";
// import { useToast } from "@/components/ui/use-toast";

// interface QRCodeDisplayProps {
//   student: StudentData;
// }

// const QRCodeDisplay = ({ student }: QRCodeDisplayProps) => {
//   const [size, setSize] = useState(200);
//   const { toast } = useToast();
//   const qrCodeRef = useRef<HTMLDivElement>(null);

//   // Set size based on screen width
//   useEffect(() => {
//     const updateSize = () => {
//       const width = window.innerWidth;
//       if (width < 400) {
//         setSize(200);
//       } else if (width < 768) {
//         setSize(250);
//       } else {
//         setSize(300);
//       }
//     };

//     updateSize();
//     window.addEventListener("resize", updateSize);
//     return () => window.removeEventListener("resize", updateSize);
//   }, []);

//   const handleDownload = () => {
//     try {
//       if (qrCodeRef.current) {
//         const svgElement = qrCodeRef.current.querySelector("svg");
//         if (svgElement) {
//           const svgData = new XMLSerializer().serializeToString(svgElement);
//           const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
//           const url = URL.createObjectURL(svgBlob);
          
//           const link = document.createElement("a");
//           link.href = url;
//           link.download = `qrcode-${student.studentId}.svg`;
//           document.body.appendChild(link);
//           link.click();
//           document.body.removeChild(link);
//           URL.revokeObjectURL(url);
          
//           toast({
//             title: "QR Code Downloaded",
//             description: "Your QR code has been downloaded successfully.",
//           });
//           return;
//         }
//       }
//       throw new Error("QR code element not found");
//     } catch (error) {
//       console.error("Error downloading QR code:", error);
//       toast({
//         variant: "destructive",
//         title: "Download Failed",
//         description: "There was an error downloading your QR code.",
//       });
//     }
//   };

//   // Using createElement to avoid JSX intrinsic elements error
//   return createElement(Card, { className: "w-full bg-white" },
//     createElement(CardContent, { className: "flex flex-col items-center justify-center p-6 space-y-4" },
//       [
//         createElement("div", {
//           ref: qrCodeRef,
//           key: "qr-container",
//           className: "bg-white p-4 rounded-lg shadow-sm border"
//         }, createElement(QRCodeSVG, {
//           value: student.studentId,
//           size: size,
//           level: "H",
//           includeMargin: true,
//           className: "mx-auto"
//         })),
        
//         createElement("div", {
//           key: "text-container",
//           className: "text-center"
//         }, [
//           createElement("p", {
//             key: "student-id",
//             className: "text-lg font-medium"
//           }, `Student ID: ${student.studentId}`),
          
//           createElement("p", {
//             key: "instruction",
//             className: "text-sm text-muted-foreground"
//           }, "Show this QR code to your teacher to mark your attendance")
//         ]),
        
//         createElement(Button, {
//           key: "download-button",
//           onClick: handleDownload,
//           size: "sm",
//           variant: "outline",
//           className: "mt-2"
//         }, "Download QR Code")
//       ]
//     )
//   );
// };

// export default QRCodeDisplay;


import { useEffect, useState, useRef } from "react";
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
  const qrCodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      setSize(width < 400 ? 200 : width < 768 ? 250 : 300);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const handleDownload = async () => {
    try {
      const svgElement = qrCodeRef.current?.querySelector("svg");
      if (!svgElement) throw new Error("SVG not found");
  
      // Convert SVG to canvas
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Could not create canvas context");
  
      const svgData = new XMLSerializer().serializeToString(svgElement);
      const img = new Image();
      
      // Wait for image to load
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgData)))}`;
      });
  
      // Set canvas dimensions and draw image
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
  
      // Convert to PNG and download
      const pngUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = pngUrl;
      link.download = `qrcode-${student.studentId}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  
      toast({
        title: "QR Code Downloaded",
        description: "Your QR code has been downloaded as PNG.",
      });
    } catch (error) {
      console.error("Download error:", error);
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
        <div ref={qrCodeRef} className="bg-white p-4 rounded-lg shadow-sm border">
          <QRCodeSVG
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