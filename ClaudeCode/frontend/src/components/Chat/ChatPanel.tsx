import { Typography } from "antd";

export default function ChatPanel() {
  return (
    <div style={{ padding: 16, display: "flex", flexDirection: "column", height: "100%" }}>
      <Typography.Title level={5}>Chat</Typography.Title>
      <div style={{ flex: 1 }}>消息区域</div>
      <div>输入区域</div>
    </div>
  );
}
