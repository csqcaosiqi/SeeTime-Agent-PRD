import { Card, Tag, Typography } from "antd";
import type { Task } from "../../types/task";

const STATUS_COLORS: Record<string, string> = {
  running: "processing", paused: "warning", completed: "success", cancelled: "default",
};
const AGENT_ICONS: Record<string, string> = {
  clean_guardian: "🗑️", city_patrol: "⚠️", parking_watcher: "🚗", data_reporter: "📊",
};

interface Props { task: Task; isActive: boolean; onClick: () => void; }

export default function TaskCard({ task, isActive, onClick }: Props) {
  const currentStepName = task.steps[task.currentStepIndex]?.stepName ?? "已完成";
  return (
    <Card size="small" hoverable onClick={onClick}
      style={{ marginBottom: 8, border: isActive ? "2px solid #1677ff" : "1px solid #f0f0f0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography.Text strong>{AGENT_ICONS[task.agentType]} {task.agentLabel}</Typography.Text>
        <Tag color={STATUS_COLORS[task.status]}>{task.status}</Tag>
      </div>
      <Typography.Text type="secondary" style={{ fontSize: 12 }}>{task.description}</Typography.Text>
      <div style={{ marginTop: 4 }}>
        <Typography.Text type="secondary" style={{ fontSize: 11 }}>
          当前步骤：{currentStepName} ({task.currentStepIndex + 1}/{task.steps.length})
        </Typography.Text>
      </div>
    </Card>
  );
}
