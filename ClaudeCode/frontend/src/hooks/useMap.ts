import { useCallback } from "react";
import type { Camera } from "../types/camera";

export function useMap() {
  const renderCameras = useCallback((_cameras: Camera[]) => {}, []);
  return { renderCameras };
}
