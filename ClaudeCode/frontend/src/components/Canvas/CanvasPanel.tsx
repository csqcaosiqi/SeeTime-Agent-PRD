import { Empty } from "antd";
import StepBar from "./StepBar";
import NextStepButton from "./NextStepButton";
import { useStepFlow } from "../../hooks/useStepFlow";
import ScopeView from "./ScopeView/ScopeView";
import ScanningView from "./ScanningView/ScanningView";
import ResultView from "./ResultView/ResultView";
import DispatchView from "./DispatchView/DispatchView";
import ReportView from "./ReportView/ReportView";

const VIEW_MAP: Record<string, React.ComponentType> = {
  scope: ScopeView,
  scan: ScanningView,
  result: ResultView,
  dispatch: DispatchView,
  search: ScanningView,
  report: ReportView,
};

export default function CanvasPanel() {
  const { activeTask, currentStep } = useStepFlow();

  if (!activeTask || !currentStep) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <Empty description="选择或创建一个任务开始" />
      </div>
    );
  }

  const ViewComponent = VIEW_MAP[currentStep.subAgentType];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <StepBar />
      <div style={{ flex: 1, overflow: "auto" }}>
        {ViewComponent ? (
          <ViewComponent />
        ) : (
          <Empty description="未知步骤类型" />
        )}
      </div>
      <NextStepButton />
    </div>
  );
}
