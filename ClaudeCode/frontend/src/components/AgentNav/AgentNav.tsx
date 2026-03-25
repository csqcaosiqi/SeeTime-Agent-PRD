import { Divider, Typography } from "antd";
import AgentSelector from "./AgentSelector";
import TaskList from "./TaskList";
import { useTaskStore } from "../../stores/taskStore";
import type { AgentType } from "../../types/task";

const STEPS_MAP: Record<AgentType, { stepName: string; subAgentType: string }[]> = {
  clean_guardian: [
    { stepName: "查询范围确定", subAgentType: "scope" },
    { stepName: "异常查找", subAgentType: "scan" },
    { stepName: "异常结果", subAgentType: "result" },
    { stepName: "智能派单", subAgentType: "dispatch" },
    { stepName: "报告生成", subAgentType: "report" },
  ],
  city_patrol: [
    { stepName: "查询范围确定", subAgentType: "scope" },
    { stepName: "异常查找", subAgentType: "scan" },
    { stepName: "异常结果", subAgentType: "result" },
    { stepName: "智能派单", subAgentType: "dispatch" },
    { stepName: "报告生成", subAgentType: "report" },
  ],
  parking_watcher: [
    { stepName: "查询范围确定", subAgentType: "scope" },
    { stepName: "异常查找", subAgentType: "scan" },
    { stepName: "异常结果", subAgentType: "result" },
    { stepName: "智能派单", subAgentType: "dispatch" },
    { stepName: "报告生成", subAgentType: "report" },
  ],
  data_reporter: [
    { stepName: "查询范围确定", subAgentType: "scope" },
    { stepName: "数据检索", subAgentType: "search" },
    { stepName: "报告生成", subAgentType: "report" },
  ],
};

export default function AgentNav() {
  const createTask = useTaskStore((s) => s.createTask);
  const handleSelectAgent = (agentType: string) => {
    const type = agentType as AgentType;
    createTask(type, "新任务", STEPS_MAP[type]);
  };
  return (
    <div style={{ padding: 16, display: "flex", flexDirection: "column", height: "100%" }}>
      <Typography.Title level={5} style={{ margin: 0 }}>SeeTime Agent</Typography.Title>
      <Divider style={{ margin: "12px 0" }} />
      <AgentSelector onSelect={handleSelectAgent} />
      <Divider style={{ margin: "12px 0" }} />
      <div style={{ flex: 1, overflow: "auto" }}><TaskList /></div>
    </div>
  );
}
