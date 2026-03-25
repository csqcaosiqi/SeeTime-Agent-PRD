type MessageHandler = (data: unknown) => void;

class WebSocketManager {
  private connections = new Map<string, WebSocket>();
  private handlers = new Map<string, Set<MessageHandler>>();

  connect(taskId: string) {
    if (this.connections.has(taskId)) return;
    const ws = new WebSocket(`ws://localhost:8000/ws/${taskId}`);
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.handlers.get(taskId)?.forEach(handler => handler(data));
    };
    ws.onclose = () => { this.connections.delete(taskId); };
    this.connections.set(taskId, ws);
  }

  subscribe(taskId: string, handler: MessageHandler) {
    if (!this.handlers.has(taskId)) this.handlers.set(taskId, new Set());
    this.handlers.get(taskId)!.add(handler);
    return () => { this.handlers.get(taskId)?.delete(handler); };
  }

  disconnect(taskId: string) {
    this.connections.get(taskId)?.close();
    this.connections.delete(taskId);
    this.handlers.delete(taskId);
  }
}

export const wsManager = new WebSocketManager();
