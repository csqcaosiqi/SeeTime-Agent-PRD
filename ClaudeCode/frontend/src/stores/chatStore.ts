import { create } from "zustand";

export type MessageRole = "user" | "system" | "agent";
export type MessageType = "text" | "progress" | "step_complete" | "error";

export interface ChatMessage {
  id: string;
  taskId: string;
  role: MessageRole;
  type: MessageType;
  content: string;
  progress?: { current: number; total: number; found: number };
  timestamp: string;
}

interface ChatStore {
  messages: Record<string, ChatMessage[]>;
  addMessage: (taskId: string, msg: Omit<ChatMessage, "id" | "timestamp">) => void;
  updateProgress: (taskId: string, messageId: string, progress: ChatMessage["progress"]) => void;
  getTaskMessages: (taskId: string) => ChatMessage[];
}

export const useChatStore = create<ChatStore>((set, get) => ({
  messages: {},
  addMessage: (taskId, msg) => {
    const message: ChatMessage = { ...msg, id: crypto.randomUUID(), taskId, timestamp: new Date().toISOString() };
    set((state) => ({
      messages: { ...state.messages, [taskId]: [...(state.messages[taskId] ?? []), message] },
    }));
  },
  updateProgress: (taskId, messageId, progress) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [taskId]: (state.messages[taskId] ?? []).map((m) => m.id === messageId ? { ...m, progress } : m),
      },
    })),
  getTaskMessages: (taskId) => get().messages[taskId] ?? [],
}));
