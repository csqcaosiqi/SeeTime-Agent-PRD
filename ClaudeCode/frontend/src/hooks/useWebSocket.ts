import { useEffect } from "react";
import { wsManager } from "../services/websocket";

export function useWebSocket(taskId: string | null, onMessage: (data: unknown) => void) {
  useEffect(() => {
    if (!taskId) return;
    wsManager.connect(taskId);
    return wsManager.subscribe(taskId, onMessage);
  }, [taskId, onMessage]);
}
