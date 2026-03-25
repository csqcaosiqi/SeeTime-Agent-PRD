import { Typography, Progress, Tag } from "antd";
import type { ChatMessage } from "../../stores/chatStore";

interface Props { message: ChatMessage; }

export default function MessageItem({ message }: Props) {
  const isUser = message.role === "user";
  return (
    <div style={{ display: "flex", justifyContent: isUser ? "flex-end" : "flex-start", marginBottom: 12 }}>
      <div style={{ maxWidth: "80%", padding: "8px 12px", borderRadius: 8, background: isUser ? "#1677ff" : "#f5f5f5", color: isUser ? "#fff" : "#000" }}>
        {message.type === "progress" && message.progress ? (
          <div>
            <Typography.Text style={{ color: isUser ? "#fff" : "#000" }}>{message.content}</Typography.Text>
            <Progress percent={Math.round((message.progress.current / message.progress.total) * 100)} size="small" format={() => `${message.progress!.current}/${message.progress!.total}`} style={{ marginTop: 4 }} />
            <Typography.Text type="secondary" style={{ fontSize: 12 }}>已发现 {message.progress.found} 处疑似异常</Typography.Text>
          </div>
        ) : message.type === "step_complete" ? (
          <div><Tag color="green">步骤完成</Tag><Typography.Text>{message.content}</Typography.Text></div>
        ) : message.type === "error" ? (
          <div><Tag color="red">异常</Tag><Typography.Text>{message.content}</Typography.Text></div>
        ) : (
          <Typography.Text style={{ color: isUser ? "#fff" : "#000" }}>{message.content}</Typography.Text>
        )}
      </div>
    </div>
  );
}
