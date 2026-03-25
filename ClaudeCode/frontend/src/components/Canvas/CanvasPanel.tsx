import { Typography, Empty } from "antd";

export default function CanvasPanel() {
  return (
    <div style={{ padding: 16, height: "100%" }}>
      <Typography.Title level={5}>Canvas</Typography.Title>
      <Empty description="选择或创建一个任务开始" />
    </div>
  );
}
