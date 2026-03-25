import { useEffect, useRef } from "react";
import { useChatStore } from "../../stores/chatStore";
import { useTaskStore } from "../../stores/taskStore";
import MessageItem from "./MessageItem";

export default function MessageList() {
  const activeTaskId = useTaskStore((s) => s.activeTaskId);
  const getTaskMessages = useChatStore((s) => s.getTaskMessages);
  const messages = activeTaskId ? getTaskMessages(activeTaskId) : [];
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages.length]);
  return (
    <div style={{ height: '100%', overflow: 'auto', padding: '12px 0' }}>
      {messages.map((msg) => <MessageItem key={msg.id} message={msg} />)}
      <div ref={bottomRef} />
    </div>
  );
}
