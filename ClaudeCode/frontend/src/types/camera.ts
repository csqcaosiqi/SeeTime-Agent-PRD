export interface Camera {
  id: string;
  name: string;
  address: string;
  street: string;
  district: string;
  lng: number;
  lat: number;
  coverageRadius: number;
  status: "online" | "offline";
}
