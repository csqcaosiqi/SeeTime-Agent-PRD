import { Input, Button, Space } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useTaskStore } from "../../stores/taskStore";

interface Props { onSend: (message: string) => void; }

export default function ChatInput({ onSend }: Props) {
  const [value, setValue] = useState("");
  const activeTaskId = useTaskStore((s) => s.activeTaskId);
  const handleSend = () => {
    if (!value.trim() || !activeTaskId) return;
    onSend(value.trim());
    setValue("");
  };
  return (
    <div style={{ padding: "12px 16px", borderTop: "1px solid #f0f0f0" }}>
      <Space.Compact style={{ width: "100%" }}>
        <Input value={value} onChange={(e) => setValue(e.target.value)} onPressEnter={handleSend}
          placeholder={activeTaskId ? "输入指令..." : "请先创建或选择一个任务"} disabled={!activeTaskId} />
        <Button type="primary" icon={<SendOutlined />} onClick={handleSend} disabled={!activeTaskId || !value.trim()} />
      </Space.Compact>
    </div>
  );
}
