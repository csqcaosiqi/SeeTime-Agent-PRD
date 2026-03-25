import StepBar from "./StepBar";
import NextStepButton from "./NextStepButton";
import { useStepFlow } from "../../hooks/useStepFlow";
import { useTaskStore } from "../../stores/taskStore";
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
  const setCanvasVisible = useTaskStore(s => s.setCanvasVisible);

  if (!activeTask || !currentStep) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        background: '#08080F',
        borderLeft: '1px solid rgba(255,255,255,0.07)',
        flexDirection: 'column',
        gap: 8,
      }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <path d="M3 9h18M9 21V9"/>
        </svg>
        <span style={{ fontSize: 13, color: '#475569' }}>选择或创建一个任务开始</span>
      </div>
    );
  }

  const ViewComponent = VIEW_MAP[currentStep.subAgentType];
  const taskStatus = activeTask.status;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: '#08080F',
      borderLeft: '1px solid rgba(255,255,255,0.07)',
    }}>
      {/* Canvas header */}
      <div style={{
        padding: '12px 20px',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 7,
            height: 7,
            borderRadius: '50%',
            background: taskStatus === 'running' ? '#6366F1' : taskStatus === 'completed' ? '#22C55E' : '#475569',
            boxShadow: taskStatus === 'running' ? '0 0 8px rgba(99,102,241,0.6)' : 'none',
          }} />
          <span style={{ fontSize: 13, fontWeight: 500, color: '#F1F5F9' }}>
            {activeTask.agentLabel}
          </span>
          <span style={{ fontSize: 12, color: '#475569' }}>
            {activeTask.description}
          </span>
        </div>
        <button
          onClick={() => setCanvasVisible(false)}
          className={taskStatus === 'running' ? 'pulse-active' : ''}
          style={{
            background: 'rgba(99,102,241,0.15)',
            border: '1px solid rgba(99,102,241,0.3)',
            borderRadius: 8,
            padding: '6px 12px',
            color: '#818CF8',
            cursor: 'pointer',
            fontSize: 12,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontFamily: 'inherit',
            transition: 'background 0.15s',
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
          收起画板
        </button>
      </div>

      {/* StepBar */}
      <StepBar />

      {/* Content */}
      <div style={{ flex: 1, overflow: 'auto', background: '#08080F' }}>
        {ViewComponent ? (
          <ViewComponent />
        ) : (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            color: '#475569',
            fontSize: 13,
          }}>
            未知步骤类型
          </div>
        )}
      </div>

      {/* Next step button */}
      <NextStepButton />
    </div>
  );
}
