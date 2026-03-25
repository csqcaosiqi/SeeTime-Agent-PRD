export interface DetectedEvent {
  id: string;
  cameraId: string;
  eventType: string;
  subCategory: string;
  street: string;
  screenshotUrl: string;
  detectionBbox: [number, number, number, number];
  confidence: number;
  licensePlate?: string;
  status: "detected" | "confirmed" | "rejected";
  detectedAt: string;
}
