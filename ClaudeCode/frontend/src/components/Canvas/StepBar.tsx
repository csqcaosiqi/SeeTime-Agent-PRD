import { Steps } from "antd";
import { useStepFlow } from "../../hooks/useStepFlow";
import type { StepStatus } from "../../types/task";

const STATUS_MAP: Record<StepStatus, "wait" | "process" | "finish" | "error"> = {
  pending: "wait",
  executing: "process",
  waiting_user: "process",
  completed: "finish",
};

export default function StepBar() {
  const { allSteps, activeTask, handleJumpTo } = useStepFlow();
  if (!activeTask) return null;

  return (
    <Steps
      current={activeTask.currentStepIndex}
      size="small"
      style={{ padding: "16px 24px", borderBottom: "1px solid #f0f0f0" }}
      onChange={(stepIndex) => {
        if (stepIndex < activeTask.currentStepIndex) {
          handleJumpTo(stepIndex);
        }
      }}
      items={allSteps.map((step) => ({
        title: step.stepName,
        status: STATUS_MAP[step.status],
        style: {
          cursor: step.stepIndex < activeTask.currentStepIndex ? "pointer" : "default",
        },
      }))}
    />
  );
}
