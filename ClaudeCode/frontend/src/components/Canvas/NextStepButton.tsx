import { Button } from "antd";
import { ArrowRightOutlined, CheckOutlined } from "@ant-design/icons";
import { useStepFlow } from "../../hooks/useStepFlow";

export default function NextStepButton() {
  const { activeTask, currentStep, canAdvance, handleAdvance } = useStepFlow();
  if (!activeTask || !currentStep) return null;
  if (currentStep.status === "executing") return null;

  const isLastStep = activeTask.currentStepIndex === activeTask.steps.length - 1;

  return (
    <div style={{ padding: "16px 24px", borderTop: "1px solid #f0f0f0", textAlign: "right" }}>
      <Button
        type="primary"
        size="large"
        icon={isLastStep ? <CheckOutlined /> : <ArrowRightOutlined />}
        disabled={!canAdvance}
        onClick={handleAdvance}
      >
        {isLastStep ? "完成任务" : "下一步"}
      </Button>
    </div>
  );
}
