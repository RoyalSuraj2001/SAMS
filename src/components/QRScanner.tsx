
import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface QRScannerProps {
  onSuccessfulScan: (studentId: string) => void;
}

const QRScanner = ({ onSuccessfulScan }: QRScannerProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannerInitialized, setScannerInitialized] = useState(false);
  const [availableCameras, setAvailableCameras] = useState<Array<{ id: string; label: string }>>([]);
  const [selectedCamera, setSelectedCamera] = useState("");
  const html5QrCodeRef = useRef<Html5Qrcode | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Initialize the scanner on component mount
    const scanner = new Html5Qrcode("reader");
    html5QrCodeRef.current = scanner;

    // Get available cameras
    Html5Qrcode.getCameras()
      .then((devices) => {
        if (devices && devices.length) {
          setAvailableCameras(devices);
          setSelectedCamera(devices[0].id);
          setScannerInitialized(true);
        } else {
          toast({
            variant: "destructive",
            title: "No cameras found",
            description: "Please ensure your device has a camera and you've granted permission to access it.",
          });
        }
      })
      .catch((err) => {
        console.error("Error getting cameras", err);
        toast({
          variant: "destructive",
          title: "Camera error",
          description: "Failed to access cameras. Please check permissions.",
        });
      });

    // Cleanup on unmount
    return () => {
      if (isScanning && html5QrCodeRef.current) {
        html5QrCodeRef.current
          .stop()
          .catch((err) => console.error("Error stopping scanner:", err));
      }
    };
  }, []);

  const startScanner = () => {
    if (!html5QrCodeRef.current || !selectedCamera) return;

    setIsScanning(true);
    
    const qrCodeSuccessCallback = (decodedText: string) => {
      // Stop scanning after successful scan
      stopScanner();
      // Pass the decoded text (student ID) to the parent component
      onSuccessfulScan(decodedText);
    };

    const qrCodeErrorCallback = (errorMessage: string) => {
      // This callback will be triggered frequently while scanning,
      // so we don't want to log or display these errors
    };

    const config = { fps: 10, qrbox: { width: 250, height: 250 } };

    html5QrCodeRef.current
      .start(
        selectedCamera,
        config,
        qrCodeSuccessCallback,
        qrCodeErrorCallback
      )
      .catch((err) => {
        console.error("Error starting scanner:", err);
        setIsScanning(false);
        toast({
          variant: "destructive",
          title: "Scanner error",
          description: "Failed to start the QR scanner. Please try again.",
        });
      });
  };

  const stopScanner = () => {
    if (!html5QrCodeRef.current) return;

    html5QrCodeRef.current
      .stop()
      .then(() => {
        setIsScanning(false);
      })
      .catch((err) => {
        console.error("Error stopping scanner:", err);
      });
  };

  const handleCameraChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (isScanning) {
      stopScanner();
    }
    setSelectedCamera(e.target.value);
  };

  return (
    <Card className="w-full">
      <CardContent className="p-4 space-y-4">
        <div className="flex flex-col space-y-4">
          <div className="text-center">
            {availableCameras.length > 1 && (
              <select 
                value={selectedCamera} 
                onChange={handleCameraChange}
                className="select mb-4 w-full rounded-md border border-input px-3 py-2 text-sm"
                disabled={isScanning}
              >
                {availableCameras.map((camera) => (
                  <option key={camera.id} value={camera.id}>
                    {camera.label || `Camera ${camera.id}`}
                  </option>
                ))}
              </select>
            )}
          </div>
          
          <div id="reader" className="w-full border rounded-md overflow-hidden" style={{ minHeight: "300px" }}></div>
          
          <div className="flex justify-center">
            {!scannerInitialized ? (
              <Button disabled>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Initializing...
              </Button>
            ) : isScanning ? (
              <Button onClick={stopScanner} variant="destructive">
                Stop Scanning
              </Button>
            ) : (
              <Button onClick={startScanner} className="w-full md:w-auto">
                <Camera className="h-4 w-4 mr-2" />
                Start Scanning
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QRScanner;
