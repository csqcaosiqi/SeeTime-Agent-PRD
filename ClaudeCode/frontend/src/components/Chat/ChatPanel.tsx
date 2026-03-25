import { Typography } from "antd";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import { useTaskStore } from "../../stores/taskStore";
import { useChatStore } from "../../stores/chatStore";

export default function ChatPanel() {
  const activeTaskId = useTaskStore((s) => s.activeTaskId);
  const addMessage = useChatStore((s) => s.addMessage);
  const handleSend = (content: string) => {
    if (!activeTaskId) return;
    addMessage(activeTaskId, { taskId: activeTaskId, role: "user", type: "text", content });
    setTimeout(() => {
      addMessage(activeTaskId, { taskId: activeTaskId, role: "agent", type: "text", content: `收到指令：${content}。正在处理...` });
    }, 500);
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ padding: "12px 16px", borderBottom: "1px solid #f0f0f0" }}>
        <Typography.Title level={5} style={{ margin: 0 }}>Chat</Typography.Title>
      </div>
      <MessageList />
      <ChatInput onSend={handleSend} />
    </div>
  );
}
